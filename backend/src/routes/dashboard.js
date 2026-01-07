import express from 'express';
import { 
  getInventoryItems, 
  getPaymentReminders, 
  getInvoices 
} from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/stats', async (req, res) => {
  try {
    const [inventoryItems, paymentReminders, invoices] = await Promise.all([
      getInventoryItems(req.user.uid),
      getPaymentReminders(req.user.uid),
      getInvoices(req.user.uid)
    ]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayInvoices = invoices.filter(invoice => {
      const invoiceDate = new Date(invoice.date);
      invoiceDate.setHours(0, 0, 0, 0);
      return invoiceDate.getTime() === today.getTime();
    });

    const thisWeekInvoices = invoices.filter(invoice => {
      const invoiceDate = new Date(invoice.date);
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      return invoiceDate >= weekAgo;
    });

    const lowStockItems = inventoryItems.filter(item => item.quantity <= item.threshold);
    
    const pendingPayments = paymentReminders.filter(reminder => 
      reminder.status === 'pending' || reminder.status === 'overdue'
    );

    const todaySales = todayInvoices
      .filter(invoice => invoice.status === 'Paid')
      .reduce((sum, invoice) => sum + invoice.totalAmount, 0);

    const thisWeekSales = thisWeekInvoices
      .filter(invoice => invoice.status === 'Paid')
      .reduce((sum, invoice) => sum + invoice.totalAmount, 0);

    const pendingPaymentsAmount = pendingPayments.reduce((sum, reminder) => sum + reminder.amount, 0);

    const stats = {
      todaySales: {
        value: todaySales,
        transactions: todayInvoices.filter(i => i.status === 'Paid').length,
        change: '+12%'
      },
      thisWeekSales: {
        value: thisWeekSales,
        transactions: thisWeekInvoices.filter(i => i.status === 'Paid').length,
        change: '+8%'
      },
      pendingPayments: {
        value: pendingPaymentsAmount,
        count: pendingPayments.length,
        change: `${pendingPayments.length} customers`
      },
      lowStockItems: {
        count: lowStockItems.length,
        items: lowStockItems.slice(0, 5).map(item => ({
          name: item.name,
          quantity: item.quantity,
          threshold: item.threshold
        }))
      },
      totalInventory: {
        count: inventoryItems.length,
        value: inventoryItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      },
      recentActivity: [
        ...todayInvoices.slice(0, 3).map(invoice => ({
          type: 'sale',
          customer: invoice.customerName,
          amount: `₹${invoice.totalAmount.toLocaleString()}`,
          time: 'Today'
        })),
        ...paymentReminders.slice(0, 2).map(reminder => ({
          type: 'reminder',
          customer: reminder.customerName,
          amount: `₹${reminder.amount.toLocaleString()}`,
          time: 'Recent'
        }))
      ].slice(0, 5)
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      error: 'Failed to fetch dashboard statistics',
      message: 'Unable to retrieve dashboard data',
      code: 'DASHBOARD_STATS_FETCH_FAILED'
    });
  }
});

router.get('/insights', async (req, res) => {
  try {
    const [inventoryItems, paymentReminders, invoices] = await Promise.all([
      getInventoryItems(req.user.uid),
      getPaymentReminders(req.user.uid),
      getInvoices(req.user.uid)
    ]);

    const insights = [];

    const lowStockItems = inventoryItems.filter(item => item.quantity <= item.threshold);
    if (lowStockItems.length > 0) {
      insights.push({
        type: 'warning',
        title: 'Stock Alert',
        message: `${lowStockItems.length} products are running low and need restocking`,
        priority: 'high',
        items: lowStockItems.slice(0, 3).map(item => item.name)
      });
    }

    const overduePayments = paymentReminders.filter(reminder => reminder.status === 'overdue');
    if (overduePayments.length > 0) {
      const totalOverdue = overduePayments.reduce((sum, reminder) => sum + reminder.amount, 0);
      insights.push({
        type: 'info',
        title: 'Payment Reminder',
        message: `${overduePayments.length} customers have overdue payments totaling ₹${totalOverdue.toLocaleString()}`,
        priority: 'medium',
        amount: totalOverdue
      });
    }

    const recentInvoices = invoices
      .filter(invoice => invoice.status === 'Paid')
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 7);

    if (recentInvoices.length >= 3) {
      const avgDailySales = recentInvoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0) / 7;
      insights.push({
        type: 'success',
        title: 'Sales Performance',
        message: `Your average daily sales are ₹${avgDailySales.toFixed(0)}. Keep up the good work!`,
        priority: 'low',
        trend: 'up'
      });
    }

    const topSellingItems = inventoryItems
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 3);

    if (topSellingItems.length > 0) {
      insights.push({
        type: 'info',
        title: 'Top Products',
        message: `Your best-selling items are: ${topSellingItems.map(item => item.name).join(', ')}`,
        priority: 'low',
        items: topSellingItems.map(item => item.name)
      });
    }

    res.json({
      success: true,
      data: insights
    });
  } catch (error) {
    console.error('Get dashboard insights error:', error);
    res.status(500).json({
      error: 'Failed to fetch dashboard insights',
      message: 'Unable to retrieve business insights',
      code: 'DASHBOARD_INSIGHTS_FETCH_FAILED'
    });
  }
});

export default router;



const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
const mockInventory = [
    { id: '1', name: 'Maggi 2-Minute Noodles', price: 12, quantity: 45, category: 'Food', threshold: 10 },
    { id: '2', name: 'Tata Tea Gold', price: 145, quantity: 8, category: 'Beverages', threshold: 15 },
    { id: '3', name: 'Amul Milk 1L', price: 56, quantity: 25, category: 'Dairy', threshold: 20 },
    { id: '4', name: 'Parle-G Biscuits', price: 5, quantity: 3, category: 'Snacks', threshold: 10 }
];

const mockPayments = [
    { id: '1', customerName: 'Amit Sharma', amount: 2500, dueDate: '2024-01-25', phone: '+919876543211', status: 'pending' },
    { id: '2', customerName: 'Priya Kumar', amount: 1200, dueDate: '2024-01-30', phone: '+919876543212', status: 'pending' }
];

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        service: 'Vyapaar AI Backend',
        note: 'Backend is running successfully!'
    });
});

// API routes
app.get('/api/inventory', (req, res) => {
    res.json({ success: true, data: mockInventory, count: mockInventory.length });
});

app.get('/api/payments', (req, res) => {
    res.json({ success: true, data: mockPayments, count: mockPayments.length });
});

app.get('/api/dashboard/stats', (req, res) => {
    const stats = {
        todaySales: { value: 15240, transactions: 15, change: '+12%' },
        thisWeekSales: { value: 89530, transactions: 89, change: '+8%' },
        pendingPayments: { value: 3700, count: 2, change: '2 customers' },
        lowStockItems: { count: 1, items: [{ name: 'Parle-G Biscuits', quantity: 3, threshold: 10 }] }
    };
    res.json({ success: true, data: stats });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Not Found', 
        message: 'API endpoint not found'
    });
});

app.listen(PORT, () => {
    console.log(`🔌 Vyapaar AI Backend running on http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`\nPress Ctrl+C to stop the server`);
});

// Handle server shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down backend server...');
    process.exit(0);
});


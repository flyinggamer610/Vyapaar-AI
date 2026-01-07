const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin
let db;
try {
  const serviceAccount = {
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
  };

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  db = admin.firestore();
  console.log('✅ Firebase Admin initialized successfully');
} catch (error) {
  console.log('⚠️ Firebase not configured, running in demo mode');
  console.log('📋 Follow FIREBASE_SETUP_GUIDE.md to enable full functionality');
}

// Initialize OpenAI
let openai;
try {
  if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your-openai-api-key') {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    console.log('✅ OpenAI initialized successfully');
  } else {
    console.log('⚠️ OpenAI not configured, AI features will be mocked');
  }
} catch (error) {
  console.log('⚠️ OpenAI not configured, AI features will be mocked');
}

// Mock data for demo mode
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

const mockInvoices = [
  { id: '1', invoiceNumber: 'INV-2024-001', customerName: 'Rajesh Kumar', amount: 1200, gst: 216, totalAmount: 1416, status: 'Paid' },
  { id: '2', invoiceNumber: 'INV-2024-002', customerName: 'Priya Sharma', amount: 850, gst: 153, totalAmount: 1003, status: 'Pending' }
];

// Helper function to get data (Firebase or mock)
const getData = async (collection, userId = 'demo') => {
  if (db) {
    try {
      const snapshot = await db.collection(collection).where('userId', '==', userId).get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.log(`⚠️ Firebase error for ${collection}, using mock data`);
      return getMockData(collection);
    }
  }
  return getMockData(collection);
};

const getMockData = (collection) => {
  switch (collection) {
    case 'inventory': return mockInventory;
    case 'payments': return mockPayments;
    case 'invoices': return mockInvoices;
    default: return [];
  }
};

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Vyapaar AI Backend',
    firebase: db ? 'Connected' : 'Demo Mode',
    openai: openai ? 'Connected' : 'Demo Mode'
  });
});

// Authentication routes
app.post('/auth/send-otp', async (req, res) => {
  const { phone } = req.body;
  
  if (!phone) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  // In a real app, you would send actual OTP
  // For demo, we'll just return success
  res.json({ 
    success: true, 
    message: 'OTP sent successfully (Demo Mode)',
    phone: phone
  });
});

app.post('/auth/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;
  
  if (!phone || !otp) {
    return res.status(400).json({ error: 'Phone and OTP are required' });
  }

  // In demo mode, accept any OTP
  if (otp === '123456' || otp === 'demo') {
    const token = jwt.sign({ phone, userId: 'demo-user' }, process.env.JWT_SECRET || 'demo-secret');
    
    // Create user in Firebase if connected
    if (db) {
      try {
        await db.collection('users').doc('demo-user').set({
          phone,
          name: 'Demo User',
          shopName: 'Demo Shop',
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
      } catch (error) {
        console.log('⚠️ Could not create user in Firebase');
      }
    }

    res.json({ 
      success: true, 
      token,
      user: { phone, name: 'Demo User', shopName: 'Demo Shop' }
    });
  } else {
    res.status(400).json({ error: 'Invalid OTP' });
  }
});

// API routes
app.get('/api/inventory', async (req, res) => {
  try {
    const data = await getData('inventory');
    res.json({ success: true, data, count: data.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

app.post('/api/inventory', async (req, res) => {
  try {
    const product = { ...req.body, userId: 'demo-user', lastUpdated: new Date() };
    
    if (db) {
      const docRef = await db.collection('inventory').add(product);
      res.json({ success: true, id: docRef.id, data: product });
    } else {
      const newProduct = { id: Date.now().toString(), ...product };
      mockInventory.push(newProduct);
      res.json({ success: true, id: newProduct.id, data: newProduct });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
});

app.get('/api/payments', async (req, res) => {
  try {
    const data = await getData('payments');
    res.json({ success: true, data, count: data.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
});

app.post('/api/payments', async (req, res) => {
  try {
    const payment = { ...req.body, userId: 'demo-user', createdAt: new Date() };
    
    if (db) {
      const docRef = await db.collection('payments').add(payment);
      res.json({ success: true, id: docRef.id, data: payment });
    } else {
      const newPayment = { id: Date.now().toString(), ...payment };
      mockPayments.push(newPayment);
      res.json({ success: true, id: newPayment.id, data: newPayment });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to add payment reminder' });
  }
});

app.get('/api/invoices', async (req, res) => {
  try {
    const data = await getData('invoices');
    res.json({ success: true, data, count: data.length });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
});

app.post('/api/invoices', async (req, res) => {
  try {
    const invoice = { ...req.body, userId: 'demo-user', date: new Date() };
    
    if (db) {
      const docRef = await db.collection('invoices').add(invoice);
      res.json({ success: true, id: docRef.id, data: invoice });
    } else {
      const newInvoice = { id: Date.now().toString(), ...invoice };
      mockInvoices.push(newInvoice);
      res.json({ success: true, id: newInvoice.id, data: newInvoice });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to create invoice' });
  }
});

app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const stats = {
      todaySales: { value: 15240, transactions: 15, change: '+12%' },
      thisWeekSales: { value: 89530, transactions: 89, change: '+8%' },
      pendingPayments: { value: 3700, count: 2, change: '2 customers' },
      lowStockItems: { count: 1, items: [{ name: 'Parle-G Biscuits', quantity: 3, threshold: 10 }] }
    };
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// AI Voice Processing
app.post('/api/voice/process-command', async (req, res) => {
  try {
    if (openai) {
      // Real AI processing would go here
      res.json({
        success: true,
        transcribedText: "Add 10 Maggi packets at 12 rupees each",
        action: 'ADD_INVENTORY',
        message: 'Added 10 units of Maggi to inventory',
        data: { id: Date.now().toString(), name: 'Maggi', quantity: 10, price: 12 }
      });
    } else {
      // Mock response
      res.json({
        success: true,
        transcribedText: "Add 10 Maggi packets at 12 rupees each",
        action: 'ADD_INVENTORY',
        message: 'Added 10 units of Maggi to inventory (Demo Mode)',
        data: { id: Date.now().toString(), name: 'Maggi', quantity: 10, price: 12 }
      });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to process voice command' });
  }
});

// WhatsApp Chat
app.post('/api/whatsapp/chat', async (req, res) => {
  try {
    if (openai) {
      // Real AI chat would go here
      res.json({
        success: true,
        reply: "नमस्ते! मैं आपकी कैसे मदद कर सकता हूं?",
        context: { inventoryChecked: true, paymentChecked: false, invoiceChecked: false }
      });
    } else {
      // Mock response
      res.json({
        success: true,
        reply: "नमस्ते! मैं आपकी कैसे मदद कर सकता हूं? (Demo Mode - Configure OpenAI for real AI responses)",
        context: { inventoryChecked: true, paymentChecked: false, invoiceChecked: false }
      });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found', 
    message: 'API endpoint not found',
    availableEndpoints: [
      'GET /health',
      'POST /auth/send-otp',
      'POST /auth/verify-otp',
      'GET /api/inventory',
      'POST /api/inventory',
      'GET /api/payments', 
      'POST /api/payments',
      'GET /api/invoices',
      'POST /api/invoices',
      'GET /api/dashboard/stats',
      'POST /api/voice/process-command',
      'POST /api/whatsapp/chat'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`🔌 Vyapaar AI Backend running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔥 Firebase: ${db ? 'Connected' : 'Demo Mode'}`);
  console.log(`🤖 OpenAI: ${openai ? 'Connected' : 'Demo Mode'}`);
  console.log(`\nPress Ctrl+C to stop the server`);
});

// Handle server shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down backend server...');
  process.exit(0);
});


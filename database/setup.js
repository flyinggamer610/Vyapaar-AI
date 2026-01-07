import { db } from '../backend/src/config/firebase.js';

const setupDatabase = async () => {
  try {
    console.log('Setting up Vyapaar AI database...');

    const collections = [
      'users',
      'inventory', 
      'payments',
      'invoices',
      'whatsapp_settings'
    ];

    for (const collectionName of collections) {
      const collectionRef = db.collection(collectionName);
      const snapshot = await collectionRef.limit(1).get();
      
      if (snapshot.empty) {
        console.log(`✓ Collection '${collectionName}' is ready`);
      } else {
        console.log(`✓ Collection '${collectionName}' already exists`);
      }
    }

    console.log('Database setup completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Configure Firebase security rules');
    console.log('2. Set up composite indexes for better performance');
    console.log('3. Test the API endpoints');

  } catch (error) {
    console.error('Database setup failed:', error);
    throw error;
  }
};

const createSampleData = async (userId) => {
  try {
    console.log(`Creating sample data for user: ${userId}`);

    const sampleInventory = [
      {
        name: 'Maggi 2-Minute Noodles',
        price: 12,
        quantity: 45,
        category: 'Food',
        threshold: 10
      },
      {
        name: 'Tata Tea Gold',
        price: 145,
        quantity: 8,
        category: 'Beverages',
        threshold: 15
      },
      {
        name: 'Amul Milk 1L',
        price: 56,
        quantity: 25,
        category: 'Dairy',
        threshold: 20
      }
    ];

    const samplePayments = [
      {
        customerName: 'Amit Sharma',
        amount: 2500,
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        phone: '+919876543211',
        status: 'pending',
        originalText: 'Send Amit 2500 rupees reminder for Friday'
      },
      {
        customerName: 'Priya Kumar',
        amount: 1200,
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        phone: '+919876543212',
        status: 'pending',
        originalText: 'Send Priya 1200 rupees reminder for next week'
      }
    ];

    const sampleInvoices = [
      {
        invoiceNumber: 'INV-2024-001',
        customerName: 'Rajesh Kumar',
        customerPhone: '+919876543213',
        amount: 1200,
        gst: 216,
        totalAmount: 1416,
        status: 'Paid',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        dueDate: new Date(Date.now() + 13 * 24 * 60 * 60 * 1000),
        items: [
          {
            name: 'Maggi Noodles',
            quantity: 5,
            price: 12,
            total: 60
          },
          {
            name: 'Tata Tea',
            quantity: 2,
            price: 145,
            total: 290
          }
        ]
      }
    ];

    const sampleWhatsAppSettings = {
      isConnected: false,
      autoReplyEnabled: true,
      templates: [
        {
          id: '1',
          name: 'Payment Reminder',
          message: 'नमस्ते {name}, आपका ₹{amount} का भुगतान बकाया है। कृपया जल्दी भुगतान करें। धन्यवाद!',
          category: 'Payment',
          isActive: true,
          variables: ['name', 'amount']
        }
      ],
      faqs: [
        {
          id: '1',
          question: 'दुकान का समय क्या है?',
          answer: 'हमारी दुकान सुबह 9 बजे से रात 9 बजे तक खुली रहती है।',
          isActive: true
        }
      ],
      businessHours: {
        start: '09:00',
        end: '21:00'
      },
      welcomeMessage: 'नमस्ते! राज स्टोर में आपका स्वागत है। हम आपकी कैसे मदद कर सकते हैं?',
      offlineMessage: 'हमारी दुकान अभी बंद है। कृपया बाद में संपर्क करें।'
    };

    for (const item of sampleInventory) {
      await db.collection('inventory').add({
        userId,
        ...item,
        lastUpdated: new Date(),
        createdAt: new Date()
      });
    }

    for (const payment of samplePayments) {
      await db.collection('payments').add({
        userId,
        ...payment,
        createdAt: new Date()
      });
    }

    for (const invoice of sampleInvoices) {
      await db.collection('invoices').add({
        userId,
        ...invoice,
        createdAt: new Date()
      });
    }

    await db.collection('whatsapp_settings').doc(userId).set({
      ...sampleWhatsAppSettings,
      lastUpdated: new Date()
    });

    console.log('Sample data created successfully!');

  } catch (error) {
    console.error('Failed to create sample data:', error);
    throw error;
  }
};

export { setupDatabase, createSampleData };



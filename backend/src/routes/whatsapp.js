import express from 'express';
import OpenAI from 'openai';
import { 
  getInventoryItems, 
  getPaymentReminders, 
  getInvoices,
  getWhatsAppSettings,
  updateWhatsAppSettings
} from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: 'Message required',
        message: 'Please provide a message',
        code: 'MISSING_MESSAGE'
      });
    }

    const [inventoryItems, paymentReminders, invoices, whatsappSettings] = await Promise.all([
      getInventoryItems(req.user.uid),
      getPaymentReminders(req.user.uid),
      getInvoices(req.user.uid),
      getWhatsAppSettings(req.user.uid)
    ]);

    const businessContext = {
      inventory: inventoryItems.slice(0, 10).map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        category: item.category
      })),
      payments: paymentReminders.filter(r => r.status === 'pending' || r.status === 'overdue').slice(0, 5).map(reminder => ({
        customer: reminder.customerName,
        amount: reminder.amount,
        dueDate: reminder.dueDate,
        status: reminder.status
      })),
      recentInvoices: invoices.slice(0, 5).map(invoice => ({
        customer: invoice.customerName,
        amount: invoice.totalAmount,
        status: invoice.status,
        date: invoice.date
      })),
      settings: whatsappSettings
    };

    const systemPrompt = `
You are a helpful WhatsApp assistant for a small business in India. You help customers with:

1. Store information (timings, location, services)
2. Product availability and prices
3. Payment status and reminders
4. Order tracking
5. General inquiries

Business Context:
- Inventory: ${JSON.stringify(businessContext.inventory)}
- Pending Payments: ${JSON.stringify(businessContext.payments)}
- Recent Invoices: ${JSON.stringify(businessContext.recentInvoices)}
- Store Settings: ${JSON.stringify(businessContext.settings)}

Guidelines:
- Respond in a friendly, helpful tone
- Use both English and Hindi as appropriate
- Be concise but informative
- If asked about specific products, check the inventory
- If asked about payments, check the payment reminders
- If you don't have specific information, say so politely
- Always be professional and helpful

Customer Message: "${message}"

Provide a helpful response based on the business context. If the message is in Hindi, respond in Hindi. If in English, respond in English. Be conversational and helpful.
`;

    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const reply = chatResponse.choices[0].message.content;

    res.json({
      success: true,
      reply: reply.trim(),
      context: {
        inventoryChecked: message.toLowerCase().includes('stock') || message.toLowerCase().includes('available'),
        paymentChecked: message.toLowerCase().includes('payment') || message.toLowerCase().includes('due'),
        invoiceChecked: message.toLowerCase().includes('invoice') || message.toLowerCase().includes('bill')
      }
    });

  } catch (error) {
    console.error('WhatsApp chat error:', error);
    res.status(500).json({
      error: 'Chat processing failed',
      message: 'Unable to process the message',
      code: 'CHAT_PROCESSING_FAILED'
    });
  }
});

router.get('/settings', async (req, res) => {
  try {
    const settings = await getWhatsAppSettings(req.user.uid);
    
    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    console.error('Get WhatsApp settings error:', error);
    res.status(500).json({
      error: 'Failed to fetch WhatsApp settings',
      message: 'Unable to retrieve WhatsApp settings',
      code: 'WHATSAPP_SETTINGS_FETCH_FAILED'
    });
  }
});

router.put('/settings', async (req, res) => {
  try {
    const { 
      isConnected, 
      autoReplyEnabled, 
      templates, 
      faqs,
      businessHours,
      welcomeMessage,
      offlineMessage
    } = req.body;

    const settingsData = {
      isConnected: isConnected || false,
      autoReplyEnabled: autoReplyEnabled || false,
      templates: templates || [],
      faqs: faqs || [],
      businessHours: businessHours || { start: '09:00', end: '21:00' },
      welcomeMessage: welcomeMessage || 'नमस्ते! आपका स्वागत है। हम आपकी कैसे मदद कर सकते हैं?',
      offlineMessage: offlineMessage || 'हमारी दुकान अभी बंद है। कृपया बाद में संपर्क करें।'
    };

    await updateWhatsAppSettings(req.user.uid, settingsData);
    
    res.json({
      success: true,
      message: 'WhatsApp settings updated successfully',
      data: settingsData
    });
  } catch (error) {
    console.error('Update WhatsApp settings error:', error);
    res.status(500).json({
      error: 'Failed to update WhatsApp settings',
      message: 'Unable to update WhatsApp settings',
      code: 'WHATSAPP_SETTINGS_UPDATE_FAILED'
    });
  }
});

router.post('/send-message', async (req, res) => {
  try {
    const { phone, message, templateId } = req.body;

    if (!phone || !message) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Phone number and message are required',
        code: 'MISSING_FIELDS'
      });
    }

    const whatsappSettings = await getWhatsAppSettings(req.user.uid);
    
    if (!whatsappSettings.isConnected) {
      return res.status(400).json({
        error: 'WhatsApp not connected',
        message: 'Please connect your WhatsApp Business account first',
        code: 'WHATSAPP_NOT_CONNECTED'
      });
    }

    const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone}`;

    if (process.env.WHATSAPP_ACCESS_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID) {
      const response = await fetch(`https://graph.facebook.com/v17.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: formattedPhone,
          type: 'text',
          text: { body: message }
        })
      });

      if (!response.ok) {
        throw new Error('WhatsApp API request failed');
      }

      const result = await response.json();
      
      res.json({
        success: true,
        message: 'Message sent successfully',
        data: {
          messageId: result.messages[0].id,
          phone: formattedPhone
        }
      });
    } else {
      res.json({
        success: true,
        message: 'Message queued for sending (WhatsApp API not configured)',
        data: {
          phone: formattedPhone,
          message: message
        }
      });
    }

  } catch (error) {
    console.error('Send WhatsApp message error:', error);
    res.status(500).json({
      error: 'Failed to send message',
      message: 'Unable to send WhatsApp message',
      code: 'MESSAGE_SEND_FAILED'
    });
  }
});

router.post('/test-bot', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: 'Message required',
        message: 'Please provide a test message',
        code: 'MISSING_MESSAGE'
      });
    }

    const whatsappSettings = await getWhatsAppSettings(req.user.uid);
    
    const activeFAQs = whatsappSettings.faqs?.filter(faq => faq.isActive) || [];
    const matchingFAQ = activeFAQs.find(faq => 
      faq.question.toLowerCase().includes(message.toLowerCase()) ||
      message.toLowerCase().includes(faq.question.toLowerCase())
    );

    let reply;
    if (matchingFAQ) {
      reply = matchingFAQ.answer;
    } else {
      reply = whatsappSettings.offlineMessage || 'मुझे खुशी होगी आपकी मदद करने में! कृपया और विस्तार से बताएं या हमारे दुकान के समय के दौरान संपर्क करें।';
    }

    res.json({
      success: true,
      reply,
      matchedFAQ: matchingFAQ ? {
        question: matchingFAQ.question,
        answer: matchingFAQ.answer
      } : null
    });

  } catch (error) {
    console.error('Test bot error:', error);
    res.status(500).json({
      error: 'Bot test failed',
      message: 'Unable to test the bot',
      code: 'BOT_TEST_FAILED'
    });
  }
});

export default router;



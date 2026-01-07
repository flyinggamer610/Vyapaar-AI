import { db } from './firebase.js';

export const collections = {
  USERS: 'users',
  INVENTORY: 'inventory',
  PAYMENTS: 'payments',
  INVOICES: 'invoices',
  WHATSAPP_SETTINGS: 'whatsapp_settings'
};

export const createUser = async (userId, userData) => {
  try {
    const userRef = db.collection(collections.USERS).doc(userId);
    await userRef.set({
      ...userData,
      createdAt: new Date(),
      lastLogin: new Date()
    });
    return { success: true, userId };
  } catch (error) {
    throw new Error(`Failed to create user: ${error.message}`);
  }
};

export const getUser = async (userId) => {
  try {
    const userRef = db.collection(collections.USERS).doc(userId);
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
      return null;
    }
    
    return { id: userDoc.id, ...userDoc.data() };
  } catch (error) {
    throw new Error(`Failed to get user: ${error.message}`);
  }
};

export const updateUser = async (userId, updateData) => {
  try {
    const userRef = db.collection(collections.USERS).doc(userId);
    await userRef.update({
      ...updateData,
      lastUpdated: new Date()
    });
    return { success: true };
  } catch (error) {
    throw new Error(`Failed to update user: ${error.message}`);
  }
};

export const addInventoryItem = async (userId, itemData) => {
  try {
    const inventoryRef = db.collection(collections.INVENTORY);
    const docRef = await inventoryRef.add({
      userId,
      ...itemData,
      lastUpdated: new Date(),
      createdAt: new Date()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    throw new Error(`Failed to add inventory item: ${error.message}`);
  }
};

export const getInventoryItems = async (userId) => {
  try {
    const inventoryRef = db.collection(collections.INVENTORY);
    const snapshot = await inventoryRef.where('userId', '==', userId).get();
    
    const items = [];
    snapshot.forEach(doc => {
      items.push({ id: doc.id, ...doc.data() });
    });
    
    return items;
  } catch (error) {
    throw new Error(`Failed to get inventory items: ${error.message}`);
  }
};

export const updateInventoryItem = async (itemId, updateData) => {
  try {
    const itemRef = db.collection(collections.INVENTORY).doc(itemId);
    await itemRef.update({
      ...updateData,
      lastUpdated: new Date()
    });
    return { success: true };
  } catch (error) {
    throw new Error(`Failed to update inventory item: ${error.message}`);
  }
};

export const deleteInventoryItem = async (itemId) => {
  try {
    const itemRef = db.collection(collections.INVENTORY).doc(itemId);
    await itemRef.delete();
    return { success: true };
  } catch (error) {
    throw new Error(`Failed to delete inventory item: ${error.message}`);
  }
};

export const addPaymentReminder = async (userId, reminderData) => {
  try {
    const paymentsRef = db.collection(collections.PAYMENTS);
    const docRef = await paymentsRef.add({
      userId,
      ...reminderData,
      createdAt: new Date()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    throw new Error(`Failed to add payment reminder: ${error.message}`);
  }
};

export const getPaymentReminders = async (userId) => {
  try {
    const paymentsRef = db.collection(collections.PAYMENTS);
    const snapshot = await paymentsRef.where('userId', '==', userId).get();
    
    const reminders = [];
    snapshot.forEach(doc => {
      reminders.push({ id: doc.id, ...doc.data() });
    });
    
    return reminders;
  } catch (error) {
    throw new Error(`Failed to get payment reminders: ${error.message}`);
  }
};

export const updatePaymentReminder = async (reminderId, updateData) => {
  try {
    const reminderRef = db.collection(collections.PAYMENTS).doc(reminderId);
    await reminderRef.update({
      ...updateData,
      lastUpdated: new Date()
    });
    return { success: true };
  } catch (error) {
    throw new Error(`Failed to update payment reminder: ${error.message}`);
  }
};

export const deletePaymentReminder = async (reminderId) => {
  try {
    const reminderRef = db.collection(collections.PAYMENTS).doc(reminderId);
    await reminderRef.delete();
    return { success: true };
  } catch (error) {
    throw new Error(`Failed to delete payment reminder: ${error.message}`);
  }
};

export const addInvoice = async (userId, invoiceData) => {
  try {
    const invoicesRef = db.collection(collections.INVOICES);
    const docRef = await invoicesRef.add({
      userId,
      ...invoiceData,
      createdAt: new Date()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    throw new Error(`Failed to add invoice: ${error.message}`);
  }
};

export const getInvoices = async (userId) => {
  try {
    const invoicesRef = db.collection(collections.INVOICES);
    const snapshot = await invoicesRef.where('userId', '==', userId).get();
    
    const invoices = [];
    snapshot.forEach(doc => {
      invoices.push({ id: doc.id, ...doc.data() });
    });
    
    return invoices;
  } catch (error) {
    throw new Error(`Failed to get invoices: ${error.message}`);
  }
};

export const updateInvoice = async (invoiceId, updateData) => {
  try {
    const invoiceRef = db.collection(collections.INVOICES).doc(invoiceId);
    await invoiceRef.update({
      ...updateData,
      lastUpdated: new Date()
    });
    return { success: true };
  } catch (error) {
    throw new Error(`Failed to update invoice: ${error.message}`);
  }
};

export const getWhatsAppSettings = async (userId) => {
  try {
    const settingsRef = db.collection(collections.WHATSAPP_SETTINGS).doc(userId);
    const settingsDoc = await settingsRef.get();
    
    if (!settingsDoc.exists) {
      return {
        isConnected: false,
        autoReplyEnabled: false,
        templates: [],
        faqs: []
      };
    }
    
    return { id: settingsDoc.id, ...settingsDoc.data() };
  } catch (error) {
    throw new Error(`Failed to get WhatsApp settings: ${error.message}`);
  }
};

export const updateWhatsAppSettings = async (userId, settingsData) => {
  try {
    const settingsRef = db.collection(collections.WHATSAPP_SETTINGS).doc(userId);
    await settingsRef.set({
      ...settingsData,
      lastUpdated: new Date()
    }, { merge: true });
    return { success: true };
  } catch (error) {
    throw new Error(`Failed to update WhatsApp settings: ${error.message}`);
  }
};



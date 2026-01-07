# Vyapaar AI Database Schema

This document describes the Firebase Firestore database schema for the Vyapaar AI business management application.

## Collections

### 1. users
**Document ID**: `userId` (Firebase Auth UID)

**Fields**:
- `phone` (String): User's phone number
- `name` (String): User's display name
- `shopName` (String): Business/shop name
- `email` (String, optional): User's email address
- `gstin` (String, optional): GST identification number
- `address` (String, optional): Business address
- `createdAt` (Timestamp): Account creation date
- `lastLogin` (Timestamp): Last login date
- `lastUpdated` (Timestamp): Last profile update date

### 2. inventory
**Document ID**: Auto-generated

**Fields**:
- `userId` (String): Foreign key to users collection
- `name` (String): Product name
- `price` (Number): Price per unit
- `quantity` (Number): Current stock quantity
- `category` (String): Product category
- `threshold` (Number): Low stock warning level
- `lastUpdated` (Timestamp): Last inventory update
- `createdAt` (Timestamp): Item creation date

### 3. payments
**Document ID**: Auto-generated

**Fields**:
- `userId` (String): Foreign key to users collection
- `customerName` (String): Customer name
- `amount` (Number): Payment amount
- `dueDate` (Timestamp): Payment due date
- `phone` (String): Customer phone number
- `status` (String): "pending", "overdue", or "paid"
- `originalText` (String, optional): Original voice command text
- `createdAt` (Timestamp): Reminder creation date
- `lastUpdated` (Timestamp): Last update date

### 4. invoices
**Document ID**: Auto-generated

**Fields**:
- `userId` (String): Foreign key to users collection
- `invoiceNumber` (String): Unique invoice number
- `customerName` (String): Customer name
- `customerPhone` (String): Customer phone number
- `amount` (Number): Subtotal before tax
- `gst` (Number): GST amount
- `totalAmount` (Number): Total amount including tax
- `status` (String): "Paid", "Pending", or "Overdue"
- `date` (Timestamp): Invoice date
- `dueDate` (Timestamp): Payment due date
- `items` (Array): Array of invoice items
  - `name` (String): Item name
  - `quantity` (Number): Item quantity
  - `price` (Number): Item price
  - `total` (Number): Item total
- `createdAt` (Timestamp): Invoice creation date
- `lastUpdated` (Timestamp): Last update date

### 5. whatsapp_settings
**Document ID**: `userId`

**Fields**:
- `isConnected` (Boolean): WhatsApp connection status
- `autoReplyEnabled` (Boolean): Auto-reply feature status
- `templates` (Array): Message templates
  - `id` (String): Template ID
  - `name` (String): Template name
  - `message` (String): Template content
  - `category` (String): Template category
  - `isActive` (Boolean): Template status
  - `variables` (Array): Template variables
- `faqs` (Array): Frequently asked questions
  - `id` (String): FAQ ID
  - `question` (String): Question text
  - `answer` (String): Answer text
  - `isActive` (Boolean): FAQ status
- `businessHours` (Object): Store hours
  - `start` (String): Opening time
  - `end` (String): Closing time
- `welcomeMessage` (String): Welcome message for new customers
- `offlineMessage` (String): Message when store is closed
- `lastUpdated` (Timestamp): Last settings update

## Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /inventory/{document} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
    
    match /payments/{document} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
    
    match /invoices/{document} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
    
    match /whatsapp_settings/{userId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == userId;
    }
  }
}
```

## Indexes

### Composite Indexes Required:

1. **inventory collection**:
   - `userId` (Ascending) + `lastUpdated` (Descending)
   - `userId` (Ascending) + `category` (Ascending)

2. **payments collection**:
   - `userId` (Ascending) + `status` (Ascending)
   - `userId` (Ascending) + `dueDate` (Ascending)

3. **invoices collection**:
   - `userId` (Ascending) + `date` (Descending)
   - `userId` (Ascending) + `status` (Ascending)

## Sample Data

### Sample User Document:
```json
{
  "phone": "+919876543210",
  "name": "Rajesh Kumar",
  "shopName": "Raj General Store",
  "email": "rajesh@example.com",
  "gstin": "29ABCDE1234F1Z5",
  "address": "123 Main Street, Delhi, India",
  "createdAt": "2024-01-15T10:30:00Z",
  "lastLogin": "2024-01-20T09:15:00Z"
}
```

### Sample Inventory Item:
```json
{
  "userId": "user123",
  "name": "Maggi 2-Minute Noodles",
  "price": 12,
  "quantity": 45,
  "category": "Food",
  "threshold": 10,
  "lastUpdated": "2024-01-20T14:30:00Z",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

### Sample Payment Reminder:
```json
{
  "userId": "user123",
  "customerName": "Amit Sharma",
  "amount": 2500,
  "dueDate": "2024-01-25T00:00:00Z",
  "phone": "+919876543211",
  "status": "pending",
  "originalText": "Send Amit 2500 rupees reminder for Friday",
  "createdAt": "2024-01-20T10:30:00Z"
}
```

### Sample Invoice:
```json
{
  "userId": "user123",
  "invoiceNumber": "INV-2024-001",
  "customerName": "Priya Singh",
  "customerPhone": "+919876543212",
  "amount": 1200,
  "gst": 216,
  "totalAmount": 1416,
  "status": "Paid",
  "date": "2024-01-15T10:30:00Z",
  "dueDate": "2024-01-30T00:00:00Z",
  "items": [
    {
      "name": "Maggi Noodles",
      "quantity": 5,
      "price": 12,
      "total": 60
    },
    {
      "name": "Tata Tea",
      "quantity": 2,
      "price": 145,
      "total": 290
    }
  ],
  "createdAt": "2024-01-15T10:30:00Z"
}
```



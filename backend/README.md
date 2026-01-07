# Vyapaar AI Backend

A robust Node.js backend API for the Vyapaar AI business management application, built with Express.js and Firebase Firestore.

## Features

- 🔐 **Authentication**: Phone-based OTP authentication with Firebase Auth
- 📦 **Inventory Management**: CRUD operations for product inventory
- 💰 **Payment Reminders**: Voice-activated payment reminder system
- 🧾 **Invoice Management**: Create and manage business invoices
- 📊 **Dashboard Analytics**: Real-time business statistics and insights
- 🎤 **AI Voice Processing**: OpenAI Whisper + GPT-4 for voice commands
- 💬 **WhatsApp Assistant**: AI-powered customer support chatbot
- 🔒 **Security**: JWT tokens, rate limiting, and input validation

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: Firebase Firestore
- **AI Services**: OpenAI (Whisper, GPT-4)
- **Authentication**: Firebase Auth + JWT
- **File Upload**: Multer
- **Validation**: Joi
- **Security**: Helmet, CORS, Rate Limiting

## Quick Start

### 1. Prerequisites

- Node.js 18 or higher
- Firebase project with Firestore enabled
- OpenAI API key
- Phone number for Firebase Auth

### 2. Installation

```bash
# Clone the repository
git clone <repository-url>
cd vyapaar-ai-backend

# Install dependencies
npm install

# Copy environment variables
cp env.example .env

# Configure your environment variables
# Edit .env with your Firebase and OpenAI credentials
```

### 3. Environment Setup

Create a `.env` file with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Firebase Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com

# OpenAI Configuration
OPENAI_API_KEY=your-openai-api-key

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

### 4. Firebase Setup

1. Create a Firebase project
2. Enable Firestore Database
3. Enable Authentication with Phone provider
4. Generate a service account key
5. Update the `.env` file with your Firebase credentials

### 5. Run the Application

```bash
# Development mode
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /auth/send-otp` - Send OTP to phone number
- `POST /auth/verify-otp` - Verify OTP and get JWT token
- `POST /auth/refresh-token` - Refresh JWT token

### Inventory Management
- `GET /api/inventory` - Get all inventory items
- `POST /api/inventory` - Add new inventory item
- `PUT /api/inventory/:id` - Update inventory item
- `DELETE /api/inventory/:id` - Delete inventory item
- `GET /api/inventory/low-stock` - Get low stock items

### Payment Reminders
- `GET /api/payments` - Get all payment reminders
- `POST /api/payments` - Create payment reminder
- `PUT /api/payments/:id` - Update payment reminder
- `DELETE /api/payments/:id` - Delete payment reminder
- `PUT /api/payments/:id/mark-paid` - Mark payment as paid
- `GET /api/payments/stats` - Get payment statistics

### Invoices
- `GET /api/invoices` - Get all invoices
- `POST /api/invoices` - Create new invoice
- `PUT /api/invoices/:id` - Update invoice
- `PUT /api/invoices/:id/status` - Update invoice status
- `GET /api/invoices/stats` - Get invoice statistics

### Dashboard
- `GET /api/dashboard/stats` - Get business statistics
- `GET /api/dashboard/insights` - Get AI business insights

### Voice Processing
- `POST /api/voice/process-command` - Process voice command with AI
- `POST /api/voice/test-transcription` - Test audio transcription

### WhatsApp Assistant
- `POST /api/whatsapp/chat` - Chat with AI assistant
- `GET /api/whatsapp/settings` - Get WhatsApp settings
- `PUT /api/whatsapp/settings` - Update WhatsApp settings
- `POST /api/whatsapp/send-message` - Send WhatsApp message
- `POST /api/whatsapp/test-bot` - Test bot responses

## Authentication

All API endpoints (except `/auth/*`) require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Voice Commands

The AI voice processing supports natural language commands:

### Inventory Commands
- "Add 10 Maggi packets at 12 rupees each"
- "Stock 15 Tata Tea Gold at 145 rupees per pack"
- "Add 30 Parle-G biscuits at 5 rupees each"

### Payment Reminder Commands
- "Send Ramesh a 1200 rupees reminder for Friday"
- "Remind Amit to pay 2500 rupees today"
- "Send Priya 800 rupees reminder for next week"

## Error Handling

The API returns consistent error responses:

```json
{
  "error": "Error Type",
  "message": "Human readable error message",
  "code": "ERROR_CODE"
}
```

Common error codes:
- `NO_TOKEN` - Missing authentication token
- `INVALID_TOKEN` - Invalid or expired token
- `MISSING_FIELDS` - Required fields missing
- `VALIDATION_ERROR` - Input validation failed
- `NOT_FOUND` - Resource not found
- `DUPLICATE_ENTRY` - Resource already exists

## Rate Limiting

The API implements rate limiting:
- 100 requests per 15 minutes per IP
- Configurable via environment variables

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: Prevent abuse
- **Input Validation**: Joi validation
- **JWT Tokens**: Secure authentication
- **Firebase Security Rules**: Database-level security

## Database Schema

See `database/README.md` for detailed database schema documentation.

## Development

### Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── firebase.js
│   │   └── database.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── notFound.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── inventory.js
│   │   ├── payments.js
│   │   ├── invoices.js
│   │   ├── dashboard.js
│   │   ├── voice.js
│   │   └── whatsapp.js
│   └── server.js
├── database/
│   ├── README.md
│   └── setup.js
├── package.json
├── env.example
└── README.md
```

### Adding New Features

1. Create route file in `src/routes/`
2. Add database functions in `src/config/database.js`
3. Update authentication middleware if needed
4. Add validation and error handling
5. Update API documentation

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
FIREBASE_PROJECT_ID=your-production-project-id
OPENAI_API_KEY=your-production-openai-key
JWT_SECRET=your-production-jwt-secret
CORS_ORIGIN=https://your-frontend-domain.com
```

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## Monitoring

- Health check endpoint: `GET /health`
- Logging with Morgan
- Error tracking and reporting
- Performance monitoring

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## Changelog

### v1.0.0
- Initial release
- Authentication system
- Inventory management
- Payment reminders
- Invoice management
- Dashboard analytics
- AI voice processing
- WhatsApp assistant



# Vyapaar AI - Complete Business Management Solution

A comprehensive AI-powered business management application designed specifically for Indian small businesses, featuring voice commands, WhatsApp integration, and intelligent analytics.

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- Firebase project with Firestore enabled
- OpenAI API key
- Phone number for Firebase Auth

### Installation

1. **Clone and setup the project:**
```bash
# Install all dependencies
npm run install:all

# Setup backend configuration
npm run setup

# Configure environment variables
# Edit backend/.env with your Firebase and OpenAI credentials
```

2. **Start development servers:**
```bash
# Start both frontend and backend
npm run dev

# Or start individually
npm run dev:frontend  # Frontend on http://localhost:5173
npm run dev:backend   # Backend on http://localhost:5000
```

3. **Setup database:**
```bash
# Setup Firestore collections
npm run db:setup

# Create sample data (optional)
npm run db:sample
```

## 📁 Project Structure

```
vyapaar-ai/
├── frontend/                 # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Main application pages
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility functions
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # Node.js + Express + Firebase
│   ├── src/
│   │   ├── config/         # Database and service configs
│   │   ├── middleware/     # Authentication and error handling
│   │   ├── routes/         # API route handlers
│   │   └── server.js       # Main server file
│   └── package.json
├── database/               # Database schema and setup
│   ├── README.md          # Schema documentation
│   └── setup.js           # Database setup script
├── package.json           # Root package.json for workspace management
└── README.md              # This file
```

## 🎯 Features

### Frontend Features
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- **Responsive Design**: Mobile-first approach with shadcn/ui components
- **Dark/Light Theme**: Theme switching capability
- **Voice Integration**: Voice input for inventory and payment reminders
- **Real-time Updates**: Live data synchronization
- **Bilingual Support**: English and Hindi language support

### Backend Features
- **RESTful API**: Well-structured Express.js API
- **Authentication**: Firebase Auth with JWT tokens
- **AI Integration**: OpenAI Whisper + GPT-4 for voice processing
- **Database**: Firebase Firestore for scalable data storage
- **Security**: Rate limiting, CORS, input validation
- **Error Handling**: Comprehensive error management

### AI-Powered Capabilities
- **Voice Commands**: Natural language processing for inventory and payments
- **WhatsApp Assistant**: AI chatbot for customer support
- **Business Insights**: Smart analytics and recommendations
- **Multi-language**: Support for English and Hindi

## 🛠️ Available Scripts

### Root Level Commands
```bash
npm run dev              # Start both frontend and backend
npm run build            # Build both frontend and backend
npm run install:all      # Install all dependencies
npm run setup            # Setup backend configuration
npm run lint             # Lint both frontend and backend
npm run test             # Test both frontend and backend
npm run clean            # Clean all node_modules and build files
```

### Frontend Commands
```bash
npm run dev:frontend     # Start frontend development server
npm run build:frontend   # Build frontend for production
npm run lint:frontend    # Lint frontend code
npm run test:frontend    # Test frontend
```

### Backend Commands
```bash
npm run dev:backend      # Start backend development server
npm run build:backend    # Build backend for production
npm run start:backend    # Start backend in production mode
npm run lint:backend     # Lint backend code
npm run test:backend     # Test backend
```

### Database Commands
```bash
npm run db:setup         # Setup Firestore collections
npm run db:sample        # Create sample data
```

## 🔧 Configuration

### Frontend Configuration
- **Port**: 5173 (configurable in `frontend/vite.config.ts`)
- **API Base URL**: `http://localhost:5000` (configurable in environment variables)

### Backend Configuration
- **Port**: 5000 (configurable in `backend/.env`)
- **Database**: Firebase Firestore
- **AI Service**: OpenAI API

### Environment Variables
Create `backend/.env` with the following variables:

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

## 📡 API Endpoints

### Authentication
- `POST /auth/send-otp` - Send OTP to phone number
- `POST /auth/verify-otp` - Verify OTP and get JWT token

### Inventory Management
- `GET /api/inventory` - Get all inventory items
- `POST /api/inventory` - Add new inventory item
- `PUT /api/inventory/:id` - Update inventory item
- `DELETE /api/inventory/:id` - Delete inventory item

### Payment Reminders
- `GET /api/payments` - Get all payment reminders
- `POST /api/payments` - Create payment reminder
- `PUT /api/payments/:id` - Update payment reminder
- `DELETE /api/payments/:id` - Delete payment reminder

### Invoices
- `GET /api/invoices` - Get all invoices
- `POST /api/invoices` - Create new invoice
- `PUT /api/invoices/:id` - Update invoice

### AI Features
- `POST /api/voice/process-command` - Process voice commands
- `POST /api/whatsapp/chat` - Chat with AI assistant

### Dashboard
- `GET /api/dashboard/stats` - Get business statistics
- `GET /api/dashboard/insights` - Get AI insights

## 🎤 Voice Commands

### Inventory Commands
- "Add 10 Maggi packets at 12 rupees each"
- "Stock 15 Tata Tea Gold at 145 rupees per pack"
- "Add 30 Parle-G biscuits at 5 rupees each"

### Payment Commands
- "Send Ramesh a 1200 rupees reminder for Friday"
- "Remind Amit to pay 2500 rupees today"
- "Send Priya 800 rupees reminder for next week"

## 💬 WhatsApp Integration

### Features
- **Auto-reply**: Automated responses to customer queries
- **Templates**: Pre-built message templates
- **FAQs**: Frequently asked questions database
- **AI Chatbot**: GPT-4 powered customer support
- **Multi-language**: English and Hindi support

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

### Docker (Optional)
```bash
# Build Docker images
docker build -t vyapaar-ai-frontend ./frontend
docker build -t vyapaar-ai-backend ./backend

# Run with Docker Compose
docker-compose up
```

## 🔒 Security Features

- **Authentication**: Firebase Auth with phone verification
- **Data Protection**: Firebase security rules
- **API Security**: Rate limiting, CORS, input validation
- **JWT Tokens**: Secure API access

## 📚 Documentation

- **Frontend**: `frontend/README.md`
- **Backend**: `backend/README.md`
- **Database**: `database/README.md`
- **API**: Check individual route files in `backend/src/routes/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- **Documentation**: Check README files
- **Issues**: Create GitHub issues
- **Community**: Join our community forum

---

**Vyapaar AI** - Empowering Indian businesses with AI-driven management tools! 🚀



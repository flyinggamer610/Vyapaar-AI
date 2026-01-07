# Vyapaar AI - Project Structure

## 📁 Complete Project Organization

```
vyapaar-ai/
├── 📁 frontend/                    # React Frontend Application
│   ├── 📁 src/
│   │   ├── 📁 components/         # Reusable UI Components
│   │   │   ├── 📁 ui/            # shadcn/ui components
│   │   │   ├── AppSidebar.tsx    # Main navigation sidebar
│   │   │   ├── ReminderCard.tsx  # Payment reminder card
│   │   │   ├── VoiceReminderButton.tsx # Voice input component
│   │   │   ├── theme-provider.tsx # Theme context provider
│   │   │   └── theme-toggle.tsx  # Theme switcher
│   │   ├── 📁 pages/             # Main Application Pages
│   │   │   ├── Dashboard.tsx     # Main dashboard
│   │   │   ├── Inventory.tsx     # Inventory management
│   │   │   ├── Invoices.tsx      # Invoice management
│   │   │   ├── Payments.tsx      # Payment reminders
│   │   │   ├── WhatsAppSettings.tsx # WhatsApp bot settings
│   │   │   ├── Reports.tsx       # Analytics and reports
│   │   │   ├── Profile.tsx       # User profile
│   │   │   ├── Login.tsx         # Authentication
│   │   │   ├── Index.tsx         # Landing page
│   │   │   └── NotFound.tsx      # 404 page
│   │   ├── 📁 hooks/             # Custom React Hooks
│   │   │   ├── use-mobile.tsx    # Mobile detection hook
│   │   │   └── use-toast.ts      # Toast notification hook
│   │   ├── 📁 lib/               # Utility Functions
│   │   │   └── utils.ts          # Common utilities
│   │   ├── App.tsx               # Main App component
│   │   ├── App.css               # App styles
│   │   ├── main.tsx              # Application entry point
│   │   ├── index.css             # Global styles
│   │   └── vite-env.d.ts         # Vite type definitions
│   ├── 📁 public/                # Static Assets
│   │   ├── favicon.ico           # Site favicon
│   │   ├── placeholder.svg       # Placeholder image
│   │   └── robots.txt            # SEO robots file
│   ├── package.json              # Frontend dependencies
│   ├── package-lock.json         # Lock file
│   ├── bun.lockb                 # Bun lock file
│   ├── vite.config.ts            # Vite configuration
│   ├── tailwind.config.ts        # Tailwind CSS config
│   ├── postcss.config.js         # PostCSS config
│   ├── tsconfig.json             # TypeScript config
│   ├── tsconfig.app.json         # App TypeScript config
│   ├── tsconfig.node.json        # Node TypeScript config
│   ├── eslint.config.js          # ESLint configuration
│   ├── components.json           # shadcn/ui config
│   └── index.html                # HTML entry point
├── 📁 backend/                   # Node.js Backend API
│   ├── 📁 src/
│   │   ├── 📁 config/            # Configuration Files
│   │   │   ├── firebase.js       # Firebase configuration
│   │   │   └── database.js       # Database operations
│   │   ├── 📁 middleware/        # Express Middleware
│   │   │   ├── auth.js           # Authentication middleware
│   │   │   ├── errorHandler.js   # Error handling middleware
│   │   │   └── notFound.js       # 404 handler
│   │   ├── 📁 routes/            # API Route Handlers
│   │   │   ├── auth.js           # Authentication routes
│   │   │   ├── inventory.js      # Inventory management
│   │   │   ├── payments.js       # Payment reminders
│   │   │   ├── invoices.js       # Invoice management
│   │   │   ├── dashboard.js      # Dashboard analytics
│   │   │   ├── voice.js          # AI voice processing
│   │   │   └── whatsapp.js       # WhatsApp integration
│   │   └── server.js             # Main server file
│   ├── package.json              # Backend dependencies
│   ├── env.example               # Environment variables template
│   └── README.md                 # Backend documentation
├── 📁 database/                  # Database Schema & Setup
│   ├── README.md                 # Database documentation
│   └── setup.js                  # Database setup script
├── package.json                  # Root workspace configuration
├── README.md                     # Main project documentation
├── PROJECT_OVERVIEW.md           # Comprehensive project overview
├── PROJECT_STRUCTURE.md          # This file
└── setup-backend.js              # Backend setup script
```

## 🚀 Quick Start Commands

### Install Dependencies
```bash
# Install all dependencies (root, frontend, backend)
npm run install:all

# Or install individually
npm install                    # Root dependencies
cd frontend && npm install     # Frontend dependencies
cd ../backend && npm install   # Backend dependencies
```

### Development
```bash
# Start both frontend and backend
npm run dev

# Start individually
npm run dev:frontend    # Frontend on http://localhost:5173
npm run dev:backend     # Backend on http://localhost:5000
```

### Build & Production
```bash
# Build both frontend and backend
npm run build

# Build individually
npm run build:frontend
npm run build:backend
```

### Database Setup
```bash
# Setup Firestore collections
npm run db:setup

# Create sample data
npm run db:sample
```

## 🔧 Configuration Files

### Frontend Configuration
- **Vite**: `frontend/vite.config.ts` - Build tool configuration
- **TypeScript**: `frontend/tsconfig.json` - Type checking
- **Tailwind**: `frontend/tailwind.config.ts` - CSS framework
- **ESLint**: `frontend/eslint.config.js` - Code linting
- **Components**: `frontend/components.json` - shadcn/ui config

### Backend Configuration
- **Environment**: `backend/.env` - Environment variables
- **Package**: `backend/package.json` - Dependencies and scripts
- **Server**: `backend/src/server.js` - Main server configuration

### Root Configuration
- **Workspace**: `package.json` - Monorepo management
- **Documentation**: `README.md` - Project overview

## 📊 Technology Stack

### Frontend Stack
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **React Router** - Routing
- **TanStack Query** - Data fetching

### Backend Stack
- **Node.js 18+** - Runtime
- **Express.js** - Web framework
- **Firebase Admin** - Database and auth
- **OpenAI API** - AI services
- **JWT** - Authentication
- **Multer** - File uploads

### Database
- **Firebase Firestore** - NoSQL database
- **Firebase Auth** - Authentication
- **Security Rules** - Data protection

## 🎯 Key Features by Directory

### Frontend Features (`frontend/src/`)
- **Dashboard**: Business analytics and insights
- **Inventory**: Product management with voice commands
- **Invoices**: Billing and invoice generation
- **Payments**: Payment reminder management
- **WhatsApp**: Bot configuration and testing
- **Voice**: AI-powered voice input
- **Theme**: Dark/light mode switching

### Backend Features (`backend/src/`)
- **Authentication**: Phone-based OTP auth
- **API Routes**: RESTful endpoints
- **AI Integration**: OpenAI Whisper + GPT-4
- **Database**: Firestore operations
- **Security**: Rate limiting, validation
- **Error Handling**: Comprehensive error management

### Database Features (`database/`)
- **Schema**: Documented data structure
- **Setup**: Automated collection creation
- **Security**: Firebase security rules
- **Indexes**: Performance optimization

## 🔒 Security & Best Practices

### Frontend Security
- **Type Safety**: TypeScript throughout
- **Input Validation**: Form validation
- **Secure Storage**: JWT token management
- **CORS**: Cross-origin protection

### Backend Security
- **Authentication**: Firebase Auth + JWT
- **Rate Limiting**: API abuse prevention
- **Input Validation**: Request validation
- **Error Handling**: Secure error responses

### Database Security
- **Firebase Rules**: User data isolation
- **Encryption**: Data at rest and in transit
- **Access Control**: Role-based permissions

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Touch Friendly**: Voice input and touch interactions
- **Progressive Web App**: Offline capabilities
- **Cross Platform**: Works on all devices

## 🌐 Internationalization

- **Bilingual**: English and Hindi support
- **Localized**: Number and date formatting
- **Cultural**: Indian business context
- **Accessible**: Screen reader support

---

**Project Status**: ✅ Complete and Ready for Development

**Next Steps**: 
1. Update Node.js to version 18+
2. Configure environment variables
3. Run `npm run dev` to start development



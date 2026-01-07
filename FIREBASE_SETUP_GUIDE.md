# 🔥 Firebase Setup Guide for Vyapaar AI

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Project name: `vyapaar-ai` (or your preferred name)
4. Enable Google Analytics: Yes
5. Click "Create project"

## Step 2: Enable Required Services

### Enable Firestore Database
1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location (choose closest to you)
5. Click "Done"

### Enable Authentication
1. Go to "Authentication" in Firebase Console
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Phone" provider
5. Click "Save"

## Step 3: Generate Service Account Key

1. Go to "Project Settings" (gear icon)
2. Go to "Service accounts" tab
3. Click "Generate new private key"
4. Download the JSON file
5. Keep this file secure!

## Step 4: Configure Backend

Create `backend/.env` file with your Firebase credentials:

```env
# Firebase Configuration (from downloaded JSON file)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-private-key\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=your-client-cert-url

# OpenAI Configuration
OPENAI_API_KEY=your-openai-api-key

# JWT Secret (generate a random string)
JWT_SECRET=your-super-secret-jwt-key-here
```

## Step 5: Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up/Login
3. Go to "API Keys"
4. Click "Create new secret key"
5. Copy the key and add to `.env` file

## Step 6: Run the Project

After configuration:

```bash
# Install dependencies
npm run install:all

# Start development servers
npm run dev
```

## Step 7: Test the Application

1. Frontend: http://localhost:5173
2. Backend API: http://localhost:5000
3. Test endpoints:
   - GET http://localhost:5000/health
   - GET http://localhost:5000/api/inventory

## 🔧 Quick Setup Commands

```bash
# Copy environment template
cp backend/.env.example backend/.env

# Edit the .env file with your credentials
# Then run:
npm run dev
```

## 📱 Features That Will Work After Setup

- ✅ User authentication with phone numbers
- ✅ Real-time inventory management
- ✅ Payment reminders with Firestore
- ✅ Invoice generation
- ✅ AI voice commands (with OpenAI)
- ✅ WhatsApp bot integration
- ✅ Dashboard with real data

## 🆘 Troubleshooting

### Common Issues:

1. **Firebase credentials error**: Check your `.env` file format
2. **CORS errors**: Backend is configured to allow frontend origin
3. **Module not found**: Run `npm run install:all`
4. **Port already in use**: Kill existing processes or change ports

### Need Help?

- Check the console logs for specific errors
- Ensure all environment variables are set correctly
- Verify Firebase project is properly configured


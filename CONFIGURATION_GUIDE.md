# 🔧 Vyapaar AI Configuration Guide

## 📋 Required Configuration Steps

### 1. ✅ Node.js Version
- **Current**: Node.js v22.14.0 ✅
- **Status**: Perfect! You're using the latest version.

### 2. ✅ Dependencies Installation
- **Frontend**: ✅ Installed successfully
- **Backend**: ✅ Installed successfully
- **Status**: All dependencies are ready!

### 3. 🔧 Backend Environment Configuration

You need to configure the following in `backend/.env`:

#### 🔥 Firebase Configuration (Required)
1. **Go to [Firebase Console](https://console.firebase.google.com/)**
2. **Create a new project** or use existing one
3. **Enable Firestore Database**:
   - Go to Firestore Database
   - Click "Create database"
   - Choose "Start in test mode"
4. **Enable Authentication**:
   - Go to Authentication
   - Click "Get started"
   - Go to "Sign-in method" tab
   - Enable "Phone" provider
5. **Generate Service Account Key**:
   - Go to Project Settings → Service Accounts
   - Click "Generate new private key"
   - Download the JSON file
6. **Update your `.env` file** with the values from the JSON:

```env
FIREBASE_PROJECT_ID=your-actual-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_ACTUAL_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40your-project-id.iam.gserviceaccount.com
```

#### 🤖 OpenAI Configuration (Required for AI Features)
1. **Go to [OpenAI Platform](https://platform.openai.com/)**
2. **Sign up/Login** to your account
3. **Go to API Keys** section
4. **Create a new API key**
5. **Update your `.env` file**:

```env
OPENAI_API_KEY=sk-your-actual-openai-api-key
```

#### 🔐 JWT Configuration (Required)
Generate a secure JWT secret:

```env
JWT_SECRET=your-super-secure-random-string-here
JWT_EXPIRES_IN=7d
```

#### 🌐 CORS Configuration (Optional)
The default is already set for development:

```env
CORS_ORIGIN=http://localhost:5173
```

#### 📱 WhatsApp Configuration (Optional)
For WhatsApp integration features:

```env
WHATSAPP_ACCESS_TOKEN=your-whatsapp-access-token
WHATSAPP_PHONE_NUMBER_ID=your-phone-number-id
```

## 🚀 Quick Start (Minimal Configuration)

For a quick start, you only need to configure:

1. **Firebase Project ID** (replace `your-project-id`)
2. **OpenAI API Key** (replace `your-openai-api-key`)
3. **JWT Secret** (generate a random string)

## 📝 Configuration Checklist

- [ ] Firebase project created
- [ ] Firestore database enabled
- [ ] Authentication with Phone provider enabled
- [ ] Service account key downloaded
- [ ] Firebase credentials added to `.env`
- [ ] OpenAI API key obtained
- [ ] OpenAI API key added to `.env`
- [ ] JWT secret generated and added to `.env`

## 🔍 Testing Your Configuration

Once configured, test your setup:

```bash
# Test backend configuration
cd backend && npm run dev

# Test frontend (in another terminal)
cd frontend && npm run dev
```

## 🆘 Need Help?

1. **Firebase Setup**: Check [Firebase Documentation](https://firebase.google.com/docs)
2. **OpenAI Setup**: Check [OpenAI Documentation](https://platform.openai.com/docs)
3. **Project Issues**: Check the README files in each directory

## 🎯 Next Steps After Configuration

1. **Start Development Servers**:
   ```bash
   npm run dev
   ```

2. **Setup Database**:
   ```bash
   npm run db:setup
   ```

3. **Create Sample Data** (optional):
   ```bash
   npm run db:sample
   ```

4. **Open Your Application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

---

**Ready to configure?** Edit `backend/.env` with your actual credentials! 🚀


@echo off
echo 🚀 Starting Vyapaar AI Complete Project...
echo.

echo 📋 Checking configuration...
if not exist "backend\.env" (
    echo ⚠️  Backend .env file not found!
    echo 📝 Please follow FIREBASE_SETUP_GUIDE.md to configure Firebase
    echo.
    echo 🔧 Creating demo .env file...
    echo FIREBASE_PROJECT_ID=demo-project > backend\.env
    echo FIREBASE_PRIVATE_KEY_ID=demo-key >> backend\.env
    echo FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\ndemo\n-----END PRIVATE KEY-----\n" >> backend\.env
    echo FIREBASE_CLIENT_EMAIL=demo@demo.com >> backend\.env
    echo FIREBASE_CLIENT_ID=123456789 >> backend\.env
    echo FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth >> backend\.env
    echo FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token >> backend\.env
    echo FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs >> backend\.env
    echo FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/demo >> backend\.env
    echo OPENAI_API_KEY=demo-key >> backend\.env
    echo JWT_SECRET=demo-secret-key >> backend\.env
    echo ✅ Demo .env file created
)

echo.
echo 🔌 Starting Backend Server...
start "Backend Server" cmd /k "node backend-with-firebase.js"

timeout /t 3 /nobreak >nul

echo.
echo 🎨 Starting Frontend Server...
cd frontend
start "Frontend Server" cmd /k "npm run dev"

timeout /t 5 /nobreak >nul

echo.
echo ✅ Project is starting up!
echo 📱 Frontend: http://localhost:5173
echo 🔌 Backend: http://localhost:5000
echo.
echo 🎯 Features available:
echo   ✅ User Authentication (Phone OTP)
echo   ✅ Inventory Management
echo   ✅ Payment Reminders
echo   ✅ Invoice Generation
echo   ✅ Dashboard Analytics
echo   ✅ AI Voice Commands (Demo)
echo   ✅ WhatsApp Bot (Demo)
echo.
echo 🔧 To enable full AI features:
echo   1. Follow FIREBASE_SETUP_GUIDE.md
echo   2. Configure Firebase credentials
echo   3. Add OpenAI API key
echo.
echo Press any key to open the application...
pause >nul

start http://localhost:5173

echo.
echo 🎉 Vyapaar AI is now running!
echo Check the opened browser window to see your application.
echo.
echo Press any key to exit...
pause >nul


@echo off
echo 🚀 Starting Vyapaar AI Main Project...
echo.

echo 📦 Installing frontend dependencies...
cd frontend
call npm install
if errorlevel 1 (
    echo ❌ Frontend dependencies failed to install
    pause
    exit /b 1
)

echo.
echo 🎨 Starting Frontend Server...
start "Frontend Server" cmd /k "npm run dev"

cd ..

echo.
echo 📦 Installing backend dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo ❌ Backend dependencies failed to install
    pause
    exit /b 1
)

echo.
echo 🔌 Starting Backend Server...
start "Backend Server" cmd /k "npm start"

cd ..

echo.
echo ✅ Project is starting up!
echo 📱 Frontend: http://localhost:5173
echo 🔌 Backend: http://localhost:5000
echo.
echo 🎯 Features available:
echo   ✅ User Authentication
echo   ✅ Inventory Management
echo   ✅ Payment Reminders
echo   ✅ Invoice Generation
echo   ✅ Dashboard Analytics
echo   ✅ AI Voice Commands
echo   ✅ WhatsApp Bot
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


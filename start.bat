@echo off
echo 🚀 Starting Vyapaar AI...
echo.

echo 🔌 Starting Backend Server...
start "Backend Server" cmd /k "node server.js"

timeout /t 3 /nobreak >nul

echo.
echo 🎨 Opening Frontend...
start "Frontend" cmd /k "start index.html"

echo.
echo ✅ Project is running!
echo 📱 Frontend: index.html (opened in browser)
echo 🔌 Backend: http://localhost:5000
echo.
echo 🎯 Features available:
echo   ✅ Dashboard with Analytics
echo   ✅ Inventory Management
echo   ✅ Payment Reminders
echo   ✅ Invoice Management
echo   ✅ WhatsApp Bot Interface
echo   ✅ Reports and Analytics
echo.
echo Press any key to exit...
pause >nul


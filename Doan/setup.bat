@echo off
echo ================================
echo Cake Store Setup Script
echo ================================
echo.

echo [1/4] Installing backend dependencies...
call npm install cors dotenv bcryptjs jsonwebtoken
if %errorlevel% neq 0 (
    echo Failed to install backend dependencies
    pause
    exit /b 1
)

echo.
echo [2/4] Installing frontend dependencies...
cd client
call npm install
if %errorlevel% neq 0 (
    echo Failed to install frontend dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo [3/4] Setup complete!
echo.
echo ================================
echo Next Steps:
echo ================================
echo 1. Make sure MongoDB is running on localhost:27017
echo 2. Database should be named 'cakestore'
echo 3. Start backend: npm start
echo 4. Start frontend: cd client ^&^& npm run dev
echo 5. Create admin account by calling: POST http://localhost:3001/users/setup-admin
echo.
echo Default Admin Credentials (after setup):
echo Username: admin
echo Password: admin123
echo ================================
pause

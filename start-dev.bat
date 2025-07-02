@echo off
echo 🚀 Starting TandaBase Local Development Environment...

REM Get the current directory (project root)
set PROJECT_ROOT=%~dp0

echo 📦 Checking dependencies...

REM Check and install server dependencies
if not exist "%PROJECT_ROOT%server\node_modules" (
    echo ⚠️  Server dependencies not found. Installing...
    cd /d "%PROJECT_ROOT%server" && npm install
)

REM Check and install client dependencies
if not exist "%PROJECT_ROOT%client\node_modules" (
    echo ⚠️  Client dependencies not found. Installing...
    cd /d "%PROJECT_ROOT%client" && npm install
)

echo ✅ Dependencies checked!

echo 🖥️  Starting server in new window...
start "TandaBase Server" cmd /k "cd /d %PROJECT_ROOT%server && echo 🖥️  Starting TandaBase Server... && npm start"

echo 🌐 Starting client in new window...
start "TandaBase Client" cmd /k "cd /d %PROJECT_ROOT%client && echo 🌐 Starting TandaBase Client... && npm run dev"

echo ⏳ Waiting for services to start...
timeout /t 8 /nobreak > nul

echo 🌐 Opening TandaBase in your default browser...
start "" "http://localhost:5173"

echo.
echo 🎉 TandaBase Local Development Environment is starting!
echo.
echo 📋 What's happening:
echo    • Server: Running on http://localhost:3000 (or check server window for actual port)
echo    • Client: Running on http://localhost:5173 (or check client window for actual port)
echo    • Browser: Opening http://localhost:5173 automatically
echo.
echo 💡 Two new command prompt windows have been opened:
echo    • Window 1: Server (backend)
echo    • Window 2: Client (frontend)
echo.
echo 🛑 To stop the services:
echo    • Press Ctrl+C in each command prompt window
echo    • Or close the command prompt windows
echo.
echo Happy coding! 🎵
pause

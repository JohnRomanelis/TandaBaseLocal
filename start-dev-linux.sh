#!/bin/bash

# TandaBase Local Development Startup Script (Ubuntu/Linux version)
# This script starts both the server and client in separate terminal tabs/windows

echo "🚀 Starting TandaBase Local Development Environment (Ubuntu/Linux)..."

# Get the current directory (project root)
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Function to check if dependencies are installed
check_dependencies() {
    echo "📦 Checking dependencies..."
    
    # Check server dependencies
    if [ ! -d "$PROJECT_ROOT/server/node_modules" ]; then
        echo "⚠️  Server dependencies not found. Installing..."
        cd "$PROJECT_ROOT/server" && npm install
    fi
    
    # Check client dependencies
    if [ ! -d "$PROJECT_ROOT/client/node_modules" ]; then
        echo "⚠️  Client dependencies not found. Installing..."
        cd "$PROJECT_ROOT/client" && npm install
    fi
    
    echo "✅ Dependencies checked!"
}

# Function to detect and use available terminal
detect_terminal() {
    if command -v gnome-terminal >/dev/null 2>&1; then
        echo "gnome-terminal"
    elif command -v konsole >/dev/null 2>&1; then
        echo "konsole"
    elif command -v xfce4-terminal >/dev/null 2>&1; then
        echo "xfce4-terminal"
    elif command -v mate-terminal >/dev/null 2>&1; then
        echo "mate-terminal"
    elif command -v terminator >/dev/null 2>&1; then
        echo "terminator"
    elif command -v xterm >/dev/null 2>&1; then
        echo "xterm"
    else
        echo "unknown"
    fi
}

# Function to open browser
open_browser() {
    if command -v xdg-open >/dev/null 2>&1; then
        xdg-open "$1"
    elif command -v firefox >/dev/null 2>&1; then
        firefox "$1" &
    elif command -v google-chrome >/dev/null 2>&1; then
        google-chrome "$1" &
    elif command -v chromium-browser >/dev/null 2>&1; then
        chromium-browser "$1" &
    else
        echo "⚠️  Could not detect browser. Please manually open: $1"
    fi
}

# Check dependencies first
check_dependencies

# Detect terminal
TERMINAL=$(detect_terminal)
echo "🖥️  Detected terminal: $TERMINAL"

# Start server in a new terminal tab/window
echo "🖥️  Starting server..."
case $TERMINAL in
    "gnome-terminal")
        gnome-terminal --tab --title="TandaBase Server" -- bash -c "cd '$PROJECT_ROOT/server' && echo '🖥️  Starting TandaBase Server...' && npm start; exec bash"
        ;;
    "konsole")
        konsole --new-tab --title "TandaBase Server" -e bash -c "cd '$PROJECT_ROOT/server' && echo '🖥️  Starting TandaBase Server...' && npm start; exec bash" &
        ;;
    "xfce4-terminal")
        xfce4-terminal --tab --title="TandaBase Server" --command="bash -c 'cd \"$PROJECT_ROOT/server\" && echo \"🖥️  Starting TandaBase Server...\" && npm start; exec bash'" &
        ;;
    "mate-terminal")
        mate-terminal --tab --title="TandaBase Server" --command="bash -c 'cd \"$PROJECT_ROOT/server\" && echo \"🖥️  Starting TandaBase Server...\" && npm start; exec bash'" &
        ;;
    "terminator")
        terminator --new-tab --title="TandaBase Server" --command="bash -c 'cd \"$PROJECT_ROOT/server\" && echo \"🖥️  Starting TandaBase Server...\" && npm start; exec bash'" &
        ;;
    "xterm")
        xterm -T "TandaBase Server" -e "bash -c 'cd \"$PROJECT_ROOT/server\" && echo \"🖥️  Starting TandaBase Server...\" && npm start; exec bash'" &
        ;;
    *)
        echo "⚠️  Could not detect compatible terminal. Starting server in background..."
        cd "$PROJECT_ROOT/server" && npm start &
        SERVER_PID=$!
        echo "🖥️  Server started with PID: $SERVER_PID"
        ;;
esac

# Wait a moment for the server tab to open
sleep 3

# Start client in another new terminal tab/window
echo "🌐 Starting client..."
case $TERMINAL in
    "gnome-terminal")
        gnome-terminal --tab --title="TandaBase Client" -- bash -c "cd '$PROJECT_ROOT/client' && echo '🌐 Starting TandaBase Client...' && npm run dev; exec bash"
        ;;
    "konsole")
        konsole --new-tab --title "TandaBase Client" -e bash -c "cd '$PROJECT_ROOT/client' && echo '🌐 Starting TandaBase Client...' && npm run dev; exec bash" &
        ;;
    "xfce4-terminal")
        xfce4-terminal --tab --title="TandaBase Client" --command="bash -c 'cd \"$PROJECT_ROOT/client\" && echo \"🌐 Starting TandaBase Client...\" && npm run dev; exec bash'" &
        ;;
    "mate-terminal")
        mate-terminal --tab --title="TandaBase Client" --command="bash -c 'cd \"$PROJECT_ROOT/client\" && echo \"🌐 Starting TandaBase Client...\" && npm run dev; exec bash'" &
        ;;
    "terminator")
        terminator --new-tab --title="TandaBase Client" --command="bash -c 'cd \"$PROJECT_ROOT/client\" && echo \"🌐 Starting TandaBase Client...\" && npm run dev; exec bash'" &
        ;;
    "xterm")
        xterm -T "TandaBase Client" -e "bash -c 'cd \"$PROJECT_ROOT/client\" && echo \"🌐 Starting TandaBase Client...\" && npm run dev; exec bash'" &
        ;;
    *)
        echo "⚠️  Could not detect compatible terminal. Starting client in background..."
        cd "$PROJECT_ROOT/client" && npm run dev &
        CLIENT_PID=$!
        echo "🌐 Client started with PID: $CLIENT_PID"
        ;;
esac

# Wait for services to start and then open browser
echo "⏳ Waiting for services to start..."
sleep 8

echo "🌐 Opening TandaBase in your default browser..."
open_browser "http://localhost:5173"

echo ""
echo "🎉 TandaBase Local Development Environment is starting!"
echo ""
echo "📋 What's happening:"
echo "   • Server: Running on http://localhost:3000 (or check server terminal for actual port)"
echo "   • Client: Running on http://localhost:5173 (or check client terminal for actual port)"
echo "   • Browser: Opening http://localhost:5173 automatically"
echo ""
echo "💡 Two new terminal tabs/windows have been opened:"
echo "   • Tab/Window 1: Server (backend)"
echo "   • Tab/Window 2: Client (frontend)"
echo ""
echo "🛑 To stop the services:"
echo "   • Press Ctrl+C in each terminal tab/window"
echo "   • Or close the terminal tabs/windows"

# If services were started in background, provide stop instructions
if [ "$TERMINAL" = "unknown" ]; then
    echo ""
    echo "⚠️  Services are running in background. To stop them:"
    if [ ! -z "$SERVER_PID" ]; then
        echo "   • Kill server: kill $SERVER_PID"
    fi
    if [ ! -z "$CLIENT_PID" ]; then
        echo "   • Kill client: kill $CLIENT_PID"
    fi
    echo "   • Or use: pkill -f 'npm start' && pkill -f 'npm run dev'"
fi

echo ""
echo "Happy coding! 🎵"

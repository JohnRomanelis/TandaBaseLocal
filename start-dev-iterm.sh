#!/bin/bash

# TandaBase Local Development Startup Script (iTerm2 version)
# This script starts both the server and client in separate iTerm2 tabs

echo "🚀 Starting TandaBase Local Development Environment (iTerm2)..."

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

# Check dependencies first
check_dependencies

# Check if iTerm2 is available
if ! command -v osascript &> /dev/null || ! osascript -e 'tell application "iTerm" to version' &> /dev/null; then
    echo "❌ iTerm2 not found. Please use start-dev.sh for Terminal or install iTerm2"
    exit 1
fi

# Start server in a new iTerm2 tab
echo "🖥️  Starting server..."
osascript -e "
tell application \"iTerm\"
    activate
    tell current window
        create tab with default profile
        tell current session
            write text \"cd '$PROJECT_ROOT/server' && echo '🖥️  Starting TandaBase Server...' && npm start\"
        end tell
    end tell
end tell
"

# Wait a moment for the server tab to open
sleep 2

# Start client in another new iTerm2 tab
echo "🌐 Starting client..."
osascript -e "
tell application \"iTerm\"
    activate
    tell current window
        create tab with default profile
        tell current session
            write text \"cd '$PROJECT_ROOT/client' && echo '🌐 Starting TandaBase Client...' && npm run dev\"
        end tell
    end tell
end tell
"

# Wait for services to start and then open browser
echo "⏳ Waiting for services to start..."
sleep 8

echo "🌐 Opening TandaBase in your default browser..."
open "http://localhost:5173"

echo ""
echo "🎉 TandaBase Local Development Environment is starting!"
echo ""
echo "📋 What's happening:"
echo "   • Server: Running on http://localhost:3000 (or check server terminal for actual port)"
echo "   • Client: Running on http://localhost:5173 (or check client terminal for actual port)"
echo "   • Browser: Opening http://localhost:5173 automatically"
echo ""
echo "💡 Two new iTerm2 tabs have been opened:"
echo "   • Tab 1: Server (backend)"
echo "   • Tab 2: Client (frontend)"
echo ""
echo "🛑 To stop the services:"
echo "   • Press Ctrl+C in each iTerm2 tab"
echo "   • Or close the iTerm2 tabs"
echo ""
echo "Happy coding! 🎵"

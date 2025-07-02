# TandaBase

TandaBase is a Tango music browser for exploring songs, orchestras, and singers, with powerful filtering and search features, Spotify integration, and editable metadata.

## Features

* 🔍 Filter and search by title, orchestra, singer, type, style, year range, and instrumental status
* 🎧 Embedded Spotify player for playback
* ❤️ Like and edit songs
* 🧠 Auto-suggestion for smarter form input
* 🛠 Editable song details via modal dialog

---

## 🗂 Project Structure

```
TandaBaseLocal/
├── client/              # Frontend (React + Tailwind)
├── server/              # Backend (Node + Express)
│   └── tandabase.db     # SQLite3 database (required)
├── start-dev.sh         # macOS Terminal startup script
├── start-dev-iterm.sh   # macOS iTerm2 startup script  
├── start-dev-linux.sh   # Linux/Ubuntu startup script
├── start-dev.bat        # Windows startup script
├── package.json         # Root package with dev scripts
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18+ recommended)
* npm or yarn

### Quick Start (Recommended)

**One-click startup scripts** that automatically start both server and client, plus open your browser:

**macOS:**
```bash
./start-dev.sh          # Terminal
./start-dev-iterm.sh     # iTerm2
```

**Linux/Ubuntu:**
```bash
./start-dev-linux.sh    # Auto-detects terminal (GNOME, KDE, XFCE, etc.)
```

**Windows:**
```cmd
start-dev.bat
```

**Cross-platform:**
```bash
npm run dev             # Single terminal with colored output
```

> These scripts will automatically install dependencies, start both services, and open http://localhost:5173 in your browser.

### Manual Setup

If you prefer to start services manually:

### Manual Setup

If you prefer to start services manually:

#### Install all dependencies
```bash
npm run install:all
```

---

## 📦 Backend Setup

```bash
cd server
npm install
```

### Start the server

```bash
npm start
```

By default, it will start on: `http://localhost:3000`

> ✅ Make sure the `tandabase.db` file is located in the `/server` directory.

---

## 💻 Client Setup

```bash
cd client
npm install
```

### Start the frontend

```bash
npm run dev
```

By default, the app will be served at: `http://localhost:5173`

---

## 🛑 Stopping Services

* **For startup scripts**: Press `Ctrl+C` in each terminal tab/window
* **For npm script**: Press `Ctrl+C` once (stops both services)
* **Alternative**: Close the terminal tabs/windows

---

## 🔧 Startup Scripts Details

### Platform Compatibility

* **macOS**: Use `start-dev.sh` (Terminal) or `start-dev-iterm.sh` (iTerm2)
* **Linux/Ubuntu**: Use `start-dev-linux.sh` (supports most desktop environments)
* **Windows**: Use `start-dev.bat`
* **Cross-platform**: Use `npm run dev` (works anywhere Node.js is installed)

### What Scripts Do

All startup scripts automatically:
1. ✅ Check if dependencies are installed (and install them if missing)
2. 🖥️  Start the server (backend) on http://localhost:3000
3. 🌐 Start the client (frontend) on http://localhost:5173
4. 🌐 **Open your browser to http://localhost:5173**
5. 📱 Provide clear feedback about what's running where

### Supported Linux Terminals

The Linux script automatically detects and works with:
* GNOME Terminal (default on Ubuntu)
* Konsole (KDE)
* XFCE4 Terminal
* MATE Terminal
* Terminator
* xterm
* Fallback: runs in background if no compatible terminal found

### Troubleshooting

**Permission Issues (macOS/Linux):**
```bash
chmod +x start-dev.sh
chmod +x start-dev-linux.sh
chmod +x start-dev-iterm.sh
```

**Port Conflicts:**
* Server usually runs on port 3000
* Client usually runs on port 5173
* Check what's using ports: `lsof -i :3000` or `lsof -i :5173`

**Missing Dependencies:**
```bash
npm run install:all
```

---

## 🔄 API Endpoints

### Songs

* `GET /api/songs?title=&orchestra=&singer=&...`
* `PUT /api/songs/:id` – update a song

### Suggestions

* `GET /api/suggestions/titles?query=`
* `GET /api/suggestions/orchestras?query=`
* `GET /api/suggestions/singers?query=`

---

## 🛠 Dev Tips

* Place all editable config in `.env` files if needed.
* Use Tailwind for styling, but feel free to customize the theme.
* You can modify the database using SQLite clients like `DB Browser for SQLite`.

---

## 📌 Notes

* Make sure CORS is configured if deploying client and server separately.
* Contributions welcome!



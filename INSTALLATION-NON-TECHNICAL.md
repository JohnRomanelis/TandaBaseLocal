# 📖 TandaBase – Simple Installation Guide

Welcome to **TandaBase**, your personal tool for exploring and searching tango music! Follow this guide to download and run the app without needing any programming experience.

---

## 🧰 What You Need First

Before you can run TandaBase, you’ll need to install:

### ✅ [Node.js (version 18 or higher)](https://nodejs.org/)

> Node.js helps run the backend and frontend. Choose the LTS version for stability.

### ✅ [Visual Studio Code (VS Code)](https://code.visualstudio.com/) (optional, but recommended)

> A helpful app to open and run the project easily.

---

## 📦 Step 1: Download TandaBase

1. Go to the GitHub page: [https://github.com/JohnRomanelis/TandaBaseLocal.git](https://github.com/YOUR_USERNAME/TandaBase)
2. Click the green **"Code"** button.
3. Select **"Download ZIP"**.
4. Extract the downloaded file to a folder on your computer.

> 🗂️ The project folder should now contain a `client` and a `server` directory.

---

## 🛠️ Step 2: Prepare the Database

1. Open the extracted folder.
2. Go into the `server` folder.
3. Place the `tandabase.db` file **inside** the `server` folder.

> 📁 Your folder structure should look like: `TandaBase/server/tandabase.db`

---

## 🚀 Step 3: Run TandaBase

### 🖥️ Option A (Recommended):

Open a terminal or command prompt and run the following commands depending on your operating system:

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


### 🖥️ Option B: Use VS Code

1. Open the TandaBase folder in VS Code.

2. Open a terminal:

   * Go to `Terminal > New Terminal`

3. In the terminal, type:

```bash
cd server
npm install
npm start
```

> ✅ This will start the backend at [http://localhost:3000](http://localhost:3000)

4. Open another terminal tab:

```bash
cd client
npm install
npm run dev
```

> ✅ This will start the frontend at [http://localhost:5173](http://localhost:5173)

### 🖥️ Option C: Without VS Code

1. Open a terminal or command prompt manually.
2. Navigate to the project folder:

```bash
cd path/to/TandaBase/server
npm install
npm start
```

3. Open a new terminal window and run:

```bash
cd path/to/TandaBase/client
npm install
npm run dev
```

---

## 📌 Notes

* Always keep the `tandabase.db` file in the `server` folder.
* You can now search and play tango songs right from your browser.
* Use Chrome or Firefox for the best experience.

---

## 💬 Need Help?

If anything doesn't work, reach out to the project owner or your local tango tech friend 💃🕺

Enjoy the music! 🎶

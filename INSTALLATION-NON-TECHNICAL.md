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

1. Go to the GitHub page: [github.com/YOUR\_USERNAME/TandaBase](https://github.com/YOUR_USERNAME/TandaBase)
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

### 🖥️ Option A: Use VS Code

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

### 🖥️ Option B: Without VS Code

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

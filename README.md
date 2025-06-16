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
├── client/       # Frontend (React + Tailwind)
├── server/       # Backend (Node + Express)
│   └── tandabase.db   # SQLite3 database (required)
├── package.json
├── README.md
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18+ recommended)
* npm or yarn

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



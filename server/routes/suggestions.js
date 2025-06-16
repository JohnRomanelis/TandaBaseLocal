const express = require("express");
const db = require("../db"); // uses better-sqlite3

const router = express.Router();

// 🎵 Song title suggestions
router.get("/titles", (req, res) => {
  const query = req.query.query || "";
  try {
    const stmt = db.prepare(
      `SELECT DISTINCT title FROM SONG WHERE title LIKE ? ORDER BY title LIMIT 10`
    );
    const rows = stmt.all(`%${query}%`);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching titles:", err);
    res.status(500).json({ error: "Failed to fetch titles" });
  }
});

// 🎻 Orchestra suggestions
router.get("/orchestras", (req, res) => {
  const query = req.query.query || "";
  try {
    const stmt = db.prepare(
      `SELECT DISTINCT name FROM ORCHESTRA WHERE name LIKE ? ORDER BY name LIMIT 10`
    );
    const rows = stmt.all(`%${query}%`);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching orchestras:", err);
    res.status(500).json({ error: "Failed to fetch orchestras" });
  }
});

// 🎤 Singer suggestions
router.get("/singers", (req, res) => {
  const query = req.query.query || "";
  try {
    const stmt = db.prepare(
      `SELECT DISTINCT name FROM SINGER WHERE name LIKE ? ORDER BY name LIMIT 10`
    );
    const rows = stmt.all(`%${query}%`);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching singers:", err);
    res.status(500).json({ error: "Failed to fetch singers" });
  }
});

module.exports = router;

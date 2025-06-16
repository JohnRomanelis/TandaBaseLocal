const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/singers
router.get('/', (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT id, name, sex, verified
      FROM SINGER
      ORDER BY name ASC
    `);
    const singers = stmt.all();
    res.json(singers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

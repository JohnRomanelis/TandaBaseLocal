const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/orchestras
router.get('/', (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT id, name, is_modern, verified
      FROM ORCHESTRA
      ORDER BY name ASC
    `);
    const orchestras = stmt.all();
    res.json(orchestras);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

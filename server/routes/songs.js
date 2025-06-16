const express = require('express');
const router = express.Router();
const db = require('../db');
const unidecode = require("unidecode");


router.get("/", (req, res) => {
  const {
    title,
    orchestra,
    singer,
    yearFrom,
    yearTo,
    isInstrumental,
    type,
    alsoPlayedBy,
  } = req.query;

  console.log("🔍 Filters:", { isInstrumental });


  const filters = [];
  const params = [];

  // --- Basic Filters ---
  if (title) {
    filters.push("s.english_title LIKE ?");
    params.push(`%${title.toLowerCase()}%`);
  }

  if (orchestra) {
    filters.push("o.name LIKE ?");
    params.push(`%${orchestra}%`);
  }

  if (singer) {
    filters.push("si.name LIKE ?");
    params.push(`%${singer}%`);
  }

  if (yearFrom) {
    filters.push("s.recording_year >= ?");
    params.push(Number(yearFrom));
  }

  if (yearTo) {
    filters.push("s.recording_year <= ?");
    params.push(Number(yearTo));
  }

  if (isInstrumental === "true") {
    filters.push("s.is_instrumental = 1");
  } else if (isInstrumental === "false") {
    filters.push("s.is_instrumental = 0");
  }

  if (type) {
    filters.push("s.type = ?");
    params.push(type);
  }

  // --- Advanced Filter: alsoPlayedBy ---
  if (alsoPlayedBy) {
    filters.push(`s.english_title IN (
      SELECT s2.english_title
      FROM SONG s2
      JOIN ORCHESTRA o2 ON s2.orchestra_id = o2.id
      WHERE o2.name LIKE ?
    )`);
    params.push(`%${alsoPlayedBy}%`);
  }

  const whereClause = filters.length ? "WHERE " + filters.join(" AND ") : "";

  const sql = `
    SELECT
      s.*,
      o.name AS orchestra_name,
      GROUP_CONCAT(si.name, ', ') AS singers
    FROM SONG s
    JOIN ORCHESTRA o ON s.orchestra_id = o.id
    LEFT JOIN SONG_SINGER ss ON s.id = ss.song_id
    LEFT JOIN SINGER si ON ss.singer_id = si.id
    ${whereClause}
    GROUP BY s.id
    ORDER BY s.title
    LIMIT 100;
  `;

  try {
    const stmt = db.prepare(sql);
    const rows = stmt.all(...params);
    res.json(rows);
  } catch (err) {
    console.error("Error querying songs:", err);
    res.status(500).json({ error: "Failed to query songs" });
  }
});

// utilities – could be in a separate file
const getOrCreateOrchestra = (name, tx) => {
  const row = tx.prepare("SELECT id FROM ORCHESTRA WHERE name = ?").get(name);
  if (row) return row.id;
  const info = tx.prepare(
    "INSERT INTO ORCHESTRA (name, is_modern, verified) VALUES (?, 0, 0)"
  ).run(name);
  return info.lastInsertRowid;
};

const getOrCreateSinger = (name, tx) => {
  const row = tx.prepare("SELECT id FROM SINGER WHERE name = ?").get(name);
  if (row) return row.id;
  const info = tx.prepare(
    "INSERT INTO SINGER (name, verified) VALUES (?, 0)"
  ).run(name);
  return info.lastInsertRowid;
};

// ---------------------------------------------
// PUT /api/songs/:id  – update one song
// ---------------------------------------------
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const {
    title,
    type,
    style,
    recording_year,
    is_instrumental,
    spotify_id,
    duration,
    orchestra,
    singers = [],
    verified = false,
  } = req.body;

  try {
    db.transaction(() => {
      /* 1. orchestra → id */
      const orchestraId = getOrCreateOrchestra(orchestra, db);

      /* 2. update SONG core */
      db.prepare(
        `UPDATE SONG
           SET title            = ?,
               english_title    = ?,
               type             = ?,
               style            = ?,
               recording_year   = ?,
               is_instrumental  = ?,
               spotify_id       = ?,
               duration         = ?,
               orchestra_id     = ?,
               verified         = ?
         WHERE id = ?`
      ).run(
        title,
        unidecode(title), 
        type,
        style,
        recording_year || null,
        is_instrumental ? 1 : 0,
        spotify_id || null,
        duration || null,
        orchestraId,
        verified ? 1 : 0,
        id
      );

      /* 3. refresh singer links */
      db.prepare("DELETE FROM SONG_SINGER WHERE song_id = ?").run(id);

      if (!is_instrumental && singers.length) {
        const link = db.prepare(
          "INSERT INTO SONG_SINGER (song_id, singer_id) VALUES (?, ?)"
        );
        singers.forEach((name) => {
          const singerId = getOrCreateSinger(name.trim(), db);
          link.run(id, singerId);
        });
      }
    })();

    res.json({ success: true });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update song" });
  }
});


module.exports = router;

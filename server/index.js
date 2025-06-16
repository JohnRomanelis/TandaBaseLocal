const express = require('express');
const cors = require('cors');
const songsRouter = require('./routes/songs');
const orchestrasRouter = require('./routes/orchestras');
const singersRouter = require('./routes/singers'); 
const suggestionsRoutes = require("./routes/suggestions.js");


const app = express();

app.use(express.json());

const PORT = 3000;

app.use(cors());

// Mount /api/songs
app.use('/api/songs', songsRouter);
app.use('/api/orchestras', orchestrasRouter);
app.use('/api/singers', singersRouter);
app.use("/api/suggestions", suggestionsRoutes);

app.listen(PORT, () => {
  console.log(`✅ Backend server running at http://localhost:${PORT}`);
});

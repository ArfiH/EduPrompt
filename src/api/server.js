import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import subtitleRoute from './routes/subtitles.js';
import suggestionRoute from './routes/suggestions.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.VITE_SERVER_PORT || 5000;

// Mount routes
app.use('/api/subtitles', subtitleRoute);
app.use('/api/suggestions', suggestionRoute);

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

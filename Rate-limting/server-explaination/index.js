require('dotenv').config();
const express = require('express');
const { connectDB } = require('./config/db');
const noteRoutes = require('./routes/noteRoutes');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = { id: req.header('x-user-id') || req.ip || 'anonymous' };
  next();
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/notes', noteRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
})();

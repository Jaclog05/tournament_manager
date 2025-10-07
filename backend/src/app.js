const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const tournamentRoutes = require('./routes/tournamentRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Sample route
app.get('/api/health', (req, res) => {
  res.json({ message: 'API de gestor de torneos funcionando correctamente' });
})

app.use('/api/auth', authRoutes);
app.use('/api/tournaments', tournamentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
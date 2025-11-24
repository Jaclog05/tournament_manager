const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const tournamentRoutes = require('./routes/tournamentRoutes');
const teamRoutes = require('./routes/teamRoutes');
const playerRoutes = require('./routes/playerRoutes');
const matchRoutes = require('./routes/matchRoutes');
const standingsRoutes = require('./routes/standingsRoutes');
const predictionRoutes = require('./routes/predictionRoutes')
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
app.use('/api/users', userRoutes);
app.use('/api/tournaments', tournamentRoutes);
app.use('/api/tournaments', teamRoutes);
app.use('/api/tournaments', playerRoutes);
app.use('/api/tournaments', matchRoutes);
app.use('/api/tournaments', standingsRoutes);
app.use('/api/tournaments', predictionRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
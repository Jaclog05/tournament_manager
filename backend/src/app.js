const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Sample route
app.get('/api/health', (req, res) => {
  res.json({ message: 'API de gestor de torneos funcionando correctamente' });
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
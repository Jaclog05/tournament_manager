const express = require('express');

const { calculateStandings } = require('../controllers/standingsController');

const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.use(authenticateToken);

router.get('/:tournamentId/standings', calculateStandings);

module.exports = router;
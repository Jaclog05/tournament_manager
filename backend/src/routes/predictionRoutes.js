const express = require('express');

const { calculatePredictions } = require('../controllers/predictionController');

const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.use(authenticateToken);

router.get('/:tournamentId/predictions', calculatePredictions);

module.exports = router;


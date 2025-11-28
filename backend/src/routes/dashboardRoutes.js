const express = require('express');
const { getStats, getActiveTournaments } = require('../controllers/dashboardController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.use(authenticateToken);

router.get('/stats', getStats);
router.get('/active-tournaments', getActiveTournaments);

module.exports = router;
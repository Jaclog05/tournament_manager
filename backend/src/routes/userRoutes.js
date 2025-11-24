const express = require('express');
const { getProfile } = require('../controllers/usersController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.use(authenticateToken);

router.get('/profile', getProfile);

module.exports = router;
const express = require('express');
const {
  createPlayer,
  getPlayersByTeam,
  getPlayerById,
  updatePlayer,
  deletePlayer
} = require('../controllers/playerController');

const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.use(authenticateToken);

router.post('/:tournamentId/teams/:teamId/players', createPlayer);
router.get('/:tournamentId/teams/:teamId/players', getPlayersByTeam);
router.get('/:tournamentId/teams/:teamId/players/:id', getPlayerById);
router.put('/:tournamentId/teams/:teamId/players/:id', updatePlayer);
router.delete('/:tournamentId/teams/:teamId/players/:id', deletePlayer);

module.exports = router;
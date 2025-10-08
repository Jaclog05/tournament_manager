const express = require('express');

const {
  createTeam,
  getTeamsByTournament,
  getTeamById,
  updateTeam,
  deleteTeam
} = require('../controllers/teamController');

const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.use(authenticateToken);

router.post('/:tournamentId/teams', createTeam);
router.get('/:tournamentId/teams', getTeamsByTournament);
router.get('/:tournamentId/teams/:id', getTeamById);
router.put('/:tournamentId/teams/:id', updateTeam);
router.delete('/:tournamentId/teams/:id', deleteTeam);

module.exports = router;
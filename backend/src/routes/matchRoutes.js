const express = require('express');
const {
  createMatch,
  getMatchesByTournament,
  getMatchById,
  updateMatch,
  registerMatchResult,
  deleteMatch
} = require('../controllers/matchController');

const { authenticateToken } = require('../middleware/auth')

const router = express.Router();

router.use(authenticateToken);

router.post('/:tournamentId/matches', createMatch);
router.get('/:tournamentId/matches', getMatchesByTournament);
router.get('/:tournamentId/matches/:id', getMatchById);
router.put('/:tournamentId/matches/:id', updateMatch);
router.patch('/:tournamentId/matches/:id/result', registerMatchResult);
router.delete('/:tournamentId/matches/:id', deleteMatch);

module.exports = router;
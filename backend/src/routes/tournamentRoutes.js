const express = require('express');
const {
  createTournament,
  getMyTournaments,
  getTournamentById,
  updateTournament,
  deleteTournament
} = require('../controllers/tournamentController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.use(authenticateToken);

router.post('/', createTournament);
router.get('/', getMyTournaments);
router.get('/:id', getTournamentById);
router.put('/:id', updateTournament);
router.delete('/:id', deleteTournament);

module.exports = router;
const {Tournament, Team, Match} = require('../models');

const getStats = async (req, res) => {
  try {
    const userId = req.user.userId;

    const tournamentCount = await Tournament.count({ where: { createdBy: userId } });
    const teamCount = await Team.count({
      include: [{
        model: Tournament,
        where: { createdBy: userId },
        attributes: []
      }]
    });
    
    const matchCount = await Match.count({
      include: [{
        model: Tournament,
        where: { createdBy: userId },
        attributes: []
      }]
    });

    res.status(200).json({
      tournaments: tournamentCount,
      teams: teamCount,
      matches: matchCount
    });

  } catch (error) {
    console.error('Error obteniendo estadísticas del dashboard', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const getActiveTournaments = async (req, res) => {
  try {
    const userId = req.user.userId;

    const activeTournaments = await Tournament.findAll({
      where: { createdBy: userId, status: 'pending' }, // TODO: cambiar a active
      include: [
        {
          model: Team,
          attributes: ['id', 'name']
        }
      ],
      order: [['createdAt', 'DESC']],
    });

    const formattedTournaments = activeTournaments.map(tournament => ({
      id: tournament.id,
      name: tournament.name,
      teams: tournament.Teams,
    }));

    res.status(200).json(formattedTournaments);
  } catch (error) {
    console.error('Error obteniendo torneos activos del dashboard', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = { getStats, getActiveTournaments };
const { Match, Tournament, Team } = require('../models');

const createMatch = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const { homeTeamId, awayTeamId, matchDate, location, round } = req.body;
    const userId = req.user.userId

    const tournament = await Tournament.findOne({
      where: { id: tournamentId, createdBy: userId }
    });

    if (!tournament) {
      return res.status(404).json({ message: 'Torneo no encontrado' });
    }

    if (!homeTeamId || !awayTeamId){
      return res.status(400).json({ message: 'Los equipos local y visitante son requeridos' });
    }

    if(homeTeamId === awayTeamId) {
      return res.status(400).json({ message: 'Los equipos no pueden ser el mismo' });
    }

    const localTeam = await Team.findOne({
      where: { id: homeTeamId, tournamentId }
    })

    const visitorTeam = await Team.findOne({
      where: { id: awayTeamId, tournamentId }
    })

    if (!localTeam || !visitorTeam) {
      return res.status(404).json({ message: 'Uno o ambos equipos no fueron encontrados en el torneo' });
    }

    const match = await Match.create({
      tournamentId,
      homeTeamId,
      awayTeamId,
      matchDate,
      location,
      round,
      status: 'scheduled'
    });

    const matchWithTeams = await Match.findByPk(match.id, {
      include: [
        {
          model: Team,
          as: 'homeTeam',
          attributes: ['id', 'name', 'logo']
        },
        {
          model: Team,
          as: 'awayTeam',
          attributes: ['id', 'name', 'logo']
        }
      ]
    });

    res.status(201).json({
      message: 'Partido creado exitosamente',
      match: matchWithTeams
    })
  } catch (error) {
    console.error('Error creando el partido:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const getMatchesByTournament = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const userId = req.user.userId;

    const tournament = await Tournament.findOne({
      where: { id: tournamentId, createdBy: userId }
    });

    if (!tournament) {
      return res.status(404).json({ error: 'Torneo no encontrado' });
    }

    const matches = await Match.findAll({
      where: { tournamentId },
      include: [
        {
          model: Team,
          as: 'homeTeam',
          attributes: ['id', 'name', 'logo']
        },
        { 
          model: Team,
          as: 'awayTeam',
          attributes: ['id', 'name', 'logo']
        }
      ],
      order: [['matchDate', 'ASC']]
    })

    res.status(200).json({
      message: 'Partidos obtenidos exitosamente',
      matches
    })
  } catch (error) {
    console.error('Error obteniendo los partidos:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const getMatchById = async (req, res) => {
  try {
    const { tournamentId, id } = req.params;
    const userId = req.user.userId;

    const tournament = await Tournament.findOne({
      where: { id: tournamentId, createdBy: userId }
    });

    if (!tournament) {
      return res.status(404).json({ error: 'Torneo no encontrado' });
    }

    const match = await Match.findOne({
      where: { id, tournamentId },
      include: [
        {
          model: Team,
          as: 'homeTeam',
          attributes: ['id', 'name', 'logo']
        },
        {
          model: Team,
          as: 'awayTeam',
          attributes: ['id', 'name', 'logo']
        }
      ]
    });

    if (!match) {
      return res.status(404).json({ error: 'Partido no encontrado' });
    }

    res.status(200).json({
      message: 'Partido obtenido exitosamente',
      match
    })
  } catch (error) {
    console.error('Error obteniendo el partido:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const updateMatch = async (req, res) => {
  try {
    const { tournamentId, id } = req.params;
    const { matchDate, location, round, status } = req.body;
    const userId = req.user.userId;
    
    const tournament = await Tournament.findOne({
      where: { id: tournamentId, createdBy: userId }
    });

    if (!tournament) {
      return res.status(404).json({ error: 'Torneo no encontrado' });
    }

    const match = await Match.findOne({
      where: { id, tournamentId }
    });

    if (!match) {
      return res.status(404).json({ error: 'Partido no encontrado' });
    }

    await match.update({
      matchDate: matchDate || match.matchDate,
      location: location || match.location,
      round: round || match.round,
      status: status || match.status
    });

    res.status(200).json({
      message: 'Partido actualizado exitosamente',
      match
    })

  } catch (error) {
    console.error('Error actualizando el partido:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const registerMatchResult = async (req, res) => {
  try {
    const { tournamentId, id } = req.params;
    const { goalsHomeTeam, goalsAwayTeam } = req.body;
    const userId = req.user.userId;

    const tournament = await Tournament.findOne({
      where: { id: tournamentId, createdBy: userId }
    });

    if (!tournament) {
      return res.status(404).json({ error: 'Torneo no encontrado' });
    }

    const match = await Match.findOne({ where: { id, tournamentId } });

    if (!match) {
      return res.status(404).json({ error: 'Partido no encontrado' });
    }

    if(goalsHomeTeam < 0 || goalsAwayTeam < 0) {
      return res.status(400).json({ message: 'Los goles no pueden ser negativos' });
    }

    await match.update({
      goalsHomeTeam,
      goalsAwayTeam,
      status: 'finished'
    });

    res.status(200).json({
      message: 'Resultado del partido registrado exitosamente',
      match: {
        ...match.toJSON(),
        goalsHomeTeam,
        goalsAwayTeam,
        status: 'finished'
      }
    });
  
  } catch (error) {
    console.error('Error registrando el resultado del partido:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const deleteMatch = async (req, res) => {
  try {
    const { tournamentId, id } = req.params;
    const userId = req.user.userId;

    const tournament = await Tournament.findOne({
      where: { id: tournamentId, createdBy: userId }
    });

    if (!tournament) {
      return res.status(404).json({ error: 'Torneo no encontrado' });
    }

    const match = await Match.findOne({ where: { id, tournamentId } });

    if (!match) {
      return res.status(404).json({ error: 'Partido no encontrado' });
    }

    await match.destroy();

    res.status(200).json({ message: 'Partido eliminado exitosamente' });
  } catch (error) {
    console.error('Error eliminando el partido:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

module.exports = {
  createMatch,
  getMatchesByTournament,
  getMatchById,
  updateMatch,
  registerMatchResult,
  deleteMatch
};


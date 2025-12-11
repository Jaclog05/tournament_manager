const { Tournament, User, Team, Match } = require('../models');

const createTournament = async (req, res) => {
  try {
    const { name, startDate, endDate } = req.body;
    const createdBy = req.user.userId;

    const tournament = await Tournament.create({
      name,
      startDate,
      endDate,
      createdBy
    })

    const tournamentWithCreator = await Tournament.findByPk(tournament.id, {
      include: [
        {
          model: User,
          as: 'User',
          attributes: ['id', 'name', 'email']
        }
      ]
    });

    res.status(201).json({
      message: "Torneo creado exitosamente",
      tournament: tournamentWithCreator
    })

  } catch (error) {
    console.error("Error al crear el torneo", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

const getMyTournaments = async (req, res) => {
  try {
    const userId = req.user.userId;

    const tournaments = await Tournament.findAll({
      where: { createdBy: userId },
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email']
        },
        {
          model: Team,
          attributes: ['id', 'name']
        },
        {
          model: Match,
          include: [
            { 
              model: Team,
              as: 'homeTeam',
              attributes: ['id', 'name']
            },
            {
              model: Team,
              as: 'awayTeam',
              attributes: ['id', 'name']
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    })

    res.status(201).json({
      message: "Torneos obtenidos exitosamente",
      tournaments
    })
  } catch (error) {
    console.error("Error al obtener los torneos", error)
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

const getTournamentById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const teamInclude = [
      {
        model: Team,
        as: 'homeTeam',
        attributes: ['id', 'name']
      },
      {
        model: Team,
        as: 'awayTeam',
        attributes: ['id', 'name']
      }
    ];

    const finishedMatchesInclude = {
      model: Match,
      as: 'FinishedMatches',
      where: { status: 'finished' },
      order: [['matchDate', 'DESC']],
      include: teamInclude,
      separate: true
    }

    const upcomingMatchesInclude = {
      model: Match,
      as: 'UpcomingMatches',
      where: { status: 'scheduled' },
      order: [['matchDate', 'ASC']],
      include: teamInclude,
      separate: true
    }

    const tournament = await Tournament.findOne({
      where: { id, createdBy: userId },
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email']
        },
        { 
          model: Team,
          attributes: ['id', 'name']
        },
        finishedMatchesInclude,
        upcomingMatchesInclude
      ]
    })

    if (!tournament) {
      return res.status(404).json({ message: "Torneo no encontrado" });
    }

    res.status(201).json({
      message: "Torneo obtenido exitosamente",
      tournament
    })
  } catch (error) {
    console.error("Error al obtener el torneo", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

const updateTournament = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const { name, startDate, endDate, status } = req.body

    const tournament = await Tournament.findOne({ where: { id, createdBy: userId } })

    if(!tournament){
      res.status(404).json({ message: "Torneo no encontrado" })
    }

    await tournament.update({
      name: name || tournament.name,
      startDate: startDate || tournament.startDate,
      endDate: endDate || tournament.endDate,
      status: status || tournament.status
    })

    res.status(201).json({
      message: "Torneo actualizado exitosamente",
      tournament
    })

  } catch (error) {
    console.error("Error al actualizar el torneo", error);
    res.status(500).json({ message: "Error interno del servidor" })
  }
}

const deleteTournament = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const tournament = await Tournament.findOne({ where: { id, createdBy: userId } })

    if(!tournament){
      res.status(404).json({ message: "Torneo no encontrado" })
    }

    await tournament.destroy();

    res.status(201).json({
      message: "Torneo eliminado exitosamente"
    })

  } catch (error) {
    console.error("Error al eliminar el torneo", error);
    res.status(500).json({ message: "Error interno del servidor" })
  }
}

module.exports = {
  createTournament,
  getMyTournaments,
  getTournamentById,
  updateTournament,
  deleteTournament
};
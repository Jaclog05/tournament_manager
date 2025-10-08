const { Team, Tournament, Player } = require("../models");

const createTeam = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const { name, logo } = req.body;
    const userId = req.user.userId;

    const tournament = await Tournament.findOne({
      where: { id: tournamentId, createdBy: userId }
    });

    if (!tournament) {
      return res.status(404).json({ message: "Torneo no encontrado" });
    }

    if(!name) {
      return res.status(400).json({ message: "El nombre del equipo es requerido" });
    }

    const team = await Team.create({
      name,
      logo,
      tournamentId
    })

    res.status(201).json({
      message: "Equipo creado exitosamente",
      team
    })

  } catch (error) {
    console.error('Error creando el equipo:', error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const getTeamsByTournament = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const userId = req.user.userId;

    const tournament = await Tournament.findOne({
      where: { id: tournamentId, createdBy: userId }
    });

    if (!tournament) {
      return res.status(404).json({ message: "Torneo no encontrado" });
    }

    const teams = await Team.findAll({
      where: { tournamentId },
      include: [
        {
          model: Player,
          attributes: ['id', 'name', 'position', 'jerseyNumber']
        }
      ],
      order: [['name', 'ASC']]
    });

    res.status(201).json({
      message: "Equipos obtenidos exitosamente",
      teams
    })
  } catch (error) {
    console.log('Error obteniendo los equipos:', error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

const getTeamById = async (req, res) => {
  try {
    const { tournamentId, id } = req.params;
    const userId = req.user.userId;

    const tournament = await Tournament.findOne({
      where: { id: tournamentId, createdBy: userId }
    })

    if(!tournament) {
      return res.status(404).json({ message: "Torneo no encontrado" });
    }

    const team = await Team.findOne({
      where: { id, tournamentId },
      include: [
        {
          model: Player,
          attributes: ['id', 'name', 'position', 'jerseyNumber']
        }
      ]
    });

    if(!team) {
      return res.status(404).json({ message: "Equipo no encontrado" });
    }

    res.status(200).json({
      message: "Equipo obtenido exitosamente",
      team
    })
  
  } catch (error) {
    console.error('Error obteniendo el equipo:', error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

const updateTeam = async (req, res) => {
  try {
    const { tournamentId, id } = req.params;
    const { name, logo } = req.body;
    const userId = req.user.userId;

    const tournament = await Tournament.findOne({
      where: { id: tournamentId, createdBy: userId }
    });

    if(!tournament) {
      return res.status(404).json({ message: "Torneo no encontrado" });
    }

    const team = await Team.findOne({
      where: { id, tournamentId }
    });

    if(!team) {
      return res.status(404).json({ message: "Equipo no encontrado" });
    }

    await team.update({
      name: name || team.name,
      logo: logo || team.logo
    });

    res.status(200).json({
      message: "Equipo actualizado exitosamente",
      team
    })
  } catch (error) {
    console.error('Error actualizando el equipo:', error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const { tournamentId, id } = req.params;
    const userId = req.user.userId;

    const tournament = await Tournament.findOne({
      where: { id: tournamentId, createdBy: userId }
    });

    if(!tournament) {
      return res.status(404).json({ message: "Torneo no encontrado" });
    }

    const team = await Team.findOne({
      where: { id, tournamentId }
    });

    if(!team) {
      return res.status(404).json({ message: "Equipo no encontrado" });
    }

    await team.destroy();

    res.status(200).json({ message: "Equipo eliminado exitosamente" });
  } catch (error) {
    console.error('Error eliminando el equipo:', error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = {
  createTeam,
  getTeamsByTournament,
  getTeamById,
  updateTeam,
  deleteTeam
};


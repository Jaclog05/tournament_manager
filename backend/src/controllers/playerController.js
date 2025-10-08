const { Player, Team, Tournament } = require('../models');

const createPlayer = async (req, res) => {
  try {
    const { tournamentId, teamId } = req.params;
    const { name, position, jerseyNumber } = req.body;
    const userId = req.user.userId;

    const tournament = await Tournament.findOne({
      where: { id: tournamentId, createdBy: userId },
    })

    if (!tournament) {
      return res.status(404).json({ message: "Torneo no encontrado" });
    }

    const team = await Team.findOne({
      where: { id: teamId, tournamentId }
    });

    if (!team) {
      return res.status(404).json({ message: "Equipo no encontrado" });
    }

    if(!name) {
      return res.status(400).json({ message: "El nombre del jugador es reqerido" });
    }

    const player = await Player.create({
      name,
      position,
      jerseyNumber,
      teamId
    });

    return res.status(201).json({
      message: "Jugador creado exitosamente",
      player
    });
  } catch (error) {
    console.error('Error creando jugador:', error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

const getPlayersByTeam = async (req, res) => {
  try {
    const { tournamentId, teamId } = req.params;
    const userId = req.user.userId;

    const tournament = await Tournament.findOne({
      where: { id: tournamentId, createdBy: userId },
    });

    if (!tournament) {
      return res.status(404).json({ message: "Torneo no encontrado" });
    }

    const team = await Team.findOne({
      where: { id: teamId, tournamentId }
    });

    if (!team) {
      return res.status(404).json({ message: "Equipo no encontrado" });
    }

    const players = await Player.findAll({
      where: { teamId },
      order: [['jerseyNumber', 'ASC'], ['name', 'ASC']]
    });

    return res.status(200).json({
      message: "Jugadores obtenidos exitosamente",
      players
    })
  } catch (error) {
    console.error('Error obteniendo jugadores:', error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

const getPlayerById = async (req, res) => {
  try {
    const { tournamentId, teamId, id } = req.params;
    const userId = req.user.userId;

    const tournament = await Tournament.findOne({
      where: { id: tournamentId, createdBy: userId },
    });

    if (!tournament) {
      return res.status(404).json({ message: "Torneo no encontrado" });
    }

    const team = await Team.findOne({
      where: { id: teamId, tournamentId }
    });

    if (!team) {
      return res.status(404).json({ message: "Equipo no encontrado" });
    }

    const player = await Player.findOne({
      where: { id, teamId }
    });

    if (!player) {
      return res.status(404).json({ message: "Jugador no encontrado" });
    }

    return res.status(200).json({
      message: "Jugador obtenido exitosamente",
      player
    });
    
  } catch (error) {
    console.error('Error obteniendo jugador:', error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

const updatePlayer = async (req, res) => {
  try {
    const { tournamentId, teamId, id } = req.params;
    const { name, position, jerseyNumber } = req.body;
    const userId = req.user.userId;

    const tournament = await Tournament.findOne({
      where: { id: tournamentId, createdBy: userId },
    });

    if (!tournament) {
      return res.status(404).json({ message: "Torneo no encontrado" });
    }

    const team = await Team.findOne({
      where: { id: teamId, tournamentId }
    });

    if (!team) {
      return res.status(404).json({ message: "Equipo no encontrado" });
    }

    const player = await Player.findOne({
      where: { id, teamId }
    });

    if (!player) {
      return res.status(404).json({ message: "Jugador no encontrado" });
    }

    await player.update({
      name: name || player.name,
      position: position || player.position,
      jerseyNumber: jerseyNumber || player.jerseyNumber
    });

    return res.status(200).json({
      message: "Jugador actualizado exitosamente",
      player
    });
  } catch (error) {
    console.error('Error actualizando jugador:', error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

const deletePlayer = async (req, res) => {
  try {
    const { tournamentId, teamId, id } = req.params;
    const userId = req.user.userId;

    const tournament = await Tournament.findOne({
      where: { id: tournamentId, createdBy: userId },
    });

    if (!tournament) {
      return res.status(404).json({ message: "Torneo no encontrado" });
    }

    const team = await Team.findOne({
      where: { id: teamId, tournamentId }
    });

    if (!team) {
      return res.status(404).json({ message: "Equipo no encontrado" });
    }

    const player = await Player.findOne({
      where: { id, teamId }
    });

    if (!player) {
      return res.status(404).json({ message: "Jugador no encontrado" });
    }

    await player.destroy();

    return res.status(200).json({ message: "Jugador eliminado exitosamente" });
  } catch (error) {
    console.error('Error eliminando jugador:', error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = {
  createPlayer,
  getPlayersByTeam,
  getPlayerById,
  updatePlayer,
  deletePlayer
};
const { Tournament, Team, Match } = require('../models');

const calculateStandings = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const userId = req.user.userId;

    const tournament = await Tournament.findOne({
      where: { id: tournamentId, createdBy: userId },
    });

    if (!tournament) {
      return res.status(404).json({ message: 'Torneo no encontrado' });
    }

    const teams = await Team.findAll({
      where: { tournamentId },
      attributes: ['id', 'name']
    });

    const matches = await Match.findAll({
      where: {
        tournamentId,
        status: 'finished'
      },
      attributes: ['homeTeamId', 'awayTeamId', 'goalsHomeTeam', 'goalsAwayTeam']
    });

    const standings = teams.map(team => ({
      teamId: team.id,
      teamName: team.name,
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0
    }));

    const findTeamIndex = (teamId) => {
      return standings.findIndex(team => team.teamId === teamId);
    }

    matches.forEach(match => {
      const { homeTeamId, awayTeamId, goalsHomeTeam, goalsAwayTeam } = match;

      const homeIndex = findTeamIndex(homeTeamId);
      const awayIndex = findTeamIndex(awayTeamId);

      if (homeIndex === -1 || awayIndex === -1) return;

      standings[homeIndex].matchesPlayed += 1;
      standings[awayIndex].matchesPlayed += 1;

      standings[homeIndex].goalsFor += goalsHomeTeam;
      standings[homeIndex].goalsAgainst += goalsAwayTeam;

      standings[awayIndex].goalsFor += goalsAwayTeam;
      standings[awayIndex].goalsAgainst += goalsHomeTeam;

      if (goalsHomeTeam > goalsAwayTeam) {
        standings[homeIndex].wins += 1;
        standings[homeIndex].points += 3;
        standings[awayIndex].losses += 1;
      } else if (goalsHomeTeam < goalsAwayTeam) {
        standings[awayIndex].wins += 1;
        standings[awayIndex].points += 3;
        standings[homeIndex].losses += 1;
      } else {
        standings[homeIndex].draws += 1;
        standings[homeIndex].points += 1;
        standings[awayIndex].draws += 1;
        standings[awayIndex].points += 1;
      }
    });

    standings.forEach(team => {
      team.goalDifference = team.goalsFor - team.goalsAgainst;
    });

    standings.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;

      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;

      if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;

      return a.teamName.localeCompare(b.teamName);
    });

    const standingsWithPosition = standings.map((team, index) => ({
      position: index + 1,
      ...team
    }));

    res.json({
      tournament: {
        id: tournament.id,
        name: tournament.name
      },
      standings: standingsWithPosition
    })
  } catch (error) {
    console.error('Error calculando la tabla de posiciones', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

module.exports = {
  calculateStandings
};
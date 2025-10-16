const { Tournament, Team, Match } = require('../models');

const calculatePredictions = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const userId = req.user.userId;

    const tournament = await Tournament.findOne({
      where: { id: tournamentId, createdBy: userId },
    });

    if (!tournament) {
      return res.status(404).json({ error: 'Torneo no encontrado'})
    }

    const teams = await Team.findAll({
      where: { tournamentId },
      attributes: ['id', 'name']
    });

    const playedMatches = await Match.findAll({
      where: {
        tournamentId,
        status: 'finished'
      },
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
    });
    
    const futureMatches = await Match.findAll({
      where: {
        tournamentId,
        status: 'scheduled'
      },
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
    });

    if (playedMatches.length < 5) {
      return res.json({
        message: 'Se necesitan más partidos jugados para generar predicciones precisas',
        predictions: []
      });
    }

    const tournamentStats = calculateTournamentStats(playedMatches);

    const teamStats = calculateTeamStats(teams, playedMatches, tournamentStats);

    const predictions = generatePredictions(futureMatches, teamStats, tournamentStats);

    res.json({
      tournament: {
        id: tournament.id,
        name: tournament.name
      },
      predictions,
      basedOnMatches: playedMatches.length
    })

  } catch (error) {
    console.error('Error calculando predicciones:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const calculateTournamentStats = (matches) => {
  let totalGoals = 0;
  let totalMatches = matches.length;

  matches.forEach(match => {
    totalGoals += match.goalsHomeTeam + match.goalsAwayTeam;
  });

  return {
    averageGoalsPerMatch: totalGoals / totalMatches,
    totalMatches
  };
};

const calculateTeamStats = (teams, matches, tournamentStats) => {
  const stats = {};

  teams.forEach(team => {
    stats[team.id] = {
      teamId: team.id,
      teamName: team.name,
      matchesPlayed: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      wins: 0,
      draws: 0,
      losses: 0
    };
  });

  matches.forEach(match => {
    const homeTeamId = match.homeTeam.id;
    const awayTeamId = match.awayTeam.id;

    stats[homeTeamId].matchesPlayed += 1;
    stats[homeTeamId].goalsFor += match.goalsHomeTeam;
    stats[homeTeamId].goalsAgainst += match.goalsAwayTeam;

    stats[awayTeamId].matchesPlayed += 1;
    stats[awayTeamId].goalsFor += match.goalsAwayTeam;
    stats[awayTeamId].goalsAgainst += match.goalsHomeTeam;

    if (match.goalsHomeTeam > match.goalsAwayTeam) {
      stats[homeTeamId].wins += 1;
      stats[awayTeamId].losses += 1;
    } else if (match.goalsHomeTeam < match.goalsAwayTeam) {
      stats[homeTeamId].losses += 1;
      stats[awayTeamId].wins += 1;
    } else {
      stats[homeTeamId].draws += 1;
      stats[awayTeamId].draws += 1;
    }
  });

  Object.keys(stats).forEach(teamId => {
    const team = stats[teamId];

    if (team.matchesPlayed > 0) {
      team.attackStrength = (team.goalsFor / team.matchesPlayed) / tournamentStats.averageGoalsPerMatch;

      team.defenseStrength = (team.goalsAgainst / team.matchesPlayed) / tournamentStats.averageGoalsPerMatch;

      team.pointsPerMatch = (team.wins * 3 + team.draws) / team.matchesPlayed;
    } else {
      team.attackStrength = 1.0;
      team.defenseStrength = 1.0;
      team.pointsPerMatch = 1.0;
    }
  });

  return stats;
}

const generatePredictions = (futureMatches, teamStats, tournamentStats) => {
  return futureMatches.map(match => {
    const homeTeam = teamStats[match.homeTeam.id];
    const awayTeam = teamStats[match.awayTeam.id];

    const expectedGoalsHome = homeTeam.attackStrength * awayTeam.defenseStrength * tournamentStats.averageGoalsPerMatch;
    const expectedGoalsAway = awayTeam.attackStrength * homeTeam.defenseStrength * tournamentStats.averageGoalsPerMatch;

    const homeWinProbability = calculateWinProbability(expectedGoalsHome, expectedGoalsAway, 'home');
    const awayWinProbability = calculateWinProbability(expectedGoalsAway, expectedGoalsHome, 'away');
    const drawProbability = calculateDrawProbability(expectedGoalsHome, expectedGoalsAway);

    return {
      matchId: match.id,
      matchDate: match.matchDate,
      homeTeam: {
        id: match.homeTeam.id,
        name: match.homeTeam.name
      },
      awayTeam: {
        id: match.awayTeam.id,
        name: match.awayTeam.name
      },
      prediction: {
        expectedGoalsHome: Math.round(expectedGoalsHome * 10) / 10,
        expectedGoalsAway: Math.round(expectedGoalsAway * 10) / 10,
        probabilities: {
          homeWin: Math.round(homeWinProbability * 100),
          draw: Math.round(drawProbability * 100),
          awayWin: Math.round(awayWinProbability * 100)
        },
        predictedResult: getPredictedResult(homeWinProbability, drawProbability, awayWinProbability)
      }
    };
  });
};

const calculateWinProbability = (expectedGoalsA, expectedGoalsB, type) => {
  const goalDifference = expectedGoalsA - expectedGoalsB;

  if (type === 'home') {
    return Math.max(0.1, Math.min(0.9, 0.5 + goalDifference * 0.2));
  } else {
    return Math.max(0.1, Math.min(0.9, 0.5 - goalDifference * 0.2));
  }
};

const calculateDrawProbability = (expectedGoalsHome, expectedGoalsAway) => {
  const goalDifference = Math.abs(expectedGoalsHome - expectedGoalsAway);
  return Math.max(0.1, Math.min(0.4, 0.3 - goalDifference * 0.1));
};

const getPredictedResult = (homeWin, draw, awayWin) => {
  if (homeWin >= draw && homeWin >= awayWin) return '1';
  if (awayWin >= homeWin && awayWin >= draw) return '2';
  return 'X';
};

module.exports = {
  calculatePredictions
};
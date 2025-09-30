const sequelize = require('../config/database');
const User = require('./User');
const Tournament = require('./Tournament');
const Team = require('./Team');
const Player = require('./Player');
const Match = require('./Match');

// Aquí puedo agregar los demás modelos y relaciones

User.hasMany(Tournament, { foreignKey: 'createdBy' });
Tournament.belongsTo(User, { foreignKey: 'createdBy' });

Tournament.hasMany(Team, { foreignKey: 'tournamentId' });
Team.belongsTo(Tournament, { foreignKey: 'tournamentId' });

Team.hasMany(Player, { foreignKey: 'teamId' });
Player.belongsTo(Team, { foreignKey: 'teamId' });

Tournament.hasMany(Match, { foreignKey: 'tournamentId' });
Match.belongsTo(Tournament, { foreignKey: 'tournamentId' });

Match.belongsTo(Team, { as: 'homeTeam', foreignKey: 'homeTeamId' });
Match.belongsTo(Team, { as: 'awayTeam', foreignKey: 'awayTeamId' });

module.exports = {
  sequelize,
  User,
  Tournament,
  Team,
  Player,
  Match
};
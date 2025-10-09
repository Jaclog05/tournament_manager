const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Match = sequelize.define('Match', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  matchDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  goalsHomeTeam: {
    type: DataTypes.INTEGER,
    defaultValue: null
  },
  goalsAwayTeam: {
    type: DataTypes.INTEGER,
    defaultValue: null
  },
  status: {
    type: DataTypes.ENUM('scheduled', 'playing', 'finished', 'cancelled'),
    defaultValue: 'scheduled'
  },
  round: {
    type: DataTypes.ENUM('Group Stage', 'Round of 16', 'Quarterfinals', 'Semifinals', 'Final'),
    allowNull: false
  }
});

module.exports = Match;
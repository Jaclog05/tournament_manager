const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Player = sequelize.define('Player', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  position: {
    type: DataTypes.ENUM('Goalkeeper', 'Defender', 'Midfielder', 'Forward'),
    allowNull: false
  },
  jerseyNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Player;
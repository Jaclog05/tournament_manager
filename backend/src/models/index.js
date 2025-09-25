const sequelize = require('../config/database');
const User = require('./User');

// Aquí puedo agregar los demás modelos y relaciones

module.exports = {
  sequelize,
  User,
};
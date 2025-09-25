const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bycrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  hooks: {
    beforeCreate: async (user) => {
      user.password = await bycrypt.hash(user.password, 10);
    }
  }
});

module.exports = User;
'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    password: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },

  }, {

    freezeTableName: true,
  });
  return users;
};
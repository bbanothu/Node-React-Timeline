'use strict';
module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define('posts', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    username: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 'ANON'
    },

  }, {

    freezeTableName: true,
  });
  return posts;
};

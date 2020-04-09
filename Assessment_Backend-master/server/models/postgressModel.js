'use strict';
module.exports = (sequelize, DataTypes) => {
  const postGressModel = sequelize.define('postGressModel', {
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

  }, {

    freezeTableName: true,
  });
  return postGressModel;
};
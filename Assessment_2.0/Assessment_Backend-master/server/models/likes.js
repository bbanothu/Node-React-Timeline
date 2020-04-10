'use strict';
module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define('likes', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
  }, {

    freezeTableName: true,
  });
  return posts;
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  const SampleModel = sequelize.define('SampleModel', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    sampleField: {
      type: DataTypes.STRING,
      allowNull: false
    },

  }, {});
  return SampleModel;
};
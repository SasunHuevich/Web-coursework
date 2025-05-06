const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sqlite_sequence', {
    name: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "TRIAL"
    },
    seq: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "TRIAL"
    },
    trial708: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      comment: "TRIAL"
    }
  }, {
    sequelize,
    tableName: 'sqlite_sequence',
    timestamps: false
  });
};

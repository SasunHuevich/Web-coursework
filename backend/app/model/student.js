const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('student', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    student_group_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'student_group',
        key: 'id'
      }
    }
  });
};

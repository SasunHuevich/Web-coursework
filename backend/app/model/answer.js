const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('answers', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'question',
        key: 'id'
      }
    },
    answer_text: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    is_correct: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });
};

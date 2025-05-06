const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('discipline', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    quiz_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'quiz',
            key: 'id'
        }
    },
    question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'question',
            key: 'id'
        }
    },
    user_answer: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    is_correct: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
  });
};
// app/models/quiz.model.js
const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    return Quiz = sequelize.define('quiz', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      user_id: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: true
      }
    });
  };
  
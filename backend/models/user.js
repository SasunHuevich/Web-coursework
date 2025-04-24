const sequelize = require('../database'); // Путь к вашему файлу с конфигурацией базы данных
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // другие поля
});

module.exports = User;
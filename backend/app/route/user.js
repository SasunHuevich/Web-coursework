var { authJwt } = require("../middleware");

module.exports = (app) => {

    const user = require('../controller/user');
    
    // Получение всех пользователей
    app.get('/api/users', [authJwt.verifyToken], user.findAll);

    // Добавление пользователя
    app.post('/api/addUser', [authJwt.verifyToken], user.create);

    // Обновление данных пользователя по id
    app.post('/api/updateUser/:id', [authJwt.verifyToken], user.update);

    // Удаление данных пользователя по id
    app.post('/api/deleteUser/:id', [authJwt.verifyToken], user.delete);

    // Получение пользователя по id
    app.get('/api/user/:id', [authJwt.verifyToken], user.findById);

    // Получение пользователя по username
    app.get('/api/user/username/:username', [authJwt.verifyToken], user.findByUsername);
};
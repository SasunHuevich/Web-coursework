var { authJwt } = require("../middleware");

module.exports = (app) => {

    const quizController = require('../controller/quizController.js'); // Подключаем контроллер
  
    // Эндпоинт для создания нового квиза с загрузкой изображения
    //app.post('/api/addQuiz1', [authJwt.verifyToken], quizController.create);
  };
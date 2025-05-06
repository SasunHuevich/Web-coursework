// app/controller/quiz.controller.js
var db = require('../config/db.config.js'); // Подключение к базе данных
var globalFunctions = require('../config/global.functions.js');

var quiz = db.quizzes; // Модель квизов


// Создание нового квиза
/*
exports.create = (req, res) => {
  console.log("gg1");
  console.log(req.body);  // Чтобы увидеть, что приходит в теле запроса
  console.log("gg2");
  console.log(req.user_id); // Чтобы проверить, есть ли user_id из JWT
  console.log("gg3");
  console.log(req.body.id);
  quiz.create({
    id: 1,
    name: req.body.name,
    description: req.body.description,
    user_id: 1,
    image: "ff"
  }).then(object => {
    globalFunctions.sendResult(res, object);
}).catch(err => {
    globalFunctions.sendError(res, err);
})
};*/

var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var question = db.question;
var answer = db.answer;
var quiz = db.quiz1;

exports.create = async (req, res) => {
    try {
        console.log(req.body);

        // Создаем новый вопрос
        const createdQuestion = await question.create({
            quiz_id: req.body.quiz_id,
            question_text: req.body.question_text
        });

        // Получаем ID созданного вопроса
        const questionId = createdQuestion.id;

        // Создаем правильный ответ
        await answer.create({
            question_id: questionId,
            answer_text: req.body.correctAnswer,
            is_correct: true
        });

        // Создаем неправильные ответы
        await answer.bulkCreate([
            {
                question_id: questionId,
                answer_text: req.body.wrongAnswer1,
                is_correct: false
            },
            {
                question_id: questionId,
                answer_text: req.body.wrongAnswer2,
                is_correct: false
            },
            {
                question_id: questionId,
                answer_text: req.body.wrongAnswer3,
                is_correct: false
            }
        ]);

        // Отправляем успешный ответ клиенту
        globalFunctions.sendResult(res, {
            message: "Вопрос и ответы успешно добавлены!"
        });
    } catch (err) {
        console.error("Ошибка при добавлении вопроса и ответов:", err);

        // Отправляем сообщение об ошибке
        globalFunctions.sendError(res, err);
    }
};

exports.getQuestionsByQuizId = (req, res) => {
    const quizId = req.params.QuizId; // Получаем quiz_id из параметров
    console.log(req.params.QuizId)
    question.findAll({
        where: { quiz_id: quizId },
        include: [ // Включим также ответы для каждого вопроса
            {
                model: answer,
                as: 'answers' // Предполагаем, что связь называется 'answers'
            }
        ]
    })
    .then(questions => {
        res.status(200).json(questions); // Возвращаем список вопросов
    })
    .catch(err => {
        globalFunctions.sendError(res, err);
    });
};


exports.deleteQuestion = (req, res) => {
    console.log(req.params);
    const questionId = req.params.questionId; // Получаем question_id из параметров
    console.log(req.params.questionId)
    question.destroy({
        where: { id: questionId }
    })
    .then(() => {
        res.status(200).send({ message: "Вопрос успешно удалён!" });
    })
    .catch(err => {
        globalFunctions.sendError(res, err);
    });
};


exports.getAnswersByQuestionId = (req, res) => {
    const questionId = req.params.questionId; // Получаем questionId из параметров
    console.log(req.params.questionId)
    answer.findAll({
        where: { question_id: questionId } // Получаем ответы по question_id
    })
    .then(answers => {
        res.json(answers); // Возвращаем список ответов
    })
    .catch(err => {
        console.error(err); // Логируем ошибку
        res.status(500).json({ error: 'Ошибка при получении ответов.' }); // Возвращаем ошибку
    });
};



exports.findAll = (req, res) => {
    question.findAll()
    .then(objects => {
     globalFunctions.sendResult(res, objects);
     })
     .catch(err => {
         globalFunctions.sendError(res, err);
     })
 };

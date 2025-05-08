var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var question = db.question;
var answer = db.answer;
var quiz = db.quiz1;

exports.create = async (req, res) => {
    try {
        console.log(req.body);

        const createdQuestion = await question.create({
            quiz_id: req.body.quiz_id,
            question_text: req.body.question_text
        });

        const questionId = createdQuestion.id;

        await answer.create({
            question_id: questionId,
            answer_text: req.body.correctAnswer,
            is_correct: true
        });

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

        globalFunctions.sendResult(res, {
            message: "Вопрос и ответы успешно добавлены!"
        });
    } catch (err) {
        console.error("Ошибка при добавлении вопроса и ответов:", err);

        globalFunctions.sendError(res, err);
    }
};

exports.getQuestionsByQuizId = (req, res) => {
    const quizId = req.params.QuizId;
    console.log(req.params.QuizId)
    question.findAll({
        where: { quiz_id: quizId },
        include: [
            {
                model: answer,
                as: 'answers'
            }
        ]
    })
    .then(questions => {
        res.status(200).json(questions);
    })
    .catch(err => {
        globalFunctions.sendError(res, err);
    });
};


exports.deleteQuestion = (req, res) => {
    console.log(req.params);
    const questionId = req.params.questionId;
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
    const questionId = req.params.questionId;
    console.log(req.params.questionId)
    answer.findAll({
        where: { question_id: questionId }
    })
    .then(answers => {
        res.json(answers);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при получении ответов.' });
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

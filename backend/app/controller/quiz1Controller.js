var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var quiz = db.quiz1;
//const {deleteQuestion} = require('./questionsController.js');
var question = db.question;
var answer = db.answer;

exports.create = (req, res) => {
    console.log(req.body);
    console.log(req.userId);
    quiz.create({
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        user_id: req.userId,
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
  };


  exports.findById = (req, res) => {
    quiz.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
  };


  
exports.getQuizzesByUser = async (req, res) => {
    try {
        const userId = req.params.userId; // Получаем userId из параметров URL
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Находим викторины, созданные пользователем с данным userId
        const quizzes = await quiz.findAll({
            where: { user_id: req.userId } // Предполагается, что в модели есть поле userId
        });

        res.status(200).json(quizzes); // Возвращаем найденные викторины
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Внутренняя функция для удаления вопроса
const deleteQuestion = async (questionId) => {
    return question.destroy({
        where: { id: questionId }
    });
};

// Контроллер для удаления викторины и связанных вопросов
exports.deleteQuizWithQuestions = async (req, res) => {
    console.log(req.params);
    const quizId = req.params.id; // Получаем ID викторины из параметров

    try {
        // Получаем все вопросы, связанные с викториной
        const questions = await question.findAll({
            where: { quiz_id: quizId }
        });

        // Удаляем все вопросы
        for (const question of questions) {
            await deleteQuestion(question.id); // Вызываем deleteQuestion для удаления вопроса
        }

        // Теперь удаляем викторину
        await quiz.destroy({
            where: { id: quizId }
        });

        res.status(200).send({ message: "Викторина и все связанные с ней вопросы успешно удалены!" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Произошла ошибка при удалении викторины и вопросов." });
    }
};

exports.getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await quiz.findAll(); // Здесь замените Quiz на название вашей модели
        res.status(200).json(quizzes);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Ошибка при получении викторин." });
    }
};


exports.getQuiz = async (req, res) => {
    try {
        const quizId = req.params.id;
        const quizz = await quiz.findByPk(quizId);
        const questions = await question.findAll({ where: { quiz_id: quizId } });

        // Здесь можно добавить логику для получения ответов для каждого вопроса
        const questionWithAnswers = await Promise.all(questions.map(async (question) => {
            const answers = await answer.findAll({ where: { question_id: question.id } });
            return {
                ...question.get(),
                answers // Добавляем ответы к вопросу
            };
        }));

        res.status(200).json({ quizz, questions: questionWithAnswers });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Ошибка при получении викторины." });
    }
};


exports.submitResults = async (req, res) => {
    console.log(req.body);
    const { userId, quizId, results } = req.body; // userId, quizId и массив results из тела запроса

    try {
        // Проверяем, существует ли викторина
        const quizz = await quiz.findByPk(quizId);
        if (!quizz) {
            return res.status(404).json({ message: 'Викторина не найдена' });
        }

        // Сохраняем результаты
        const saveResultsPromises = results.map(result => {
            return Result.create({
                user_id: userId, // Используем userId из тела запроса
                quiz_id: quizId, // Используем quizId из тела запроса
                question_id: result.questionId, // question_id из результата
                user_answer: result.userAnswer, // user_answer из результата
                is_correct: result.isCorrect // is_correct из результата
            });
        });

        await Promise.all(saveResultsPromises); // Ожидаем завершения всех операций
        res.status(200).json({ message: 'Результаты успешно сохранены' });
    } catch (error) {
        console.error('Ошибка при сохранении результатов:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};
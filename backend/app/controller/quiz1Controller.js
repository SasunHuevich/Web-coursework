var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var quiz = db.quiz1;
var question = db.question;
var answer = db.answer;
var result = db.result;
var user = db.user;
var result = db.result;

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
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const quizzes = await quiz.findAll({
            where: { user_id: req.userId } 
        });

        res.status(200).json(quizzes); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


const deleteQuestion = async (questionId) => {
    return question.destroy({
        where: { id: questionId }
    });
};

const deleteResult = async (resultId) => {
    return result.destroy({
        where: {id: resultId }
    });
};


exports.deleteQuizWithQuestions = async (req, res) => {
    console.log(req.params);
    const quizId = req.params.id;

    try {
        
        const questions = await question.findAll({
            where: { quiz_id: quizId }
        });

        const results = await result.findAll({
            where: { quiz_id: quizId }
        });

        
        for (const question of questions) {
            await deleteQuestion(question.id);
        }


        for (const result of results) {
            await deleteResult(result.id);
        }
        
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
        const quizzes = await quiz.findAll();
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

        
        const questionWithAnswers = await Promise.all(questions.map(async (question) => {
            const answers = await answer.findAll({ where: { question_id: question.id } });
            return {
                ...question.get(),
                answers
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
    const { userId, quizId, results } = req.body;

    try {
        
        const quizz = await quiz.findByPk(quizId);
        if (!quizz) {
            return res.status(404).json({ message: 'Викторина не найдена' });
        }

        
        const saveResultsPromises = results.map(result => {
            return Result.create({
                user_id: userId,
                quiz_id: quizId,
                question_id: result.questionId,
                user_answer: result.userAnswer,
                is_correct: result.isCorrect
            });
        });

        await Promise.all(saveResultsPromises);
        res.status(200).json({ message: 'Результаты успешно сохранены' });
    } catch (error) {
        console.error('Ошибка при сохранении результатов:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};


exports.saveAnswer = async (req, res) => {
    try {
        const user_id = req.userId;
        console.log(user_id);
      const {quiz_id, question_id, user_answer, is_correct } = req.body;
      console.log(req.body)        
      
      const newAnswer = await result.create({
        user_id,
        quiz_id,
        question_id,
        user_answer,
        is_correct
      });
  
      
      return res.status(201).json({
        message: 'Ответ успешно сохранен!',
        answer: newAnswer
      });
    } catch (error) {
      console.error('Ошибка при сохранении ответа:', error);
      return res.status(500).json({ message: 'Ошибка сервера при сохранении ответа.' });
    }
  };


exports.deleteUserAnswers = async (req, res) => {
    console.log("gggg");
    const userId = req.userId;
    const quizId = req.body.quizId;
    console.log(userId);
    console.log(quizId);
    try {
      
      await result.destroy({
        where: {
          user_id: userId,
          quiz_id: quizId
        }
      });
  
      res.status(200).json({ message: 'Ответы успешно удалены.' });
    } catch (error) {
      console.error('Ошибка при удалении ответов:', error);
      res.status(500).json({ error: 'Ошибка при удалении ответов.' });
    }
};

exports.getResults = async (req, res) => {
    const quizId = req.params.quizId;
    const currentUserId = req.userId;

    try {
        
        const results = await result.findAll({
            where: { quiz_id: quizId },
            attributes: ['user_id', 'is_correct'],
        });

        
        const userIds = [...new Set(results.map(result => result.user_id))];

        
        const users = await user.findAll({
            where: {
                id: userIds
            },
            attributes: ['id', 'username']
        });

        
        const userMap = {};
        users.forEach(user => {
            userMap[user.id] = user.username;
        });

        
        const userResults = {};

        results.forEach(answer => {
            const userId = answer.user_id;
            const userName = userMap[userId];

            
            if (!userResults[userId]) {
                userResults[userId] = {
                    userId: userId,
                    userName: userName,
                    correctAnswers: 0,
                    totalAnswers: 0
                };
            }

            
            userResults[userId].totalAnswers += 1;
            if (answer.is_correct) {
                userResults[userId].correctAnswers += 1;
            }
        });

        
        const responseResults = Object.values(userResults);

        
        responseResults.sort((a, b) => b.correctAnswers - a.correctAnswers);

        
        return res.status(200).json({ results: responseResults, currentUserId });
    } catch (error) {
        console.error('Ошибка при получении результатов:', error);
        res.status(500).json({ error: 'Ошибка при получении результатов.' });
    }
};



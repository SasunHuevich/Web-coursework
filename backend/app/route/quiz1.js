var { authJwt } = require("../middleware");

module.exports = (app) => {

    const quizController = require('../controller/quiz1Controller');

    const questionController = require('../controller/questionsController')
    

    app.post('/api/addQuiz1', [authJwt.verifyToken], quizController.create);


    app.post('/api/addQuestion', [authJwt.verifyToken], questionController.create);

    app.get('/api/getQuestionsByQuizId/:QuizId', [authJwt.verifyToken], questionController.getQuestionsByQuizId);


    app.delete('/api/deleteQuestion/:questionId', [authJwt.verifyToken], questionController.deleteQuestion);


    app.get('/api/getAnswersByQuestionId/:questionId', [authJwt.verifyToken], questionController.getAnswersByQuestionId)

    app.get('/api/getQuizzesByUser/:userId', [authJwt.verifyToken], quizController.getQuizzesByUser);

    app.delete('/api/deleteQuiz/:id', [authJwt.verifyToken], quizController.deleteQuizWithQuestions);

    app.get('/api/quizList', [authJwt.verifyToken], quizController.getAllQuizzes);

    app.post('/api/submitResults', [authJwt.verifyToken], quizController.submitResults);

    app.get('/api/getQuiz/:id', [authJwt.verifyToken], quizController.getQuiz);


    app.post('/api/saveAnswer', [authJwt.verifyToken], quizController.saveAnswer);

    app.delete('/api/deleteUserAnswers', [authJwt.verifyToken], quizController.deleteUserAnswers);
    

    app.get('/api/results/:quizId', [authJwt.verifyToken], quizController.getResults);
};
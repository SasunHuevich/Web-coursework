const Quiz = require('../models/quiz');

exports.createQuiz = async (req, res) => {
  const { title, description } = req.body;

  try {
    const newQuiz = await Quiz.create({ title, description });
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.findAll();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

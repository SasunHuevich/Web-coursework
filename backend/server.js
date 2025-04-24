const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');
const sequelize = require('./config');

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);

sequelize.sync({ force: false }).then(() => {
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
});

<template>
  <div class="container mt-5">
    <h3 class="text-center mb-4">{{ quiz.name }}</h3>
    <div v-if="currentQuestion && !quizCompleted">
      <div class="question">
        <h5>{{ currentQuestion.question_text }}</h5>
      </div>
      <div class="answers">
        <div
          v-for="(answer, index) in shuffledAnswers"
          :key="index"
          class="btn btn-outline-primary my-1"
          @click="selectAnswer(answer)"
        >
          {{ answer.answer_text }}
        </div>
      </div>
    </div>

    <div v-else-if="quizCompleted">
      <h4>Результаты викторины:</h4>
      <div v-for="(answer, index) in answers" :key="index">
        <p><strong>Вопрос:</strong> {{ questions.find(question => question.id === answer.questionId).question_text }}</p>
        <p><strong>Ваш ответ:</strong> {{ answer.userAnswer }}</p>
        <p><strong>Правильный ответ:</strong> {{ questions.find(question => question.id === answer.questionId)?.answers.find(answer => answer.is_correct === 1).answer_text }}</p>
        <hr>
      </div>
      <button class="btn btn-primary" @click="finishQuiz">Завершить</button>
    </div>

    <div v-else>
      <p>Викторина завершена!</p>
      <button class="btn btn-primary" @click="finishQuiz">Завершить</button>
    </div>
  </div>
</template>

<script>
import http from "../../http-common";

export default {
  name: "GoQuiz",
  data() {
    return {
      quiz: {},
      questions: [],
      currentQuestionIndex: 0,
      answers: [],
      shuffledAnswers: [],
      quizCompleted: false, // Состояние завершенности викторины
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex]; // Получаем текущий вопрос
    }
  },
  methods: {
    // Получение данных викторины
    fetchQuiz() {
      const quizId = this.$route.params.id;
      if (quizId) {
        http.get(`/getQuiz/${quizId}`)
          .then(response => {
            console.log(response.data); // Проверяем структуру данных
            this.quiz = response.data.quizz;
            this.questions = response.data.questions; // Убедитесь, что здесь массив вопросов
            console.log(this.questions);
            this.shuffleAnswers();
          })
          .catch(error => {
            console.error("Ошибка при получении викторины: ", error);
          });
      } else {
        console.error("ID викторины не найден в URL.");
      }
    },
    // Перемешивание ответов текущего вопроса
    shuffleAnswers() {
      if (this.currentQuestion && this.currentQuestion.answers) {
        this.shuffledAnswers = [...this.currentQuestion.answers].sort(() => Math.random() - 0.5);
      }
    },
    // Выбор ответа
    selectAnswer(answer) {
      // Проверяем, есть ли текущий вопрос
      if (!this.currentQuestion) {
        console.error("Текущий вопрос не определен."); // Защита от ошибок
        return;
      }

      // Сохраняем ответ пользователя
      console.log(answer);
      this.answers.push({
        questionId: this.currentQuestion.id, // Получаем id текущего вопроса
        userAnswer: answer.answer_text,
        isCorrect: answer.isCorrect
      });

      // Увеличиваем индекс текущего вопроса
      this.currentQuestionIndex++;

      // Проверяем, достигли ли мы конца вопросов
      if (this.currentQuestionIndex < this.questions.length) {
        // Если вопросы остались, перемешиваем ответы следующего вопроса
        this.shuffleAnswers();
      } else {
        // Если вопросов больше нет, помечаем викторину как завершенную
        this.quizCompleted = true;
      }
    },
    // Завершение викторины
    finishQuiz() {
      const results = {
        quizId: this.quiz.id,
        answers: this.answers
      };
      http.post("/submitResults", results)
        .then(() => {
          alert("Результаты успешно сохранены!");
          this.$router.push("/allQuizzes");
        })
        .catch(error => {
          console.error("Ошибка при сохранении результатов: ", error);
        });
    }
  },
  mounted() {
    this.fetchQuiz(); // Получаем данные викторины при монтировании компонента
  }
};
</script>

<style scoped>
.container {
  text-align: center; /* Центрируем текст внутри контейнера */
}

h3 {
  font-weight: bold; /* Жирный шрифт */
  font-size: 24px; /* Размер шрифта */
  margin-bottom: 20px; /* Отступ снизу */
  color: #2c3e50; /* Цвет заголовка */
}

.question {
  margin-bottom: 20px;
}

.answers {
  display: flex;
  flex-direction: column;
  align-items: center; /* Центрируем кнопки по горизонтали */
}

.btn {
  width: 100%; /* Задаем ширину кнопок, чтобы они заполняли контейнер */
  max-width: 300px; /* Ограничиваем максимальную ширину кнопок */
}
</style>

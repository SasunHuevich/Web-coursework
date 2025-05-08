<template>
  <div class="container mt-5">
    <h3 class="text-center mb-4">{{ quiz.name }}</h3>
    
    <!-- Вопросы во время прохождения теста -->
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

    <!-- Результаты после завершения викторины -->
    <div v-else-if="quizCompleted">
      <h4>Результаты викторины:</h4>
      <div v-for="(answer, index) in answers" :key="index">
        <p style="font-size: 1.2em;"><strong>Вопрос:</strong> {{ questions.find(question => question.id === answer.question_id)?.question_text }}</p>

        
        <p :class="{'text-danger': !answer.is_correct, 'text-success': answer.is_correct}">
          <strong>Ваш ответ:</strong> {{ answer.user_answer }}
        </p>


        <p>
          <strong>Правильный ответ:</strong> {{ questions.find(question => question.id === answer.question_id)?.answers.find(a => a.is_correct === 1)?.answer_text }}
        </p>

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
      quizCompleted: false,
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    }
  },
  methods: {
    fetchQuiz() {
      const quizId = this.$route.params.id;
      if (quizId) {
        http.get(`/getQuiz/${quizId}`)
          .then(response => {
            console.log(response.data);
            this.quiz = response.data.quizz;
            this.questions = response.data.questions;
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
    
    shuffleAnswers() {
      if (this.currentQuestion && this.currentQuestion.answers) {
        this.shuffledAnswers = [...this.currentQuestion.answers].sort(() => Math.random() - 0.5);
      }
    },
    
    selectAnswer(answer) {
  if (!this.currentQuestion) {
    console.error("Текущий вопрос не определен.");
    return;
  }

  console.log(answer);
  const userAnswer = {
    quiz_id: this.quiz.id,
    question_id: this.currentQuestion.id,
    user_answer: answer.answer_text,
    is_correct: answer.is_correct
  };

  
  this.answers.push(userAnswer);

  
  http.post("/saveAnswer", userAnswer)
    .then(() => {
      console.log("Ответ успешно сохранен!");
    })
    .catch(error => {
      console.error("Ошибка при сохранении ответа: ", error);
    });

  
  this.currentQuestionIndex++;

  
  if (this.currentQuestionIndex < this.questions.length) {
    this.shuffleAnswers();
  } else {
    this.quizCompleted = true;
  }
},
    
    finishQuiz() {
      this.$router.push("/quizlist")
    }
  },
  mounted() {
    this.fetchQuiz();
  }
};
</script>

<style scoped>
.container {
  text-align: center;
}

h3 {
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 20px;
  color: #2c3e50;
}

.question {
  margin-bottom: 20px;
}

.answers {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btn {
  width: 100%;
  max-width: 300px;
}
</style>

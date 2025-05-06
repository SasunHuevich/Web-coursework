<template>
  <div class="container mt-5">
    <h3 class="text-center mb-4">Все викторины</h3>

    <div v-if="quizzes.length" class="row justify-content-center">
      <div class="col-md-8">
        <ul class="list-group">
          <li v-for="quiz in quizzes" :key="quiz.id" class="list-group-item">
            <div class="d-flex justify-content-between align-items-center">
              <span>{{ quiz.name }}</span>
              <div>
                <button class="btn btn-sm btn-info mr-2" @click="toggleDescription(quiz.id)">
                  {{ quiz.showDescription ? "Скрыть описание" : "Показать описание" }}
                </button>
                <button class="btn btn-sm btn-primary" @click="startQuiz(quiz.id)">Пройти викторину</button>
              </div>
            </div>
            <!-- Описание викторины -->
            <div v-if="quiz.showDescription" class="mt-2 p-2" style="background-color: #e7f3fe; border-radius: 5px;">
              <p>{{ quiz.description }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div v-else class="text-center">
      <p>Викторин пока нет.</p>
    </div>
  </div>
</template>

<script>
import http from "../../http-common";

export default {
  name: "AllQuizzes",
  data() {
    return {
      quizzes: [] // Массив для хранения всех викторин
    };
  },
  methods: {
    // Получение всех викторин
    fetchAllQuizzes() {
      http
        .get("/quizList")
        .then(response => {
          // Добавляем свойство showDescription для каждой викторины
          this.quizzes = response.data.map(quiz => ({
            ...quiz,
            showDescription: false // Изначально описание скрыто
          }));
        })
        .catch(error => {
          console.log("Ошибка при получении викторин: ", error);
        });
    },

    // Метод для начала викторины
    startQuiz(quizId) {
      this.$router.push({ path: `/quiz/${quizId}` }); // Здесь предполагается, что у вас есть маршрут для прохождения викторины
    },

    // Метод для переключения видимости описания
    toggleDescription(quizId) {
      const quiz = this.quizzes.find(q => q.id === quizId);
      if (quiz) {
        quiz.showDescription = !quiz.showDescription; // Переключаем видимость описания
      }
    }
  },
  mounted() {
    this.fetchAllQuizzes(); // Получаем все викторины при монтировании компонента
  }
};
</script>

<style scoped>
/* Стили для кнопок и списка викторин */
.list-group-item {
  cursor: pointer;
}
</style>

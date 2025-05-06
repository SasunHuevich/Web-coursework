<template>
    <div class="container mt-5">
      <h3 class="text-center mb-4">Ваши викторины</h3>
  
      <div v-if="quizzes.length" class="row justify-content-center">
        <div class="col-md-8">
          <ul class="list-group">
            <!-- Перебор списка викторин, вывод каждой викторины с кнопками изменения и удаления -->
            <li v-for="quiz in quizzes" :key="quiz.id" class="list-group-item d-flex flex-column">
              <div class="d-flex justify-content-between align-items-center">
                <!-- Название викторины -->
                <span>{{ quiz.name }}</span>
  
                <div>
                  <!-- Кнопка для отображения описания -->
                  <button class="btn btn-sm btn-secondary mr-2" @click="toggleDescription(quiz.id)">
                    {{ quiz.showDescription ? 'Скрыть описание' : 'Описание' }}
                  </button>
                  <!-- Кнопка редактирования -->
                  <button class="btn btn-sm btn-info mr-2" @click="editQuiz(quiz.id)">Изменить</button>
                  <!-- Кнопка удаления -->
                  <button class="btn btn-sm btn-danger" @click="confirmDelete(quiz.id)">Удалить</button>
                </div>
              </div>
  
              <!-- Описание викторины, если отображено -->
              <div v-if="quiz.showDescription" class="quiz-description mt-3 p-3">
                <p>{{ quiz.description }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
  
      <!-- Если у пользователя нет викторин -->
      <div v-else class="text-center">
        <p>У вас пока нет созданных викторин.</p>
        <router-link to="/addQuiz1" class="btn btn-primary">Создать новую викторину</router-link>
      </div>
    </div>
  </template>
  
  <script>
  import http from "../../http-common";
  
  export default {
    name: "UserQuizzes",
    data() {
      return {
        quizzes: [] // Массив для хранения викторин пользователя
      };
    },
    methods: {
      // Получение списка викторин пользователя
      fetchUserQuizzes() {
        const userId = this.userId;
        http
          .get(`/getQuizzesByUser/${userId}`)
          .then(response => {
            this.quizzes = response.data.map(quiz => ({
              ...quiz,
              showDescription: false // Изначально описание скрыто
            }));
          })
          .catch(error => {
            console.log("Ошибка при получении викторин: ", error);
          });
      },
  
      // Метод для редактирования викторины
      editQuiz(quizId) {
        this.$router.push({ path: `/addQuestions/${quizId}` });
      },
  
      // Метод для подтверждения удаления викторины
      confirmDelete(quizId) {
        if (confirm("Вы уверены, что хотите удалить эту викторину?")) {
          this.deleteQuiz(quizId);
        }
      },
  
      // Метод для удаления викторины
      deleteQuiz(quizId) {
        http
          .delete(`/deleteQuiz/${quizId}`)
          .then(() => {
            this.fetchUserQuizzes(); // Обновляем список после удаления
          })
          .catch(error => {
            console.log("Ошибка при удалении викторины: ", error);
          });
      },
  
      // Метод для переключения видимости описания викторины
      toggleDescription(quizId) {
        const quiz = this.quizzes.find(q => q.id === quizId);
        if (quiz) {
          quiz.showDescription = !quiz.showDescription;
        }
      }
    },
    mounted() {
      this.fetchUserQuizzes();
    }
  };
  </script>
  
  <style scoped>
  /* Стили для кнопок */
  .btn-info {
    margin-right: 10px;
  }
  
  /* Стили для описания викторины */
  .quiz-description {
    background-color: #e0f7fa; /* Светло-голубой фон */
    border: 1px solid #b2ebf2; /* Голубая рамка */
    border-radius: 5px; /* Скруглённые углы */
    padding: 10px; /* Внутренний отступ */
    margin-top: 10px; /* Отступ сверху */
  }
  </style>
  
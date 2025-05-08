<template>
    <div class="container mt-5">
      <h3 class="text-center mb-4">Ваши викторины</h3>
  
      <div v-if="quizzes.length" class="row justify-content-center">
        <div class="col-md-8">
          <ul class="list-group">
            
            <li v-for="quiz in quizzes" :key="quiz.id" class="list-group-item d-flex flex-column">
              <div class="d-flex justify-content-between align-items-center">
                
                <span>{{ quiz.name }}</span>
  
                <div>
                  
                  <button class="btn btn-sm btn-secondary mr-2" @click="toggleDescription(quiz.id)">
                    {{ quiz.showDescription ? 'Скрыть описание' : 'Описание' }}
                  </button>
                  
                  <button class="btn btn-sm btn-info mr-2" @click="editQuiz(quiz.id)">Изменить</button>
                  
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
        quizzes: []
      };
    },
    methods: {
      
      fetchUserQuizzes() {
        const userId = this.userId;
        http
          .get(`/getQuizzesByUser/${userId}`)
          .then(response => {
            this.quizzes = response.data.map(quiz => ({
              ...quiz,
              showDescription: false
            }));
          })
          .catch(error => {
            console.log("Ошибка при получении викторин: ", error);
          });
      },
  
      
      editQuiz(quizId) {
        this.$router.push({ path: `/addQuestions/${quizId}` });
      },
  
      
      confirmDelete(quizId) {
        if (confirm("Вы уверены, что хотите удалить эту викторину?")) {
          this.deleteQuiz(quizId);
        }
      },
  
      
      deleteQuiz(quizId) {
        http
          .delete(`/deleteQuiz/${quizId}`)
          .then(() => {
            this.fetchUserQuizzes(); 
          })
          .catch(error => {
            console.log("Ошибка при удалении викторины: ", error);
          });
      },
  
      
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
  
  .btn-info {
    margin-right: 10px;
  }
  
  
  .quiz-description {
    background-color: #e0f7fa;
    border: 1px solid #b2ebf2;
    border-radius: 5px;
    padding: 10px;
    margin-top: 10px;
  }
  </style>
  
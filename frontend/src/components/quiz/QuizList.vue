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
                <button class="btn btn-sm btn-primary mr-2" @click="startQuiz(quiz.id)">Пройти викторину</button>
                <button class="btn btn-sm btn-secondary" @click="viewResults(quiz.id)">Результаты</button>
              </div>
            </div>

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
      quizzes: []
    };
  },
  methods: {
    fetchAllQuizzes() {
      http
        .get("/quizList")
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

    async deleteUserAnswers(quizId) {
      console.log(quizId);
      try {
        
        await http.delete('/deleteUserAnswers', {
          data: { quizId }
        });
        console.log('Ответы успешно удалены.');
      } catch (error) {
        console.error('Ошибка при удалении ответов:', error);
      }
    },

    
    async startQuiz(quizId) {
      await this.deleteUserAnswers(quizId);
      this.$router.push({ path: `/quiz/${quizId}` });
    },

    
    toggleDescription(quizId) {
      const quiz = this.quizzes.find(q => q.id === quizId);
      if (quiz) {
        quiz.showDescription = !quiz.showDescription;
      }
    },

    viewResults(quizId) {
      this.$router.push({ path: `/quizResults/${quizId}` });
    }
  },
  mounted() {
    this.fetchAllQuizzes();
  }
};
</script>

<style scoped>
.list-group-item {
  cursor: pointer;
}
</style>

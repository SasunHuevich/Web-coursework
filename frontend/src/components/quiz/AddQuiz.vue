<template>
  <div class="container mt-5">
      <h1 class="mb-4">Создать новую викторину</h1>

      <form @submit.prevent="addQuiz" enctype="multipart/form-data">
          <div class="form-group mt-3">
              <label for="title">Название</label>
              <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="quiz.name"
                  placeholder="Введите название"
                  required
              />
          </div>

          <div class="form-group mt-3">
              <label for="description">Описание</label>
              <textarea
                  class="form-control"
                  id="description"
                  v-model="quiz.description"
                  placeholder="Введите описание"
                  required
              ></textarea>
          </div>

          <div class="form-group1 mt-3">
              <label for="image">Изображение викторины</label>
          </div>
      
          <div class="form-group">
              <input
                  type="file"
                  class="form-control-file"
                  id="image"
                  @change="handleImageUpload"
                  accept="image/*"
                  required
              />
          </div>

          <button type="submit" class="btn btn-primary mt-4">Create Quiz</button>

          <div v-if="successMessage" class="alert alert-success mt-3">{{ successMessage }}</div>
          <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
      </form>
  </div>
</template>

<script>
import http from "../../http-common";
export default {
  name: "CreateQuiz",
  data() {
      return {
          quiz: {
            id: null,
              name: '',
              description: '',
              user_id: '',
              image: null
          },
          successMessage: '',
          errorMessage: ''
      };
  },
  methods: {
    handleImageUpload(event) {
        this.quiz.image = event.target.files[0]; // сохраняем загруженное изображение
    },

    addQuiz(e) {
    e.preventDefault(); // запрещаем отправку формы
    
    const quizData = {
        name: this.quiz.name,
        description: this.quiz.description,
        // Если изображение пока не нужно, не отправляйте его
    };

    http
        .post("/addQuiz", quizData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            this.quiz.id = response.data.id;
            this.successMessage = 'Викторина успешно создана!';
            this.resetForm();
        })
        .catch(error => {
            this.errorMessage = 'Ошибка при создании викторины: ' + error.message;
        });
},

      resetForm() {
          this.quiz = {
            id: null,
              name: '',
              description: '',
              user_id: '',
              image: null
          };
          this.successMessage = '';
          this.errorMessage = '';
      }
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
}
</style>

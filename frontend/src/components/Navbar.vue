<template>
  <div id="app">
    <nav class="navbar navbar-light px-4" style="background-color: #CFD0F0;">
      <div class="navbar-brand">
        <img src="../../assets/logo.png" class="logo" alt="логотип">
        <router-link class="item quiz-link" to="/quizList">Викторины</router-link>
        <router-link class="item quiz-link" to="/addQuiz1">Создать викторину</router-link>
        <router-link class="item quiz-link" to="/MyQuiz">Мои викторины</router-link>
      </div>
      <div v-if="currentUser">
        <router-link class="item navbar-brand" to="/profile">
          {{ currentUser.username }}
        </router-link>
        <a class="item navbar-brand" href @click.prevent="logOut">
          Выйти
        </a>
      </div>
      <div v-else>
        <router-link class="item navbar-brand" to="/login">
          Войти
        </router-link>
      </div>
    </nav>
    <div style="margin-top: 20px;">
    </div>
  </div>
</template>

<script>
    export default {
    name: "NavBar",
    data() {
        return {};

    },
    computed: { // вычисляемые свойства
        currentUser() {
            return this.$store.state.auth.user;
        }
    },
    methods: {
        logOut() {
            this.$store.dispatch('auth/logout'); // обращаемся к методу logout, который определён в auth.service.js
            window.location.href = '/login'; // // Используем такую конструкцию, а не this.$router.push, так как требуется перезагрузить страницу для обновления локального хранилища
        }
    }
};
</script>

<style>
  .navbar {
    display: flex; /* Flexbox для навигационной панели */
    justify-content: space-between; /* Распределяем элементы по краям */
    align-items: center; /* Выравниваем элементы по центру по вертикали */
  }

  .navbar-brand {
    display: flex; /* Flexbox для логотипа и надписи "Квизы" */
    align-items: center; /* Выравниваем элементы по вертикали по центру */
  }

  .item {
    margin-left: 10px; /* Отступ между логотипом и надписью "Квизы" */
    text-decoration: none; /* Убираем подчеркивание у ссылки */
    color: inherit; /* Унаследовать цвет от родителя */
  }

  .logo {
    width: 70px;
    height: auto;
  }

  .quiz-link {
    margin-left: 20px; /* Установите желаемый отступ */
}
</style>
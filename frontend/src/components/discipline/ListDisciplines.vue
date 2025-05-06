<template>
  <div>
    <h4>Список учебных дисциплин</h4>
    <ul class="list-group mt-3">
      <!-- Вывод списка учебных дисциплин -->
      <li class="list-group-item" v-for="(discipline, index) in disciplines" :key="index">
        <router-link :to="{
          name: 'discipline-details',
          params: { id: discipline.id }
        }">
          {{discipline.name}}
        </router-link>
      </li>
    </ul>
    <div v-if="displayContent">
      <router-link class="item btn btn-success" to="/addDiscipline">Добавить учебную дисциплину</router-link>
    </div>  
      <div v-else>
        Добавление доступно только авторизованным пользователям
    </div>
  </div>
</template>

<script>
import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу
import UserService from '../../services/user.service';
export default {
  name: "ListDisciplines", // Имя шаблона
  data() { // данные компонента (определение переменных)
    return {
      disciplines: [],
      displayContent: false //по умолчанию скрываем контент
    };
  },
  methods: { // методы компонента
    getDisciplines() {
      http
          .get("/listDisciplines") // обращаемся к серверу для получения списка учебных дисциплин
          .then(response => { // запрос выполнен успешно
            this.disciplines = response.data;
          })
          .catch(e => { // запрос выполнен с ошибкой
            console.log(e);
          });
    }
  },
  mounted() { // загружаем данные учебных дисциплин. Обработчик mounted() вызывается после монтирования экземпляра шаблона
    UserService.getUserBoard()
          .then(() => {
            this.displayContent = true;
          })
          .catch(e => {
                this.content =
                    (e.response && e.response.data) ||
                    e.message ||
                    e.toString();
              }
          );
    this.getDisciplines();
  }
}
</script>

<style>

</style>
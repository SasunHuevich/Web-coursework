<template>
    <div>
      <h4>Список студенческих групп</h4>
      <ul class="list-group mt-3">
        <li class="list-group-item" v-for="(studentGroup, index) in studentGroups" :key="index">
          <router-link :to="{
            name: 'studentGroup-details',
            params: { id: studentGroup.id }
          }">
            {{studentGroup.name}}
          </router-link>
        </li>
      </ul>
        <router-link class="item btn btn-success" to="/addStudentGroup">Добавить студенческую группу</router-link>
    </div>
</template>
  
  <script>
  import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу
  export default {
    name: "ListStudentGroups", // Имя шаблона
    data() { // данные компонента (определение переменных)
      return {
        studentGroups: []
      };
    },
    methods: { // методы компонента
      getStudentGroups() {
        http
            .get("/listStudentGroups") // обращаемся к серверу для получения списка студенческих групп
            .then(response => { // запрос выполнен успешно
              this.studentGroups = response.data;
            })
            .catch(e => { // запрос выполнен с ошибкой
              console.log(e);
            });
      }
    },
    mounted() { // загружаем данные студенческих групп. Обработчик mounted() вызывается после монтирования экземпляра шаблона
      this.getStudentGroups();
    }
  }
  </script>
  
  <style>
  
  </style>
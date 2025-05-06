<template>
    <div>
      <h4>Список преподавателей</h4>
      <ul class="list-group mt-3">
        <!-- Вывод списка преподавателей -->
        <li class="list-group-item" v-for="(teacher, index) in teachers" :key="index">
          <router-link :to="{
            name: 'teacher-details',
            params: { id: teacher.id }
          }">
            {{teacher.name}}
          </router-link>
        </li>
      </ul>
        <router-link class="item btn btn-success" to="/addTeacher">Добавить преподавателя</router-link>
    </div>
  </template>
  
  <script>
  import http from "../../http-common"; // подключение объекта, который позволяет отправлять запросы серверу
  export default {
    name: "ListTeachers", // Имя шаблона
    data() { // данные компонента (определение переменных)
      return {
        teachers: []
      };
    },
    methods: { // методы компонента
      getTeachers() {
        http
            .get("/listTeachers") // обращаемся к серверу для получения списка преподавателей
            .then(response => { // запрос выполнен успешно
              this.teachers = response.data;
            })
            .catch(e => { // запрос выполнен с ошибкой
              console.log(e);
            });
      }
    },
    mounted() { // загружаем данные преподавателей. Обработчик mounted() вызывается после монтирования экземпляра шаблона
      this.getTeachers();
    }
  }
  </script>
  
  <style>
  
  </style>
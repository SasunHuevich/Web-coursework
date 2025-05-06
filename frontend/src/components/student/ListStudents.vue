<template>
    <div>
      <h4>Список студентов</h4>
      <router-link class="item btn btn-success" to="/addStudent">Добавить студента</router-link>
      <ul class="list-group mt-3">
        <li class="list-group-item" v-for="(student, index) in students" :key="index">
          <router-link :to="{
                  name: 'student-details',
                  params: { id: student.id }
              }">
              {{student.name}}
          </router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
    import http from "../../http-common";
    export default {
        name: "ListStudents",
        data() {
            return {
                students: []
            };
        },
        methods: {
            getStudents() {
                http
                    .get("/listStudents")
                    .then(response => {
                        this.students = response.data;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() {
            this.getStudents();
        }
    }
  </script>
  
  <style>
  
  </style>
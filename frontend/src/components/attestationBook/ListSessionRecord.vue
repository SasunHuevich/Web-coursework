<template>
    <div class="col-sm-8">
      <h4>Записи о сессии</h4>
      <a href="/addSessionRecord" class="btn btn-success">Добавить новую запись</a>
      <table border="1" class="table table-bordered table-striped mt-3">
        <thead class="table-primary">
          <tr>
            <th>№</th>
            <th>Группа</th>
            <th>Семестр</th>
            <th>Дисциплина</th>
            <th>Преподаватель</th>
            <th>Форма отчётности</th>
            <th>Дата</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
        <tr v-for="(el, index) in sessionRecords" :key="el.id">
          <td>{{ index + 1 }}</td>
          <td>{{ el.student_group.name }}</td>
          <td>{{ el.semester }}</td>
          <td>{{ el.teacher_discipline.discipline.name }}</td>
          <td>{{ el.teacher_discipline.teacher.name }}</td>
          <td>{{ el.report_type.name }}</td>
          <td>{{ el.mark_date }}</td>
          <td>
            <button v-on:click="deleteSessionRecord(el.id)" class="btn btn-danger">Удалить</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
    import http from "../../http-common";
  
    export default {
      name: "ListSessionRecord",
      data() {
        return {
          sessionRecords: []
        };
      },
      methods: {
        getSessionRecords() {
          http
              .get("/listSessionRecords")
              .then(response => {
                this.sessionRecords = response.data;
              })
              .catch(e => {
                console.log(e);
              });
        },
        deleteSessionRecord(session_id) {
          http
              .post("/deleteSessionRecord/" + session_id)
              .then(() => {
                this.getSessionRecords(); // обновляем список на странице
              })
              .catch(e => {
                console.log(e);
              });
        }
      },
      mounted() {
        this.getSessionRecords();
      }
    }
  </script>
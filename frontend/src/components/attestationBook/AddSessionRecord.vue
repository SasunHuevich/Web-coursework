<template>
    <div class="col-sm-6">
      <form @submit="addSessionRecord">
        <div class="form-group mb-3">
          <label for="student_group_id">Студенческая группа</label>
          <select v-model="sessionRecord.student_group_id" class="form-select">
            <option v-for="studentGroup in studentGroups" v-bind:key="studentGroup.id" v-bind:value="studentGroup.id">
              {{ studentGroup.name }}
            </option>
          </select>
        </div>
        <div class="form-group mb-3">
          <label for="semester">Номер семестра</label>
          <select v-model="sessionRecord.semester" class="form-select">
            <option v-for="i in 8" :key="i" v-bind:value="i">
              {{ i }}
            </option>
          </select>
        </div>
        <div>
          <label for="teacher_discipline_id">Дисциплина, преподаватель</label>
          <select v-model="sessionRecord.teacher_discipline_id" class="form-select">
            <option v-for="td in teacherDiscipline" v-bind:key="td.teacher_discipline_id" v-bind:value="td.teacher_discipline_id">
              {{ `${td.discipline_name} — ${td.teacher_name}` }}
            </option>
          </select>
        </div>
        <div>
          <label for="report_type_id">Форма отчётности</label>
          <select v-model="sessionRecord.report_type_id" class="form-select">
            <option v-for="reportType in reportTypes" v-bind:key="reportType.id" v-bind:value="reportType.id">
              {{ reportType.name }}
            </option>
          </select>
        </div>
        <div>
          <label for="mark_date">Дата</label>
          <input v-model="sessionRecord.mark_date" type="date" name="mark_date" id="mark_date" required class="form-control">
        </div>
        <div>
          <input type="submit" value="Добавить" class="btn btn-success">
        </div>
      </form>
    </div>
  </template>
  
  <script>
    import http from "../../http-common";
  
    export default {
      data() {
        return {
          sessionRecord: {
            student_group_id: null,
            semester: null,
            teacher_discipline_id: null,
            report_type_id: null,
            mark_date: null
          },
          studentGroups: [],
          teacherDiscipline: [],
          reportTypes: []
        };
      },
      methods: {
        getStudentGroups() {
          http
              .get("/listStudentGroups")
              .then(response => {
                this.studentGroups = response.data;
              })
              .catch(e => {
                console.log(e);
              });
        },
        getTeacherDiscipline() {
          http
              .get("/listTeacherDiscipline")
              .then(response => {
                this.teacherDiscipline = response.data;
              })
              .catch(e => {
                console.log(e);
              });
        },
        getReportTypes() {
          http
              .get("/listReportTypes")
              .then(response => {
                this.reportTypes = response.data;
              })
              .catch(e => {
                console.log(e);
              });
        },
        addSessionRecord(e) {
          e.preventDefault();
          var data = this.sessionRecord;
          http
              .post('/addSessionRecord', data)
              .then(()=> {
                this.$router.push('/listSessionRecord');
              })
              .catch(e => {
                console.log(e);
              });
        }
      },
      mounted(){
        this.getStudentGroups();
        this.getTeacherDiscipline();
        this.getReportTypes();
      }
  };
  </script>
<template>
    <form @sumbit.prevent="updateAttestationBook">
      <table border="1" class="table table-bordered mt-3">
        <thead class="table-primary">
        <tr>
          <th>№</th>
          <th>Дисциплина</th>
          <th>Оценка</th>
          <th>Дата</th>
          <th>Преподаватель</th>
          <th>Форма отчётности</th>
          <th>Действие</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(el, index) in attestationBookForSemester" :key="el.id">
          <td>{{ index + 1 }}</td>
          <td>{{ el.discipline_name }}</td>
          <td>
            <span v-if="el.mark">{{ el.mark }}</span>
            <input
                v-else
                name="mark"
                type="number"
                min="0"
                max="100"
                step="1"
                class="form-control"     
                v-model="Marks[el.id]"        
            />
          </td>
          <td>{{ el.mark_date }}</td>
          <td>{{ el.name }}</td>
          <td>
            {{ el.report_type_name }}
          </td>
          <td>
            <button v-if="Marks[el.id] !== undefined" type="submit" class="btn btn-success" @click="updateAttestationBook(el)">
              Записать оценку
            </button>
            <input
                type="hidden"
                name="attestation_book_id"
                :value="el.id"
            />
          </td>
        </tr>
        </tbody>
      </table>
    </form>
  </template>
  
  <script>
  import http from "../../http-common";
  export default {
    props: ["attestationBookForSemester", "student"],
    data() {
      return {
        Marks: {}
      };
    },
    methods: {
      updateAttestationBook(el) {
        var data = {
          mark: this.Marks[el.id],
          attestation_book_id: el.id
        };
        http  
          .post(`/updateAttestationBook/studentId=${this.student.id}`, data)
          .then(() => {
            this.$router.push(`/attestationBook/studentId=${this.student.id}`)
          })
          .catch(e => {
            console.log(e);
          })
      }
    }
  };
  </script>
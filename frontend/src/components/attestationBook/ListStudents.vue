<template>
    <div>
        <h4>Список студентов</h4>
        <ul class="list-group mt-3">
            <li class="list-group-item" v-for="(student, index) in students" :key="index">
                <router-link :to="{
                    name: 'attestation-book',
                    params: { student_id: student.id}
                }">
                    {{ student.name }}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import http from "../../http-common";
export default {
    name: "attestation-book-students", 
    props: ['student_group_id'],
    data() {
        return {
            students: []
        };
    },
    methods: {
        getStudents() {
            http
                .get("/attestationBook/group/" + this.student_group_id)
                .then(response => {
                    this.students = response.data;
                    console.log(this.students);
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
  
<style></style>
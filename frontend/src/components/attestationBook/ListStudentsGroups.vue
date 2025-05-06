<template>
    <div>
        <h4>Список студенческих групп</h4>
        <ul class="list-group mt-3">
            <li class="list-group-item" v-for="(studentGroup, index) in studentGroups" :key="index">
                <router-link :to="{
                    name: 'attestation-book-students', 
                    params: { student_group_id: studentGroup.id }
                }">
                    {{ studentGroup.name }}
                </router-link>
            </li>
        </ul>
    </div>
</template>
  
<script>
import http from "../../http-common";
export default {
    name: "ListStudentGroups",
    data() {
        return {
            studentGroups: []
        };
    },
    methods: {
        getStudentGroup() {
            http
                .get("/listStudentGroups")
                .then(response => {
                    this.studentGroups = response.data;
                })
                .catch(e => { // запрос выполнен с ошибкой
                    console.log(e);
                });
        }
    },
    mounted() { 
        this.getStudentGroup();
    }
}
</script>
  
<style></style>
<template>
    <div v-if="this.teacher">
        <h4>Преподаватель</h4>
        <div class="col-md-5" v-if="!submitted">
            <form @submit="updateTeacher">
                <div class="form-group mb-3"><input class="form-control" type="text" name="name" id="name" placeholder="ФИО преподавателя" required v-model="teacher.name"></div>
                <div class="form-group mb-3"><input class="btn btn-info" type="submit" value="Обновить"></div>
            </form>
            <button class="btn btn-danger" v-on:click="deleteTeacher()">Удалить</button>
        </div>
        <div v-else>
            <h4>Вы успешно обновили запись</h4>
            <router-link to="/listTeachers">Вернуться к списку учебных дисциплин</router-link>
        </div>
    </div>
    <div v-else>
        <br>
        <p>Выберите преподавателя</p>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "teacher-details",
        props: ['id'],
        data() {
            return {
                teacher: null,
                submitted: false
            };
        },
        methods: {
            getTeacher() {
                http
                    .get("/teacher/" + this.id) 
                    .then(response => { // запрос выполнен успешно
                        this.teacher = response.data;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            updateTeacher(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.teacher.name
                };

                http
                    .post("/updateTeacher/" + this.teacher.id, data)
                    .then(() => { 
                        this.$router.push('/listTeachers'); // переходим к списку учебных дисциплин
                    })
                    .catch(e => {
                        console.log(e);
                    });
                this.submitted = true;
            },
            deleteTeacher() {
                http
                    .post("/deleteTeacher/" + this.teacher.id)
                    .then(() => {
                        this.$router.push('/listTeachers');
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() { // загружаем данные учебной дисциплины
            this.getTeacher();
        }
    }
</script>
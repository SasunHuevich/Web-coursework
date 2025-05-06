<template>
    <div v-if="this.studentGroup">
        <h4>Студенческая группа</h4>
        <div class="col-md-5" v-if="!submitted">
            <form @submit="updateStudentGroup">
                <div class="form-group mb-3"><input class="form-control" type="text" name="name" id="name" placeholder="Название учебной группы" required v-model="studentGroup.name"></div>
                <div class="form-group mb-3"><input class="btn btn-info" type="submit" value="Обновить"></div>
            </form>
            <button class="btn btn-danger" v-on:click="deleteStudentGroup()">Удалить</button>
        </div>
        <div class="col-md-5" v-else>
            <h4>Вы успешно обновили запись</h4>
            <router-link to="/listStudentGroups">Вернуться к списку студенческих групп</router-link>
        </div>
    </div>
    <div v-else>
        <br>
        <p>Выберите студенческую группу</p>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "studentGroup-details",
        props: ['id'],
        data() {
            return {
                studentGroup: null,
                submitted: false
            };
        },
        methods: {
            getStudentGroup() {
                http
                    .get("/studentGroup/" + this.id) // обращаемся к серверу для получения данных студенческой группы, id взят из входных параметров (props)
                    .then(response => { // запрос выполнен успешно
                        this.studentGroup = response.data;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            updateStudentGroup(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.studentGroup.name
                };

                http
                    .post("/updateStudentGroup/" + this.studentGroup.id, data)
                    .then(() => { // при успешном обновлении можно добавить, например, вывод уведомления
                        this.$router.push('/listStudentGroups'); // переходим к списку учебных дисциплин
                    })
                    .catch(e => {
                        console.log(e);
                    });
                this.submitted = true;
            },
            deleteStudentGroup() {
                http
                    .post("/deleteStudentGroup/" + this.studentGroup.id)
                    .then(() => {
                        // переходим к списку студенческих групп (переход по ссылкам программно)
                        this.$router.push('/listStudentGroups');
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() { // загружаем данные учебной дисциплины
            this.getStudentGroup();
        }
    }
</script>
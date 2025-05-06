<template>
    <div v-if="this.discipline">
        <h4>Учебная дисциплина</h4>
        <div class="col-md-5" v-if="!submitted">
            <form @submit="updateDiscipline">
                <div class="form-group mb-3"><input type="text" class="form-control w-100" name="name" id="name" placeholder="Наименование дисциплины" required v-model="discipline.name"></div>
                <div class="mb-3"><input class="btn btn-info" type="submit" value="Обновить"></div>
            </form>
            <div class="form-group mb-3"><button class="btn btn-danger" v-on:click="deleteDiscipline()">Удалить</button></div>
        </div>
        <div v-else>
            <h4>Вы успешно обновили запись</h4>
            <router-link to="/listDisciplines">Вернуться к списку учебных дисциплин</router-link>
        </div>
    </div>
    <div v-else>
        <br>
        <p>Выберите учебную дисциплину</p>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "discipline-details",
        props: ['id'],
        data() {
            return {
                discipline: null,
                submitted: false
            };
        },
        methods: {
            getDiscipline() {
                http
                    .get("/discipline/" + this.id) // обращаемся к серверу для получения данных учебной дисциплины, id взят из входных параметров (props)
                    .then(response => { // запрос выполнен успешно
                        this.discipline = response.data;
                    })
                    .catch(e => { // запрос выполнен с ошибкой
                        console.log(e);
                    });
            },
            updateDiscipline(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.discipline.name
                };

                http
                    .post("/updateDiscipline/" + this.discipline.id, data)
                    .then(() => { // при успешном обновлении можно добавить, например, вывод уведомления
                        this.$router.push('/listDisciplines'); // переходим к списку учебных дисциплин
                    })
                    .catch(e => {
                        console.log(e);
                    });
                this.submitted = true;
            },
            deleteDiscipline() {
                http
                    .post("/deleteDiscipline/" + this.discipline.id)
                    .then(() => {
                        // переходим к списку учебных дисциплин (переход по ссылкам программно)
                        this.$router.push('/listDisciplines');
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
        mounted() { // загружаем данные учебной дисциплины
            this.getDiscipline();
        }
    }
</script>
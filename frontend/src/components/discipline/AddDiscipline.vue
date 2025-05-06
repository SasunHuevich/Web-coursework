<template>
    <div>
        <h4>Добавление учебной дисциплины</h4>
        <div class="col-md-5" v-if="!submitted">
            <!--В @submit указывается обработчик, который выполнится после нажатия на кнопку "Добавить"
            Обработчик addDiscipline определён в script-->
            <form @submit="addDiscipline">
                <!--v-model - директива для связывания данных с элементами.
                Связь происходит при помощи переменных, которые определены в data()-->
                <div class="form-group mb-3"><input class="form-control" type="text" name="name" id="name" placeholder="Наименование дисциплины" required v-model="discipline.name"></div>
                <div class="form-group mb-3"><input class="btn btn-success" type="submit" value="Добавить"></div>
            </form>
        </div>
        <div class="col-md-5" v-else>
            <h4>Вы успешно добавили запись</h4>
            <div class="form-group mb-3">
                <!--В v-on:click указывается обработчик, который выполниться после нажатия на кнопку "Добавить новую учебную дисциплину"
                Обработчик newDiscipline определён в script-->
                <button class="btn btn-success" v-on:click="newDiscipline">Добавить новую учебную дисциплину</button>
            </div>
            <div class="form-group mb-3">
                <router-link class="btn btn-light" to="/listDisciplines">Вернуться к списку учебных дисциплин</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "AddDiscipline",
        data() {
            return {
                discipline: {
                    id: null,
                    name: ""
                },
                submitted: false
            };
        },
        methods: {
            addDiscipline(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.discipline.name
                };
                // Либо var data = this.user;
                http
                    .post("/addDiscipline", data)
                    .then(response => { // запрос выполнился успешно
                        this.discipline.id = response.data.id;
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });

                this.submitted = true;
            },
            newDiscipline() {
                this.submitted = false;
                this.discipline = {
                    id: null,
                    name: ""
                };
            }
        }
    }
</script>
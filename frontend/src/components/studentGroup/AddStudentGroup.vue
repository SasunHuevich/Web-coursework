<template>
    <div>
        <h4>Добавление студенческой группы</h4>
        <div class="col-md-5" v-if="!submitted">
            <!--В @submit указывается обработчик, который выполнится после нажатия на кнопку "Добавить"
            Обработчик addStudentGroup определён в script-->
            <form @submit="addStudentGroup">
                <!--v-model - директива для связывания данных с элементами.
                Связь происходит при помощи переменных, которые определены в data()-->
                <div class="form-group mb-3"><input class="form-control" type="text" name="name" id="name" placeholder="Название студенческой группы" required v-model="studentGroup.name"></div>
                <div class="form-group mb-3"><input class="btn btn-success" type="submit" value="Добавить"></div>
            </form>
        </div>
        <div lass="col-md-5" v-else>
            <h4>Вы успешно добавили запись</h4>
            <div class="form-group mb-3">
                <!--В v-on:click указывается обработчик, который выполниться после нажатия на кнопку "Добавить новую студенческую группу"
                Обработчик newStudentGroup определён в script-->
                <button class="btn btn-success" v-on:click="newStudentGroup">Добавить новую студенческую группу</button>
            </div>
            <div class="form-group mb-3">
                <router-link class="btn btn-light" to="/listStudentGroups">Вернуться к списку студенческих групп</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "AddStudentGroup",
        data() {
            return {
                studentGroup: {
                    id: null,
                    name: ""
                },
                submitted: false
            };
        },
        methods: {
            addStudentGroup(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.studentGroup.name
                };
                // Либо var data = this.user;
                http
                    .post("/addStudentGroup", data)
                    .then(response => { // запрос выполнился успешно
                        this.studentGroup.id = response.data.id;
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });

                this.submitted = true;
            },
            newStudentGroup() {
                this.submitted = false;
                this.studentGroup = {
                    id: null,
                    name: ""
                };
            }
        }
    }
</script>
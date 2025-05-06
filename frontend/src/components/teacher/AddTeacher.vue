<template>
    <div>
        <h4>Добавление преподавателя</h4>
        <div class="col-md-5" v-if="!submitted">
            <!--В @submit указывается обработчик, который выполнится после нажатия на кнопку "Добавить"
            Обработчик addTeacher определён в script-->
            <form @submit="addTeacher">
                <!--v-model - директива для связывания данных с элементами.
                Связь происходит при помощи переменных, которые определены в data()-->
                <div class="form-group mb-3"><input class="form-control" type="text" name="name" id="name" placeholder="ФИО преподавателя" required v-model="teacher.name"></div>
                <div class="form-group mb-3"><input class="btn btn-success" type="submit" value="Добавить"></div>
            </form>
        </div>
        <div class="col-md-5" v-else>
            <h4>Вы успешно добавили запись</h4>
            <div class="form-group mb-3">
                <!--В v-on:click указывается обработчик, который выполниться после нажатия на кнопку "Добавить преподавателя"
                Обработчик newTeacher определён в script-->
                <button class="btn btn-success" v-on:click="newTeacher">Добавить преподавателя</button>
            </div>
            <div class="form-group mb-3">
                <router-link class="btn btn-light" to="/listTeachers">Вернуться к списку преподавателей</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import http from "../../http-common";
    export default {
        name: "AddTeacher",
        data() {
            return {
                teacher: {
                    id: null,
                    name: ""
                },
                submitted: false
            };
        },
        methods: {
            addTeacher(e) {
                e.preventDefault(); // запрет отправки формы, так как обрабатывать будем с помощью методов axios
                var data = {
                    name: this.teacher.name
                };
                // Либо var data = this.user;
                http
                    .post("/addTeacher", data)
                    .then(response => { // запрос выполнился успешно
                        this.teacher.id = response.data.id;
                    })
                    .catch(e => { // при выполнении запроса возникли ошибки
                        console.log(e);
                    });

                this.submitted = true;
            },
            newTeacher() {
                this.submitted = false;
                this.teacher = {
                    id: null,
                    name: ""
                };
            }
        }
    }
</script>
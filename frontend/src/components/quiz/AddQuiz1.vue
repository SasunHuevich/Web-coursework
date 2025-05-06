<template>
    <div class="container mt-5">
        <h1 class="text-center mb-4">Добавить викторину</h1> <!-- Заголовок вынесен над карточкой -->
        <div class="card col-md-6 mx-auto">
            <div class="card-body">
                <div v-if="!submitted">
                    <form @submit="addDiscipline">
                        <div class="form-group mb-3">
                            <label for="name">Наименование викторины</label>
                            <input
                                class="form-control"
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Введите название викторины"
                                required
                                v-model="discipline.name"
                            />
                        </div>
                        <div class="form-group mb-3">
                            <label for="description">Описание викторины</label>
                            <textarea
                                class="form-control"
                                name="description"
                                id="description"
                                placeholder="Введите описание викторины"
                                v-model="discipline.description"
                            ></textarea>
                        </div>
                        <div class="form-group mb-3">
                            <input class="btn btn-success w-100" type="submit" value="Добавить">
                        </div>
                    </form>
                </div>
                <div v-else>
                    <h4>Вы успешно добавили викторину</h4>
                    <div class="form-group mb-3">
                        <button class="btn btn-success w-100" v-on:click="newDiscipline">Добавить новую викторину</button>
                    </div>
                    <div class="form-group mb-3">
                        <router-link class="btn btn-light w-100" to="/listDisciplines">Вернуться к списку викторин</router-link>
                    </div>
                </div>
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
                    name: "",
                    description: "" // Добавлено поле для описания викторины
                },
                submitted: false
            };
        },
        methods: {
            addDiscipline(e) {
                e.preventDefault();
                var data = {
                    name: this.discipline.name,
                    description: this.discipline.description // Отправляем описание
                };
                http
                    .post("/addQuiz1", data)
                    .then(response => {
                        this.discipline.id = response.data.id;
                        // Перенаправление на страницу добавления вопросов
                        this.$router.push(`/addQuestions/${this.discipline.id}`);
                    })
                    .catch(e => {
                        console.log(e);
                    });

                this.submitted = true;
            },
            newDiscipline() {
                this.submitted = false;
                this.discipline = {
                    id: null,
                    name: "",
                    description: "" // Очищаем описание
                };
            }
        }
    }
</script>

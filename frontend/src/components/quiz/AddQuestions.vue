<template>
    <div class="container mt-5">
        <!-- Заголовок -->
        <h4 class="text-center mb-4">Добавление вопросов к викторине</h4>

        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        <form @submit="addQuestion">
                            <!-- Поле для текста вопроса -->
                            <div class="form-group mb-3">
                                <label for="questionText">Текст вопроса:</label>
                                <textarea
                                    class="form-control"
                                    id="questionText"
                                    placeholder="Введите вопрос"
                                    required
                                    v-model="question.text"
                                    rows="2"
                                ></textarea>
                            </div>

                            <!-- Поле для правильного ответа -->
                            <div class="form-group mb-3">
                                <label for="correctAnswer">Правильный ответ:</label>
                                <input
                                    class="form-control"
                                    type="text"
                                    id="correctAnswer"
                                    placeholder="Введите правильный ответ"
                                    required
                                    v-model="question.correctAnswer"
                                />
                            </div>

                            <!-- Поля для неправильных ответов -->
                            <div class="form-group mb-3">
                                <label>Неправильные ответы:</label>
                                <input
                                    class="form-control mb-2"
                                    type="text"
                                    placeholder="Неправильный ответ 1"
                                    required
                                    v-model="question.wrongAnswer1"
                                />
                                <input
                                    class="form-control mb-2"
                                    type="text"
                                    placeholder="Неправильный ответ 2"
                                    required
                                    v-model="question.wrongAnswer2"
                                />
                                <input
                                    class="form-control"
                                    type="text"
                                    placeholder="Неправильный ответ 3"
                                    required
                                    v-model="question.wrongAnswer3"
                                />
                            </div>

                            <!-- Кнопка добавления вопроса -->
                            <div class="form-group mb-3">
                                <input class="btn btn-success w-100" type="submit" value="Добавить вопрос" />
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Список добавленных вопросов -->
                <div v-if="questions.length" class="mt-4">
                    <h5>Список добавленных вопросов:</h5>
                    <ul class="list-group">
                        <li v-for="q in questions" :key="q.id" class="list-group-item">
                            <div class="d-flex justify-content-between align-items-center">
                                {{ q.question_text }}
                                <div>
                                    <button class="btn btn-sm btn-info" @click="showAnswers(q.id)">Показать ответы</button>
                                    <button class="btn btn-sm btn-danger" @click="confirmDelete(q.id)">Удалить</button>
                                </div>
                            </div>

                            <!-- Блок для отображения ответов -->
                            <div v-if="q.showAnswers" class="mt-2">
                                <ul class="list-group list-unstyled">
                                    <li v-for="answer in q.answers" :key="answer.id" 
                                        class="p-2"
                                        :class="{'bg-success text-white': answer.is_correct}">
                                        {{ answer.answer_text }}
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import http from "../../http-common";

export default {
    name: "AddQuestions",
    data() {
        return {
            question: {
                id: null,
                quiz_id: this.$route.params.quizId,
                quetion_id: null,
                text: "",
                correctAnswer: "",
                wrongAnswer1: "",
                wrongAnswer2: "",
                wrongAnswer3: ""
            },
            questions: []
        };
    },
    methods: {
        addQuestion(e) {
            e.preventDefault();
            const data = {
                quiz_id: this.question.quiz_id,
                quetion_id: this.question.id,
                question_text: this.question.text,
                correctAnswer: this.question.correctAnswer,
                wrongAnswer1: this.question.wrongAnswer1,
                wrongAnswer2: this.question.wrongAnswer2,
                wrongAnswer3: this.question.wrongAnswer3
            };

            http
                .post("/addQuestion", data)
                .then(response => {
                    this.question.id = response.data.id;
                    this.resetForm();
                    this.fetchQuestions();
                })
                .catch(e => {
                    console.log(e);
                });
        },

        resetForm() {
            this.question.text = "";
            this.question.correctAnswer = "";
            this.question.wrongAnswer1 = "";
            this.question.wrongAnswer2 = "";
            this.question.wrongAnswer3 = "";
        },

        fetchQuestions() {
            http
                .get(`/getQuestionsByQuizId/${this.question.quiz_id}`)
                .then(response => {
                    this.questions = response.data;
                    this.questions.forEach(q => {
                        q.showAnswers = false;
                        q.answers = [];
                    });
                })
                .catch(e => {
                    console.log(e);
                });
        },

        
        showAnswers(questionId) {
            const question = this.questions.find(q => q.id === questionId);
            if (!question.showAnswers) {
                this.fetchAnswers(questionId, question);
            } else {
                question.showAnswers = !question.showAnswers;
            }
        },

        
        fetchAnswers(questionId, question) {
            http
                .get(`/getAnswersByQuestionId/${questionId}`)
                .then(response => {
                    console.log("Ответы:", response.data);
                    question.answers = response.data;
                    question.showAnswers = true;
                    console.log("Вопрос с ответами:", question);
                })
                .catch(e => {
                    console.log(e);
                });
        },

        
        confirmDelete(questionId) {
            if (confirm("Вы уверены, что хотите удалить этот вопрос?")) {
                http
                    .delete(`/deleteQuestion/${questionId}`)
                    .then(() => {
                        this.fetchQuestions();
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        }
    },
    mounted() {
        
        this.fetchQuestions();
    }
};
</script>

<style scoped>
.list-group-item-success {
    background-color: #d4edda;
    color: #155724;
}
</style>

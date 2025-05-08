<template>
    <div class="container mt-5">
        <h3 class="text-center mb-4">Результаты викторины</h3>

        <div v-if="results.length" class="row justify-content-center">
            <div class="col-md-8">
                <table class="table table-striped table-bordered">
                    <thead class="thead-light">
                        <tr>
                            <th>Имя пользователя</th>
                            <th>Правильные ответы</th>
                            <th>Всего ответов</th>
                            <th>Процент правильных ответов</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="result in results"
                            :key="result.userId"
                            :class="{ 'table-primary': result.userId === currentUserId }"
                        >
                            <td>{{ result.userName }}</td>
                            <td>{{ result.correctAnswers }}</td>
                            <td>{{ result.totalAnswers }}</td>
                            <td>{{ ((result.correctAnswers / result.totalAnswers) * 100).toFixed(2) }}%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div v-else class="text-center">
            <p>Результатов пока нет.</p>
        </div>
    </div>
</template>

<script>
import http from "../../http-common";

export default {
    name: "QuizResults",
    data() {
        return {
            results: [],
            currentUserId: null,
        };
    },
    methods: {
        
        fetchResults() {
            console.log(this.$route.params);
            const quizId = this.$route.params.id;
            console.log(quizId);
            http
                .get(`/results/${quizId}`)
                .then(response => {
                    this.results = response.data.results;
                    this.currentUserId = response.data.currentUserId;
                    console.log("gg");
                    console.log(this.currentUserId);
                })
                .catch(error => {
                    console.log("Ошибка при получении результатов: ", error);
                });
        },
    },
    mounted() {
        this.fetchResults();
    },
};
</script>

<style scoped>

.table {
    margin-top: 20px;
}


.table tbody tr {
    background-color: white;
}


.table-primary {
    background-color: #007bff;
    color: white;
}


.table-bordered {
    border: 1px solid #dee2e6;
}


.thead-light th {
    background-color: #f8f9fa;
    color: #495057;
}


.table tbody tr:hover {
    background-color: #f1f1f1;
}


.table th, .table td {
    border-right: 1px solid #dee2e6;
}

.table th:last-child, .table td:last-child {
    border-right: none;
}
</style>

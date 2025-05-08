import { createWebHistory, createRouter } from "vue-router";
import store from "./store/index";
// импорт компонентов
import ListDisciplines from "./components/discipline/ListDisciplines";
import AddDiscipline from "./components/discipline/AddDiscipline";
import Discipline from "./components/discipline/Discipline";
import ListStudents from "./components/student/ListStudents";
import AddStudent from "./components/student/AddStudent";
import Student from "./components/student/Student";
import ListTeachers from "./components/teacher/ListTeachers";
import Teacher from "./components/teacher/Teacher";
import AddTeacher from "./components/teacher/AddTeacher";
import ListStudentGroups from "./components/studentGroup/ListStudentGroups";
import AddStudentGroup from "./components/studentGroup/AddStudentGroup";
import StudentGroup from "./components/studentGroup/StudentGroup";
import AddTeacherDiscipline from "./components/teacher/AddTeacherDiscipline";
import ListTeacherDiscipline from "./components/teacher/ListTeacherDiscipline"
import AddSessionRecord from "./components/attestationBook/AddSessionRecord";
import ListSessionRecord from "./components/attestationBook/ListSessionRecord";
import AttestationBookGroups from "./components/attestationBook/ListStudentsGroups";
import AttestationBookStudents from "./components/attestationBook/ListStudents";
import AttestationBook from "./components/attestationBook/AttestationBook";
import Login from "./components/authorization/Login";
import Profile from "./components/authorization/Profile";
import Register from "./components/authorization/Register";

import QuizList from "./components/quiz/QuizList.vue";
import AddQuiz from "./components/quiz/AddQuiz.vue";
import AddQuiz1 from "./components/quiz/AddQuiz1.vue";
import AddQuestions from "./components/quiz/AddQuestions.vue";
import MyQuiz from "./components/quiz/MyQuiz.vue";
import Quiz from "./components/quiz/GoQuiz.vue";
import QuizResults from "./components/quiz/QuizResults.vue";

// определяем маршруты
const routes = [
    {
        path: "/quizResults/:id",
        name: "QuizResults",
        component: QuizResults/*,
        meta: {
            title: "Мои викторины"
        }*/
    },

    {
        path: "/quiz/:id",
        name: "GoQuiz",
        component: Quiz/*,
        meta: {
            title: "Мои викторины"
        }*/
    },

    {
        path: "/MyQuiz",
        name: "MyQuiz",
        component: MyQuiz,
        meta: {
            title: "Мои викторины"
        }
    },

    {
        path: "/addQuestions/:quizId",
        name: "AddQuestions",
        component: AddQuestions,
        meta: {
            title: "Добавить вопросы"
        }
    },

    {
        path: "/addQuiz",
        name: "AddQuiz",
        component: AddQuiz,
        meta: {
            title: "Добавить викторину"
        }
    },

    {
        path: "/addQuiz1",
        name: "AddQuiz1",
        component: AddQuiz1,
        meta: {
            title: "Добавить викторину"
        }
    },

    {
        path: "/quizList",
        name: "QuizList",
        component: QuizList,
        meta: {
            title: "Список викторин"
        }
    },

    //Дисциплины
    {
        path: "/listDisciplines", // указание маршрута, по которому будем переходить к списку учебных дисциплин
        name: "disciplines", // имя маршрута
        alias: "/disciplines", // указание дополнительного маршрута
        component: ListDisciplines, // компонент, на основании которого будет отрисовываться страница
        meta: {
            title: "Список учебных дисциплин"
        }
    },
    {
        path: "/addDiscipline",
        name: "add-discipline",
        component: AddDiscipline,
        meta: {
            title: "Добавление учебной дисциплины"
        }
    },
    {
        path: "/discipline/:id",
        name: "discipline-details",
        component: Discipline,
        props: true, // указываем, что компонент Discipline.vue может принимать параметры в адресной строке, например, в path указан id
        meta: {
            title: "Данные учебной дисциплины"
        }
    },
    //Студенты
    {
        path: "/listStudents",
        name: "students",
        alias: "/students",
        component: ListStudents,
        meta: {
            title: "Список студентов"
        }
    },
    {
        path: "/addStudent",
        name: "add-student",
        component: AddStudent,
        meta: {
            title: "Добавление студента"
        }
    },
    {
        path: "/student/:id",
        name: "student-details",
        component: Student,
        props: true,
        meta: {
            title: "Данные студента"
        }
    },
    //Преподаватели
    {
        path: "/listTeachers",
        name: "teachers",
        alias: "/teachers",
        component: ListTeachers,
        meta: {
            title: "Список преподавателей"
        }
    },
    {
        path: "/addTeacher",
        name: "add-teacher",
        component: AddTeacher,
        meta: {
            title: "Добавление преподавателя"
        }
    },
    {
        path: "/teacher/:id",
        name: "teacher-details",
        component: Teacher, 
        props: true, 
        meta: {
            title: "Данные преподавателя"
        }
    },
    {
        path: "/addTeacherDiscipline",
        name: "add-teacher-discipline",
        component: AddTeacherDiscipline,
        meta: {
            title: "Назначение преподавателю учебной дисциплины"
        }
    },
    {
        path: "/listTeacherDiscipline",
        name: "list-teacher-discipline",
        component: ListTeacherDiscipline,
        meta: {
            title: "Учебные дисциплины преподавателей"
        }
    },
    //Студенческие группы
    {
        path: "/listStudentGroups",
        name: "studentGroups",
        alias: "/studentGroups",
        component: ListStudentGroups,
        meta: {
            title: "Список студенческих групп"
        }
    },
    {
        path: "/addStudentGroup",
        name: "add-studentGroup",
        component: AddStudentGroup,
        meta: {
            title: "Добавление студенческой группы"
        }
    },
    {
        path: "/studentGroup/:id",
        name: "studentGroup-details",
        component: StudentGroup,
        props: true,
        meta: {
            title: "Данные студенческой группы"
        }
    },
    //зачетная книжка
    {
        path: "/addSessionRecord",
        name: "add-session-record",
        component: AddSessionRecord,
        meta: {
            title: "Добавление записи о сессии"
        }
    },
    {
        path: "/listSessionRecord",
        name: "list-session-record",
        component: ListSessionRecord,
        meta: {
            title: "Записи о сессиях"
        }
    },
    {
        path: "/attestationBook",
        name: "attestation-book-groups",
        component: AttestationBookGroups,
        meta: {
            title: "Студенческие группы"
        }
    },
    {
        path: "/attestationBook/group/:student_group_id",
        name: "attestation-book-students",
        component: AttestationBookStudents,
        props: true,
        meta: {
            title: "Студенты"
        }
    },
    {
        path: "/attestationBook/studentId=:student_id",
        name: "attestation-book",
        component: AttestationBook,
        props: true,
        meta: {
            title: "Зачётная книжка"
        }
    },
    //регистрация и вход
    {
        path: "/login",
        name: "login-user",
        component: Login,
        meta: {
            title: "Вход в систему"
        }
    },
    {
        path: "/register",
        name: "register-user",
        component: Register,
        meta: {
            title: "Регистрация"
        }
    },
    {
        path: "/profile",
        name: "profile-user",
        component: Profile,
        meta: {
            title: "Профиль пользователя",
            // маршрут защищаем (делаем доступным только авторизованным пользователям)
            requiredAuth: true
        }
    },
];

const router = createRouter({
    history: createWebHistory(), // указываем, что будет создаваться история посещений веб-страниц
    routes, // подключаем маршрутизацию
});

    // указание заголовка компонентам (тега title), заголовки определены в meta
router.beforeEach(async (to, from, next) => {
    // для тех маршрутов, для которых не определены компоненты, подключается только App.vue
    // поэтому устанавливаем заголовком по умолчанию название "Главная страница"
    document.title = to.meta.title || 'Главная страница';

    // проверяем наличие токена и срок его действия
    const auth = await store.getters["auth/isTokenActive"];
    if (auth) {
        return next();
    }
    // если токена нет или его срок действия истёк, а страница доступна только авторизованному пользователю,
    // то переходим на страницу входа в систему (ссылка на /login)
    else if (!auth && to.meta.requiredAuth) {
        const user = JSON.parse(localStorage.getItem("user"));
        await store.dispatch("auth/refreshToken", user)
            .then(() => {
                return next();
            })
            .catch(() => {
                return next({ path: "/login" });
            });
        return next({ path: "/login" });
    }
    return next();
});

export default router;
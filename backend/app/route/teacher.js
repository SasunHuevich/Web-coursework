var { authJwt } = require("../middleware"); 

module.exports = (app) => {

    const teacher = require('../controller/teacher');
    
    app.get('/api/listTeachers', [authJwt.verifyToken], teacher.findAll); //получение списка преподавателей

    app.post('/api/addTeacher', [authJwt.verifyToken], teacher.create); //добавление данных преподавателя

    app.post('/api/updateTeacher/:id', [authJwt.verifyToken], teacher.update); //обновление данных преподавателя

    app.post('/api/deleteTeacher/:id', [authJwt.verifyToken], teacher.delete); //удаление данных преподавателя

    app.get('/api/teacher/:id', [authJwt.verifyToken], teacher.findById); //получение данных преподавателя по id

    app.get('/api/listTeacherDiscipline', [authJwt.verifyToken], teacher.findListDisciplines); //получение информации о том, какие учебные дисциплины ведут преподаватели

    app.post('/api/addTeacherDiscipline', [authJwt.verifyToken], teacher.addTeacherDiscipline); //назначение преподавателю учебной дисциплины

    app.post('/api/deleteTeacherDiscipline/teacherId=:teacher_id/disciplineId=:discipline_id', [authJwt.verifyToken], teacher.deleteTeacherDiscipline); //удаление информации о назначении преподавателю учебной дисциплины  

    app.get('/api/disciplinesNotTeacher/teacherId=:teacher_id', [authJwt.verifyToken], teacher.findDisciplinesNotTeacher); //получение учебных дисциплин, которые не ведёт преподаватель
};
var { authJwt } = require("../middleware");

module.exports = (app) => {

    const student = require('../controller/student');
    
    app.get('/api/listStudents', [authJwt.verifyToken], student.findAll);

    app.post('/api/addStudent', [authJwt.verifyToken], student.create);

    app.post('/api/updateStudent/:id', [authJwt.verifyToken], student.update);

    app.post('/api/deleteStudent/:id', [authJwt.verifyToken], student.delete);

    app.get('/api/student/:id', [authJwt.verifyToken], student.findById);

    //получение студентов по студенческой группе
    app.get('/api/studentsByStudentGroup/studentGroupId=:student_group_id', [authJwt.verifyToken], student.studentsByStudentGroup)

};
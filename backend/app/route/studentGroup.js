var { authJwt } = require("../middleware");
module.exports = (app) => {

    const student_group = require('../controller/studentGroup');
    
    app.get('/api/listStudentGroups', [authJwt.verifyToken], student_group.findAll);

    app.post('/api/addStudentGroup', [authJwt.verifyToken], student_group.create);

    app.post('/api/updateStudentGroup/:id', [authJwt.verifyToken], student_group.update);

    app.post('/api/deleteStudentGroup/:id', [authJwt.verifyToken], student_group.delete);

    app.get('/api/studentGroup/:id', [authJwt.verifyToken], student_group.findById);

};
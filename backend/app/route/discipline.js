var { authJwt } = require("../middleware");

module.exports = (app) => {

    const discipline = require('../controller/discipline');
    
    app.get('/api/listDisciplines', [authJwt.verifyToken], discipline.findAll); //получение списка учебных дисциплин

    app.post('/api/addDiscipline', [authJwt.verifyToken], discipline.create); //добавление данных учебной дисциплины

    app.post('/api/updateDiscipline/:id', [authJwt.verifyToken], discipline.update); //обновление данных учебной дисциплины

    app.post('/api/deleteDiscipline/:id', [authJwt.verifyToken], discipline.delete); //удаление данных учебной дисциплины

    app.get('/api/discipline/:id', [authJwt.verifyToken], discipline.findById); //получение данных учебной дисциплины по id

};
var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
const student_group = require('../model/student_group.js');
var studentGroup = db.student_group;

//получение списка студенческих групп
exports.findAll = (req, res) => {
    studentGroup.findAll()
         .then(objects => {
             globalFunctions.sendResult(res, objects);
         }).catch(err => {
             globalFunctions.sendError(res, err);
         })
 };

 //добавление студенческой группы
 exports.create = (req, res) => {
    studentGroup.create({
        id: req.body.id,
        name: req.body.name
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

//обновление
exports.update = (req, res) => {
    studentGroup.update({
            name: req.body.name
        },
        {
            where: {
                id: req.params.id
            }
        }
    ).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

//удаление
exports.delete = (req, res) => {
    studentGroup.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

//получение студенческой группы по id
exports.findById = (req, res) => {
    studentGroup.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};
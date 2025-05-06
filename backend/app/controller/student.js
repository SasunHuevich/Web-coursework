var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var student = db.student;
var StudentGroup = db.student_group;

//получение списка студентов 
exports.findAll = (req, res) => {
    student.findAll({
        include: [
            {
                model: StudentGroup,
                required: true //INNER JOIN
            }
        ]
    })
         .then(objects => {
             globalFunctions.sendResult(res, objects);
         }).catch(err => {
             globalFunctions.sendError(res, err);
         })
 };

 //добавление студента
 exports.create = (req, res) => {
    student.create({
        id: req.body.id,
        name: req.body.name,
        student_group_id: req.body.student_group_id
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

//обновление
exports.update = (req, res) => {
    student.update({
            name: req.body.name,
            student_group_id: req.body.student_group_id
        },
        {
            where: {
                id: req.params.id,
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
    student.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

//получение данных студента по id 
exports.findById = (req, res) => {
    student.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

//получение студентов по студенческой группе
exports.studentsByStudentGroup = (req, res) => {
    StudentGroup.findAll({
        include: [
            {
                model: student,
                required: true // INNER JOIN
            }
        ],
        where: {
            id: req.params.student_group_id
        }
    })
    .then(objects => {
        globalFunctions.sendResult(res, objects);
    })
    .catch(err => {
        globalFunctions.sendError(res, err);
    })
};
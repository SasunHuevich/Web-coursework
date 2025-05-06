var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var teacher = db.teacher; 
var teacher_discipline = db.teacher_discipline;

exports.findAll = (req, res) => {
    teacher.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.create = (req, res) => {
    teacher.create({
        id: req.body.id,
        name: req.body.name
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.update = (req, res) => {
    teacher.update({
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

exports.delete = (req, res) => {
    teacher.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.findById = (req, res) => {
    teacher.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

//получение информации о том, какие учебные дисциплины ведут преподаватели
exports.findListDisciplines = (req, res) => {
    db.sequelize.query(
        `SELECT teacher.id as teacher_id, teacher.name as teacher_name, discipline.id as discipline_id, discipline.name as discipline_name, teacher_discipline.id as teacher_discipline_id FROM teacher_discipline 
        INNER JOIN discipline ON discipline.id=teacher_discipline.discipline_id
        INNER JOIN teacher ON teacher.id=teacher_discipline.teacher_id;`,
        {
            type: db.sequelize.QueryTypes.SELECT
        })
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

//назначение преподавателю учебной дисциплины
exports.addTeacherDiscipline = (req, res) => {
    teacher_discipline.create({
        teacher_id: req.body.teacher_id,
        discipline_id: req.body.discipline_id
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

//удаление информации о назначении преподавателю учебной дисциплины
exports.deleteTeacherDiscipline = (req, res) => {
    console.log(req.params);
    teacher_discipline.destroy({
        where: {
            teacher_id: req.params.teacher_id,
            discipline_id: req.params.discipline_id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

//получение учебных дисциплин, которые не ведет преподаватель
exports.findDisciplinesNotTeacher = (req, res) => {
    db.sequelize.query(
        `SELECT * FROM discipline
            WHERE NOT EXISTS (
                SELECT * FROM teacher_discipline
                WHERE teacher_id = ? AND teacher_discipline.discipline_id = discipline.id 
            )`,
        {
            type: db.sequelize.QueryTypes.SELECT,
            replacements: [req.params.teacher_id]
        })
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};


var globalFunctions = require('../config/global.functions.js');
var db = require('../config/db.config.js');
var StudentGroupSession = db.student_group_session;
var TeacherDiscipline = db.teacher_discipline;
var Discipline = db.discipline;
var Teacher = db.teacher;
var StudentGroup = db.student_group;
var Student = db.student;
var AttestationBook = db.attestation_book;
var ReportType = db.report_type;

exports.listSessionRecords = (req, res) => {
    StudentGroupSession.findAll({
        include: [
            {
                model: TeacherDiscipline,
                required: true,
                include: [
                    {
                        model: Teacher,
                        required: true
                    },
                    {
                        model: Discipline,
                        required: true
                    }
                ]
            },
            {
                model: StudentGroup,
                required: true
            },
            {
                model: ReportType,
                required: true
            }
        ],
        order: [
            ['student_group_id'],
            ['semester'],
            ['mark_date'],
        ]
    })
    .then(objects => {
        globalFunctions.sendResult(res, objects);
    })
    .catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.listReportTypes = (req, res) => {
    ReportType.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.addSessionRecord = async (req, res) => {

    // все данные добавляем в транзакции
    const t = await StudentGroupSession.sequelize.transaction();

    try {
        const createdSession = await StudentGroupSession.create({
            student_group_id: req.body.student_group_id,
            report_type_id: req.body.report_type_id,
            teacher_discipline_id: req.body.teacher_discipline_id,
            mark_date: req.body.mark_date,
            semester: req.body.semester,
        }, { transaction: t });

        const student_group_session_id = createdSession.id;

        // получаем список студентов
        const students = await Student.findAll({
            where: {
                student_group_id: req.body.student_group_id,
            },
            transaction: t,
        });

        const attestationBookValues = students.flatMap(student => // flatMap нужен для преобразования массива students в набор объектов для добавления в таблицу attestation_book
            [
                {
                    student_id: student.id,
                    student_group_session_id: student_group_session_id
                }
            ]
        );

        // bulkCreate - позволяет добавлять в таблицу сразу несколько записей
        await AttestationBook.bulkCreate(attestationBookValues, { transaction: t });

        await t.commit();

        globalFunctions.sendResult(res, 'Запись о сессии успешно добавлена');

    } catch (err) {
        globalFunctions.sendError(res, err);
    }
};

exports.deleteSessionRecord = (req, res) => {
    StudentGroupSession.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};

exports.student_groups = (req, res) => {
    StudentGroup.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.students_in_group = (req, res) => {
    Student.findAll({
        where: {
            student_group_id: req.params.student_group_id
        }
    })
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.attestationBook = (req, res) => {
    db.sequelize.query(
        `SELECT attestation_book.*, student_group_session.semester, student_group_session.mark_date,
                teacher.name, discipline.name AS discipline_name,
                student_group.name AS student_group_name, report_type.name as report_type_name
                FROM attestation_book
                INNER JOIN student_group_session ON student_group_session.id=attestation_book.student_group_session_id
                INNER JOIN teacher_discipline ON teacher_discipline.id=student_group_session.teacher_discipline_id
                INNER JOIN teacher ON teacher.id=teacher_discipline.teacher_id
                INNER JOIN discipline ON discipline.id=teacher_discipline.discipline_id 
                INNER JOIN student_group ON student_group.id=student_group_session.student_group_id
                INNER JOIN report_type ON report_type.id=student_group_session.report_type_id
                WHERE attestation_book.student_id=?`,
        {
            type: db.sequelize.QueryTypes.SELECT,
            replacements: [req.params.student_id]
        })
        .then(objects => {
            var attestationBook = objects;
            // разделяем записи по курсам и семестрам
            var groupedAttestationBook = attestationBook.reduce((elem, item) => {
                var semester = item.semester;
                var course = Math.ceil(semester / 2);
                // Определяем номер семестра в рамках курса. Если общий номер семестра нечётный, то в рамках курса это первый семестр, иначе второй.
                var semesterCourse = semester % 2 === 1 ? 1 : 2;
                if (elem[course + "," + semesterCourse] == null) {
                    elem[course + "," + semesterCourse] = [];
                }
                elem[course + "," + semesterCourse].push(item);
                return elem;
            }, {});


            globalFunctions.sendResult(res, JSON.stringify(groupedAttestationBook));
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.updateAttestationBook = (req, res) => {
    AttestationBook.update({
            mark: req.body.mark
        },
        {
            where: {
                id: req.body.attestation_book_id
            }
        })
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};


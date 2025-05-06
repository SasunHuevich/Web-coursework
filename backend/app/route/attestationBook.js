var { authJwt } = require("../middleware");
module.exports = (app) => {

    const attestationBook = require("../controller/attestationBook");

    app.get('/api/listSessionRecords', [authJwt.verifyToken], attestationBook.listSessionRecords);

    app.get('/api/listReportTypes', [authJwt.verifyToken], attestationBook.listReportTypes);

    app.post('/api/addSessionRecord', [authJwt.verifyToken], attestationBook.addSessionRecord);

    app.post('/api/deleteSessionRecord/:id', [authJwt.verifyToken], attestationBook.deleteSessionRecord);

    app.get('/api/attestationBook', [authJwt.verifyToken], attestationBook.student_groups);

    app.get('/api/attestationBook/group/:student_group_id', [authJwt.verifyToken], attestationBook.students_in_group);

    app.get('/api/attestationBook/studentId=:student_id', [authJwt.verifyToken], attestationBook.attestationBook);

    app.post('/api/updateAttestationBook/studentId=:student_id', [authJwt.verifyToken], attestationBook.updateAttestationBook);

};
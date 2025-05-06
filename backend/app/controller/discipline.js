var db = require('../config/db.config.js');
var globalFunctions = require('../config/global.functions.js');
var discipline = db.discipline;

exports.findAll = (req, res) => {
    discipline.findAll()
    .then(objects => {
     globalFunctions.sendResult(res, objects);
     })
     .catch(err => {
         globalFunctions.sendError(res, err);
     })
 };

exports.create = (req, res) => {
    console.log(req.body.id);
    discipline.create({
        id: req.body.id,
        name: req.body.name
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
  };

  exports.update = (req, res) => {
    discipline.update({
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
    discipline.destroy({
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
    discipline.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
  };
 
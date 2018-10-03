const express = require('express');
const router = express.Router();
const Controller = require('./controller');

router.route('/')
    .all((req, res, next) => {
        next()
    })
    .get(Controller.getAll)
    .post(Controller.save)
    .put(Controller.updateAll)
    .patch(Controller.patchUpdateAll)
    .delete(Controller.deleteAll);

router.route('/:id')
    .all((req, res, next) => {
        next()
    })
    .get(Controller.getById)
    .post(Controller.saveAtId)
    .put(Controller.updateAtId)
    .patch(Controller.patchUpdateAtId)
    .delete(Controller.deleteAtId);

module.exports = router;
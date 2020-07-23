const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { newTask, updateStatus, deleteTask } = require('../controllers/tasks');


router.post('/tasks/new', [
  check('task').not().isEmpty().trim().escape().withMessage('El campo Tarea no puede estar vacio.')
], newTask);

router.route('/tasks/:id')
  .delete(deleteTask)
  .patch(updateStatus)

module.exports = router;
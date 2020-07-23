const { validationResult } = require('express-validator');
const Task = require('../models/Task');
const Project = require('../models/Project');


const newTask = async (req, res, next) => {
  const errors = validationResult(req).errors
  if (!errors.length) {
    try {
      const result = await Task.create({name: req.body.task, projectId: req.body.projectId});
      if (!result) next();
      res.redirect(`/projects/${req.body.projectId}`);
    } catch (err) {
      console.log(err);
    }
  } else {
    const projects = await Project.findAll();
    const project = await Project.findByPk(req.body.projectId);
    res.render('project', {
      pageTitle: "Nuevo Proyecto",
      mainTitle: "Nuevo Proyecto",
      errors, 
      projects,
      project
    })
  }
}

const updateStatus = async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);
    task.status = !task.status
    const result = await task.save()

    if (!result) return next()

    res.status(200).send('ok')
  } catch (err) {
    console.log(err)
  }
}

const deleteTask = async (req, res, next) => {
  const result = await Task.destroy({where: {id: req.params.id}})
  if (!result) return next;
  res.status(200).send('ok');
}

module.exports = {
  newTask,
  updateStatus,
  deleteTask
}
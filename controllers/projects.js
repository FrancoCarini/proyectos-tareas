const Project = require('../models/Project');
const { validationResult } = require('express-validator');
const Task = require('../models/Task');

const newProject = async (req, res) => {
  const projects = await Project.findAll();

  res.render('new', {
    pageTitle: "Nuevo Proyecto",
    mainTitle: "Nuevo Proyecto",
    projects
  });
}

const addProject = async (req, res) => {
  const errors = validationResult(req).errors
  if (errors.length) {
    const projects = await Project.findAll();
    res.render('new', {
      pageTitle: "Nuevo Proyecto",
      mainTitle: "Nuevo Proyecto",
      errors, projects
    })
  } else {
    const {nombre} = req.body;
    const userId = res.locals.user.id
    await Project.create({name: nombre, userId})
    res.redirect('/');
  }
}

const projectHome = async (req, res) => {
  const userId = res.locals.user.id
  const projects = await Project.findAll({
    where: {userId}
  });

  res.render('index', {
    pageTitle: "Proyectos",
    projects
  })
}

const viewProject = async(req, res, next) => {
  const projects = await Project.findAll();

  const project = await Project.findByPk(req.params.id, {
    include: [{
      model: Task
    }]
  })

  if (!project) return next()

  res.render('project', {
    pageTitle: "Tareas",
    mainTitle: "Tareas proyecto",
    project,
    projects
  })
}

module.exports = {
  newProject,
  addProject,
  projectHome,
  viewProject
}
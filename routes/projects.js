const express = require('express')
const router = express.Router()
const { body } = require('express-validator/check')
const { 
  newProject, 
  addProject, 
  projectHome, 
  viewProject } = require('../controllers/projects');

const { isUserAuth } = require('../middleware/isAuth')

router.get('/', isUserAuth, projectHome)
router.get('/new', isUserAuth,newProject)
router.post('/new',[
  body('nombre').not().isEmpty().trim().escape().withMessage('El campo nombre no puede estar vacio.')
],addProject)
router.get('/projects/:id', viewProject)

module.exports = router
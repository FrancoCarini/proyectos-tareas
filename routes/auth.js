const express = require('express');
const router = express.Router();
const { authUser, initSessionForm, closeSession } = require('../controllers/auth');

router.route('/init-session')
  .get(initSessionForm)
  .post(authUser)

router.get('/close-session', closeSession)  

module.exports = router;
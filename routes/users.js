const express = require('express');
const router = express.Router();
const { 
  newUserForm, 
  createUser, 
  recoverForm, 
  sendToken, 
  resetPasswordForm,
  resetPassword } = require('../controllers/users');

router.route('/users/new')
  .get(newUserForm)
  .post(createUser)

router.route('/users/recover')
  .get(recoverForm)
  .post(sendToken)

router.route('/users/reset/:token')
  .get(resetPasswordForm)
  .post(resetPassword)

module.exports = router;
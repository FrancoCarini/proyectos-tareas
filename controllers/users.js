const User = require('../models/User')

const crypto = require('crypto');
const bcrypt = require('bcrypt');

const { Op } = require("sequelize");

const sendEmail = require('../utils/sendEmail')

const newUserForm = async (req, res) => {
  res.render('users/new', {
    pageTitle: "Nuevo Usuario",
    mainTitle: "Nuevo Usuario",
    layout: false
  });
}

const createUser = async (req, res) => {
  const {email, password} = req.body
  try {
    await User.create({
      email,
      password
    })
    res.redirect('/users/init');
  } catch (error) {
    req.flash('error', error.errors.map(error => error.message))

    res.render('users/new', {
      pageTitle: "Nuevo Usuario",
      mainTitle: "Nuevo Usuario",
      layout: false,
      messages: req.flash(),
      email,
      password
    });
  }
}

const recoverForm = (req, res) => {
  res.render('users/recover', {
    pageTitle: "Recuperar Usuario",
    mainTitle: "Recuperar Usuario",
    layout: false
  });
}

const sendToken = async (req, res) => {
  // Verify that user exists
  const {email} = req.body
  const user = await User.findOne({
    where: {email}
  })

  if (!user) {
    req.flash('error', "No existe esa cuenta")
    res.render('users/recover', {
      pageTitle: "Recuperar Usuario",
      mainTitle: "Recuperar Usuario",
      layout: false,
      messages: req.flash()
    });
  }

  // User exists
  // Token gen and expiration
  user.token = crypto.randomBytes(20).toString('hex')
  user.expiration = Date.now() + 3600000

  // Save user into db
  await user.save()

  // Generate token reset password url
  const resetUrl = `http://${req.headers.host}/users/reset/${user.token}`

  try {
    await sendEmail({
      email,
      subject: 'Password reset token',
      message: resetUrl
    })
    
    req.flash('ok', 'Se ha enviado el email para reset de password')
  } catch (err) {
    req.flash('error', 'No se ha podido enviar el email')
  }
  res.redirect('/init-session')
}

const resetPasswordForm = (req, res) => {
  const user = User.findOne({
    where: {
      token: req.params.token
    }
  })

  // User does not exist send back to recover view with error
  if (!user) {
    req.flash('error', 'No valido')
    res.redirect('/users/recover')
  }

  res.render('users/reset', {
    pageTitle: "Reset Password",
    mainTitle: "Reset Password",
    layout: false
  })
}

const resetPassword = async (req, res) => {
  // Verify valid token and its expiration date
  const user = await User.findOne({
    where: {
      token: req.params.token,
      expiration: {
        [Op.gte]: Date.now()
      }
    }
  })

  // THe does not exist or expired
  if (!user) {
    req.flash('error', "No valido")
    res.redirect('/users/recover')
  }

  // Hash the new password
  user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  user.token = null
  user.expiration = null
  await user.save()

  req.flash('ok', 'Tu password se ha modificado correctamente')
  res.redirect('/init-session')
}

module.exports = {
  newUserForm,
  createUser,
  recoverForm,
  sendToken, 
  resetPasswordForm,
  resetPassword
}
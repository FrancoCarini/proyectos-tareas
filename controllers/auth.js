const passport = require('passport')

const authUser = (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/init-session',
      failureFlash: true,
      badRequestMessage: 'Both Fields are required'
    })(req, res, next)
}

const initSessionForm = async (req, res) => {
  res.render('auth/initSession', {
    pageTitle: "Init Session",
    layout:false
  })
}

const closeSession = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/init-session')
  });
}

module.exports = {
  authUser,
  initSessionForm,
  closeSession
}
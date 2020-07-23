const passport = require('passport')

const isUserAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  return res.redirect('/init-session')
}

module.exports = {
  isUserAuth
}
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/User')


passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async(email, password, done) => {
      try {
        const user = await User.findOne({
          where: {email}
        })
        
        // Users exists but pass does not match
        if (!user.verifyPassword(password)) {
          return done(null, false, {
            message: 'User does not exist or password does not match'
          })
        }

        // Email exists and password is ok
        return done(null, user)
      } catch (error) {
        // User does not exists
        return done(null, false, {
          message: 'User does not exist or password does not match'
        })
      }
    }
  )
)

// Serialize User
passport.serializeUser((user, callback) => {
  callback(null, user)
})

// Deserialize User
passport.deserializeUser((user, callback) => {
  callback(null, user)
})

module.exports = passport
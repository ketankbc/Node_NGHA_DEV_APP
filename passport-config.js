const localStrategy = require('passport-local').Strategy

function initialize(passport, getUserByEmail, getUserById) {
  console.log('Inside initializePassport')
  const authenticateUser =  (username, password, done) => {
    const user = getUserByEmail(username)
    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
    }

    try {
      if (password== user.password) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new localStrategy({ usernameField: 'username' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports = initialize
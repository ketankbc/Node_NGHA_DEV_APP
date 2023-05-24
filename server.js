if (process.env.NODE_ENV !== 'PROD') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')
const initializePassport = require('./passport-config')
const methodOverride = require('method-override')
const path = require("path")
app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
)
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
)

initializePassport(
  passport,
  username => users.find(user => user.username === username),
  id => users.find(user => user.id === id)

)

const users = []

app.set('view-engine', 'ejs')  //not req i guess 
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({

  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}

))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/',checkAuthenticated, (req, resp) => {

  resp.render('index.ejs', { name: req.user.username })

})

app.get('/login', checkNotAuthenticated,(req, resp) => {

  resp.render('login.ejs')

})

app.post('/login',checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}
)
)

app.get('/register', checkNotAuthenticated,(req, res) => {
  res.render('register.ejs')
})


app.post('/register', checkNotAuthenticated,(req, res) => {
  try {
    const hashedPassword = req.body.password
    users.push({
      id: Date.now().toString(),
      username: req.body.username,
      // email: req.body.email,
      password: hashedPassword
    })
    console.log(users)
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})


app.delete('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});



function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log('already logged in')
    return res.redirect('/')
  }
  next()
}

app.listen(3002)



//https://www.youtube.com/watch?v=-RCnNyD0L-s&ab_channel=WebDevSimplified
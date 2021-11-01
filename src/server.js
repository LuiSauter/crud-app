const express = require('express')
const logger = require('./loggerMiddleware')
const cors = require('cors')
const exphbs = require('express-handlebars')
const path = require('path')
// const morgan = require('morgan')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')

// Initializations
const app = express()
require('./config/passport')

// Settings
app.set('port', process.env.PORT || 8000)
app.set('views', path.join(__dirname, 'views')) // get url file
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}))
app.set('view engine', '.hbs')

// Middlewares
app.use(cors())
app.use(express.json())
app.use(logger)
// app.use(express.urlencoded({extended: false})) // convert to json
// app.use(morgan('dev'))
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// Global Variables
app.use((req, res, next) => {
  res.locals.error = req.flash('error')
  res.locals.user = req.user || null
  next()
})
// Routes
app.use(require('./routes/index.routes'))
app.use(require('./routes/notes.routes'))
app.use(require('./routes/users.routes'))

// Static Files
// app.use(express.static(path.join(__dirname, 'public'))) // file public

module.exports = app

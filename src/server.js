const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
// Initializations
const app = express()

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
app.use(express.urlencoded({extended: false})) // convert to json

// Global Variables

// Routes
app.use(require('./routes/index.routes'))

// Static Files
app.use(express.static(path.join(__dirname, 'public'))) // file public

module.exports = app

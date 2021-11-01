const UserCtrl = {}
const User = require('../models/User')
const passport = require('passport')

UserCtrl.signup = async (req, res) => {
  const { name, email, password, confirm_password } = req.body
  const newUser = {
    email,
    password,
  }
  if (password !== confirm_password) {
    newUser.confirm_password = confirm_password
    newUser.name = name
    newUser.message = 'Passwords do not match'
    return res.status(400).json(newUser)
  }
  if (password.length < 4) {
    newUser.confirm_password = confirm_password
    newUser.name = name
    newUser.message = 'Passwords must be at least 4 characters'
    return res.status(400).json(newUser)
  }

  const emailUser = await User.findOne({ email: email })
  if (emailUser) {
    newUser.confirm_password = confirm_password
    newUser.name = name
    newUser.message = 'The email is already in use.'
    return res.status(400).json(newUser)
  }
  const newObjectUser = new User({ name, email, password })
  newObjectUser.password = await newObjectUser.encryptPassword(password)
  await newObjectUser.save()

  console.log('**********SIGNUP**********')
  console.log(newObjectUser)
  console.log('**********SIGNUP**********')
  newUser.message = 'Signup Successfuly!'
  res.send(newUser)
}

// UserCtrl.signin = async (req, res) => {
//   const { email, password } = req.body
//   console.log('**********SIGNIN**********')
//   console.log(req.body)
//   console.log('**********SIGNIN**********')
//   res.send('signup ok!')
// }

UserCtrl.signin = passport.authenticate('local', {
  successMessage: 'Login ok!', failureMessage: 'error !!!' ,failureFlash: true
}), (req, res) => {

  console.log('**********SIGNIN**********')
  console.log('holis!!!')
  console.log(res.locals.error)
  console.log('**********SIGNIN**********')
  res.json({ message: 'Authentication ok!'})
}

UserCtrl.logout = async (req, res) => {
  req.logout()
  res.json({ message: 'You are logged out now.'})
}

module.exports = UserCtrl
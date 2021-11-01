const { Router } = require('express')
const router = Router()
// const passport = require('passport')

const { signup, signin, logout } = require('../controllers/users.controllers')

router.post('/users/signup', signup)
router.post('/users/signin', signin)
router.get('/users/logout', logout)

module.exports = router

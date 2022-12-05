const express = require('express')

const {loginfunc, signupfunc} = require('../contollers/usercontroller')

const router = express.Router()

//login route
router.post('/login', loginfunc)

//signup route
router.post('/signup', signupfunc)

module.exports = router
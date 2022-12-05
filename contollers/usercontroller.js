const usersmodel = require('../models/usermodel')
const jwt = require('jsonwebtoken')

const createtoken = (_id) => {
   return jwt.sign({_id},process.env.SECRET,{expiresIn: '1d'})
}

//login function
const loginfunc = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await usersmodel.login(email, password)

        //create token
        const token = createtoken(user._id)
        const username = user.username

        res.status(200).json({username, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//signup function
const signupfunc = async (req, res) => {
    const { username, email, password } = req.body
    
    try {
        const user = await usersmodel.signup(username, email, password)

        //create token
        const token = createtoken(user._id)

        res.status(200).json({username, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {loginfunc, signupfunc}
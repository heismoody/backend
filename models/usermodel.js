const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userschema = new Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
})

// static signup method
userschema.statics.signup = async function (username, email, password) {

    //validation
    if (!email || !password) {
        throw Error("All field must be filled")
    }
    if (!validator.isEmail(email)) {
        throw Error('Enter a Valid email')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enougn')
    }
    
    const exist = await this.findOne({ email })
    if (exist) {
        throw Error('Email already in use')
    }

    //creating salt
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ username, email, password: hash })

    return user
    
}

//static login method
userschema.statics.login = async function (email, password) {

    //validation
    if (!email || !password) {
        throw Error("All field must be filled")
    }

    const userexist = await this.findOne({ email })

    if (!userexist) {
        throw Error('User does not exist')
    }

    const match = await bcrypt.compare(password, userexist.password)

    if (!match) {
        throw Error('Incorrect password')
    }
    
    return userexist
}

module.exports = mongoose.model('usersmodel', userschema)

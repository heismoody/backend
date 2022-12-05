const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reqmovschema = new Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
    
}, { timestamps: true })



module.exports = mongoose.model('reqmovie',reqmovschema)
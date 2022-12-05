const mongoose = require('mongoose')

const Schema = mongoose.Schema

const listschema = new Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    movieid: {
        type: String,
        required: true
    },
    posterurl: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('listmodel', listschema)

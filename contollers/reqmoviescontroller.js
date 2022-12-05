const { default: mongoose } = require('mongoose')
const requestmovie = require('../models/reqmovmodel')

//welcome to the movie api function
const welcome = (req, res) => {
    res.json({mssg: 'welcome to the movie request api'})
}


//posting a movie function
const postmovie = async (req, res) => {
    const { title, genre, year } = req.body
    
    //post it to the db
    try {
        const user_id = req.user._id
        const moviecreate = await requestmovie.create({ title, genre, year, user_id })
        res.status(200).json(moviecreate)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//Get all movies function
const getallmovies = async (req, res) => {
    const user_id = req.user._id

    const movies = await requestmovie.find({ user_id }).sort({ createdAt: -1 })
    res.status(200).json(movies)
}

//delete a ceertain requested movie
const deletemovie = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Id for the movie is not valid'})
    }
    
    const delmovie = await requestmovie.findOneAndDelete({ _id: id })

    if (!delmovie) {
        res.status(400).json({error: 'No such movie in the database'})
    }
    res.status(200).json(delmovie)
}

//update a requested movie
const updatemovie = async (req, res) => {
    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Id for the movie is not valid'})
    }

    const upmovie = await requestmovie.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!upmovie) {
        res.status(400).json({error: 'No such movie in the database'})
    }
    res.status(200).json(upmovie)
}

module.exports = {
    postmovie,
    getallmovies,
    deletemovie,
    updatemovie,
    welcome
}
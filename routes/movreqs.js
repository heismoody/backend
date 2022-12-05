const express = require('express')
const {
    postmovie,
    getallmovies,
    deletemovie,
    updatemovie,
    welcome
} = require('../contollers/reqmoviescontroller')

const requireAuth = require('../middleware/requireAuth')


const router = express.Router()

//Require auth for all workout routes
router.use(requireAuth)

//WELCOMING TO THE REQUEST MOVIE API
router.get('/', welcome)

//GET ALL REQUESTED MOVIES TO THE ADMIN
router.get('/allmovies', getallmovies)

//POST API FOR REQUESTING A MOVIE
router.post('/', postmovie)

//DELETE API FOR REQUESTING A MOVIE
router.delete('/:id', deletemovie)

//UPDATE API FOR THE REQUESTED MOVIE
router.patch('/:id', updatemovie)

module.exports = router
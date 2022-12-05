const express = require('express')

const { addtolist, deletefromlist, getall } = require('../contollers/listcontroller')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//Require auth for all workout routes
router.use(requireAuth)

//endpoint to post movie to download list
router.post('/entertolist', addtolist)

//endpoint to delete movie in download list
router.delete('/deleteinlist/:id', deletefromlist)

//endpoint to get all downloadlist 
router.get('/wholelist', getall)

module.exports = router
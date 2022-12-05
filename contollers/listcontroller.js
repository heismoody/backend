const listmodel = require('../models/listmodel')

//add movie to the list
const addtolist = async (req, res) => {
    const { title, year, movieid, posterurl } = req.body
    
    try {
        const userid = req.user._id
        const existing = await listmodel.findOne({ movieid, userid })
        if (existing) {
            throw Error('This movie exists in your list')
        }
        
        const addto = await listmodel.create({ title, year, userid, movieid, posterurl })
        res.status(200).json(addto)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//delete movie from the list
const deletefromlist = async (req, res) => {
    const { id } = req.params

    try {
        //Deleting movie from the list in the database
        const deletemovie = await listmodel.findOneAndDelete({ _id: id })
        res.status(200).json(deletemovie)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//get all movies from the list
const getall = async (req, res) => {
    const userid = req.user._id
    const graball = await listmodel.find({ userid }).sort({ createdAt: -1 })
    
    res.status(200).json(graball)
}

module.exports = {addtolist, deletefromlist, getall}
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const movreqrouter = require('./routes/movreqs')
const userRouter = require('./routes/userRoute')
const listRouter = require('./routes/listroute')

const mongoose = require('mongoose')

//express app
const movieapp = express()

//using cors
movieapp.use(cors())

//middleware
movieapp.use(express.json())

movieapp.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
movieapp.use('/api/requestmovie', movreqrouter)
movieapp.use('/api/user', userRouter)
movieapp.use('/api/downloadlist', listRouter)

//Connect to the database
mongoose.connect(process.env.MONGO_PASS)
    .then(() => { 
        //listen for request
        movieapp.listen(process.env.PORT, () => {
        console.log("connected to db and listening on port 4000")
        })
    })
    .catch((error) => {
        console.log(error)
    })


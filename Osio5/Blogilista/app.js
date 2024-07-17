const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const middleware = require('./utils/middleware')
//app.use(middleware.tokenExtractor);
//app.use(middleware.userExtractor);
const blogsRouter = require('./controllers/blogsController')
const usersRouter = require('./controllers/usersController')
const loginRouter = require('./controllers/loginController')
const testRouter = require('./controllers/testingController')
const mongoose = require('mongoose')

require('dotenv').config()

const mongoUrl = process.env.MONGO_URI
mongoose
  .connect(mongoUrl)
  .then((result) => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
app.use(cors())
app.use(express.json())
app.use('/api/blogs', middleware.tokenExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/testing', testRouter)
app.use(middleware.errorHandler)

module.exports = app

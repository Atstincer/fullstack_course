const config = require('./utils/config')
const express = require('express')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogs')
const customMiddleware = require('./utils/middleware')

const app = express()

logger.info('connecting to MongoDB')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error conectando con MongoDB',error.message)
  })

app.use(express.json())
app.use(customMiddleware.requestLogger)

app.use('/api/blogs',blogRouter)

app.use(customMiddleware.unknownEndPoint)
app.use(customMiddleware.errorHandler)

module.exports = app
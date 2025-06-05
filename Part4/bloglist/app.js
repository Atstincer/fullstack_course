const config = require('./utils/config')
const express = require('express')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const loginRouter = require('./controllers/longin')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const customMiddleware = require('./utils/middleware')

const app = express()

logger.info('connecting to MongoDB')

if(process.env.NODE_ENV === 'test'){
  console.log('connecting to MongoDB')
}

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
    if(process.env.NODE_ENV === 'test'){
      console.log('connected to MongoDB')
    }
  })
  .catch(error => {
    logger.error('error conectando con MongoDB',error.message)
    if(process.env.NODE_ENV === 'test'){
      console.log('error conectando con MongoDB',error.message)
    }
  })

app.use(express.json())
app.use(customMiddleware.requestLogger)
app.use(customMiddleware.tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/blogs', customMiddleware.userExtractor, blogRouter)
app.use('/api/users', userRouter)

if(process.env.NODE_ENV === 'test'){
  const endToEndTestsRouter = require('./controllers/endtoendtests')
  app.use('/api/testing', endToEndTestsRouter)
}

app.use(customMiddleware.unknownEndPoint)
app.use(customMiddleware.errorHandler)

module.exports = app
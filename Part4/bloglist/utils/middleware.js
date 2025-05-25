const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request,response,next) => {
  logger.info('Method:', request.method)
  logger.info('Path:', request.path)
  logger.info('Body:', request.body)
  logger.info('----')
  next()
}

const unknownEndPoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint'})
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if(error.name === 'CastError'){
    return response.status(400).send({ error: 'malformatted id'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message})
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({error: '`username` must be unique'})
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token'})
  }
  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorizacion = request.get('authorization')
  if(authorizacion && authorizacion.startsWith('Bearer ')){
    request.token = authorizacion.replace('Bearer ', '')
  }
  next()
}

const userExtractor = async (request, response, next) => {
  if(request.token){
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(decodedToken.id){
      const user = await User.findById(decodedToken.id)
      if(user) {
        request.user = user
      }
    }
  }
  next()
}

module.exports = {
  requestLogger,
  unknownEndPoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}
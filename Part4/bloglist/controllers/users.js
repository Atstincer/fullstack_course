const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!password || password.length === 0) {
    return response.status(400).json({ error: 'missing password' })
  }
  if (password.length < 3) {
    return response.status(400).json({ error: 'password too short' })
  }
  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    username,
    passwordHash,
    name
  })

  const userSaved = await user.save()
  response.status(201).json(userSaved)
})

userRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

module.exports = userRouter
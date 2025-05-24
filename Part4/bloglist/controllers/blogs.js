const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const user0 = (await User.find({}))[0]
  if(!user0) {
    return response.status(404).json({error: 'user not found'})
  }
  console.log('user0:',user0)
  const { title, author, url, likes } = request.body
  const blog = new Blog({
    title, author, url, likes,
    user: user0._id
  })
  const blogSaved = await blog.save()
  user0.blogs = user0.blogs.concat(blogSaved._id)
  await user0.save()
  
  response.status(201).json(blogSaved)
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const blogInDB = await Blog.findById(request.params.id)
  if(!blogInDB) return response.status(404).end()
  blogInDB.title = title
  blogInDB.author = author
  blogInDB.url = url
  blogInDB.likes = likes

  const blogUpdated = await blogInDB.save()
  response.json(blogUpdated)
})

module.exports = blogRouter
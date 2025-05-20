const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const result = await blog.save()
  response.status(201).json(result)
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
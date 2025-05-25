const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

/*const getStringToken = request => {
  const authorization = request.get('authorization')
  if(authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}*/

blogRouter.post('/', async (request, response) => {
  const user = request.user
  if(!request.user) {
    return response.status(401).json({error: 'invalid token' })
  }
  //console.log('user trying to add a blog:', user)
  const { title, author, url, likes } = request.body
  const blog = new Blog({
    title, author, url, likes,
    user: user._id
  })
  const blogSaved = await blog.save()
  user.blogs = user.blogs.concat(blogSaved._id)
  await user.save()
  
  response.status(201).json(blogSaved)
})

blogRouter.delete('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if(!blog) {
    return response.status(400).json({ error: 'blog not found or invalid id'})
  }
  const user = request.user
  if(!user){
    return response.status(401).json({ error: 'invalid token' })
  }
  if(blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'blog cannot be deleted...unauthorized user'})
  }
  user.blogs = user.blogs.filter(id => id.toString() !== blog._id.toString())
  user.save()
  
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
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
const mongoose = require('mongoose')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
//const User = require('../models/user')
//const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const user = request.user
  if (!request.user) {
    return response.status(401).json({ error: 'invalid token' })
  }
  //console.log('user trying to add a blog:', user)
  const { title, author, url, likes } = request.body
  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id
  })
  const blogSaved = await blog.save()
  user.blogs = user.blogs.concat(blogSaved._id)
  await user.save()

  const mongooseQueryObject = await Blog.find({
    _id: mongoose.Types.ObjectId.createFromHexString(blogSaved.id)
  }).populate('user', { username: 1, name: 1 })
  //console.log('blog found', mongooseQueryObject)

  response.status(201).json(mongooseQueryObject[0])
})

blogRouter.delete('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(400).json({ error: 'blog not found or invalid id' })
  }
  const user = request.user
  //console.log('blog found in backend:', blog)
  //console.log('user found in backend:', user)
  if (!user) {
    return response
      .status(401)
      .json({ error: 'invalid token...user not found' })
  }
  if (blog.user.toString() !== user._id.toString()) {
    return response
      .status(401)
      .json({ error: 'blog cannot be deleted...unauthorized user' })
  }
  //console.log('user.blogs before removing:', user.blogs)
  user.blogs = user.blogs.filter(id => id.toString() !== blog._id.toString())
  //console.log('user.blogs after removing:', user.blogs)
  await user.save()

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  /*const userR = request.user
  if(!userR){
    return response.status(401).json({ erro: 'invalid token'})
  }*/
  const { title, author, url, likes, user } = request.body
  const blogInDB = await Blog.findById(request.params.id)
  /*if(userR._id.toString() !== blogInDB.user.toString()){
    return response.status(401).json({ error: 'blog cannot be updated...unauthorized user' })
  }*/
  if (!blogInDB) return response.status(404).end()
  blogInDB.title = title
  blogInDB.author = author
  blogInDB.url = url
  blogInDB.likes = likes
  blogInDB.user = user.id

  const blogUpdated = await blogInDB.save()
  response.json(blogUpdated)
})

blogRouter.post('/:id/comments', async (request, response) => {
  const { comment } = request.body
  const blog = await Blog.findById(request.params.id)
  blog.comments.push(comment)
  await blog.save()
  response.json(blog)
})

module.exports = blogRouter

const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const dummyList = require('./dummyData')
const testHelper = require('./test_helper')
const bcrypt = require('bcrypt')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  //await Blog.insertMany(dummyList.blogs)
})

test('all blogs are returned', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, dummyList.blogs.length)
})

test('identifier field of blog post is id', async () => {
  const response = await api
    .get('/api/blogs')
  const blogs = response.body
  for (let index in blogs) {
    const k = Object.keys(blogs[index])
    assert(k.includes('id') && !k.includes('_id'))
    //assert(!k.includes('_id'))
  }
})

describe('adding new blogs with token-based authentication', async () => {
  const getValidToken = async () => {
    await User.deleteMany()
    const username = 'pedrogh'
    const name = 'Pedro'
    const password = '1234'
    await api
      .post('/api/users')
      .send({ username, name, password })
    const result = await api
      .post('/api/login')
      .send({ username, password })
    //console.log('result.body.token:', result.body.token)
    return `Bearer ${result.body.token}`
  }

  const validToken = await getValidToken()

  test.only('adding a blog wit a valid token returns 201 created', async () => {
    const newBlog = {
      title: 'Mis manualidades',
      author: 'Pedro Garcia Hdez',
      url: 'https://pepito.com/Mi_blog.pdf',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .set('Authorization', validToken)
      .send(newBlog)
      .expect(201)
  })

  test.only('post request without title returns status 400', async () => {
    const blogWithoutTitle = {
      author: 'Diana L HS',
      url: 'https://dlhs.com/Mi_blog.pdf',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', validToken)
      .send(blogWithoutTitle)
      .expect(400)
  })

  test.only('post request without url returns status 400', async () => {
    const blogWithoutUrl = {
      title: 'Mis manualidades',
      author: 'Diana L HS',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', validToken)
      .send(blogWithoutUrl)
      .expect(400)
  })

  test.only('adding new blog without token returns 401 unauthorized', async () => {
    const newBlog = {
      title: 'Mis manualidades',
      author: 'Pedro Garcia Hdez',
      url: 'https://pepito.com/Mi_blog.pdf',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
})



test('likes default value is 0', async () => {
  const newBlog = {
    title: 'Mis manualidades',
    author: 'Diana L HS',
    url: 'https://dlhs.com/Mi_blog.pdf'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)

  const respuesta = await api.get('/api/blogs')
  const blog = respuesta.body.find(b => b.title === 'Mis manualidades')
  //console.log('blog', blog)
  assert(blog.likes === 0)
})


describe('deleting a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await testHelper.blogsInDB()
    const blogToDelete = blogsAtStart[0]
    //console.log('blogs', blogs)
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAfterDelete = await testHelper.blogsInDB()
    assert(blogsAfterDelete.length === blogsAtStart.length - 1)

    const titles = blogsAfterDelete.map(b => { b.title })
    assert(!titles.includes(blogToDelete.title))
  })
})

describe('updating a blog', () => {
  test('updating a blog is ok', async () => {
    const initialBlog = (await testHelper.blogsInDB())[0]
    const updatedBlog = {
      ...initialBlog,
      title: 'Mis manuelidades',
      author: 'Diana',
      url: 'http://someaddress...',
      likes: initialBlog.likes + 1
    }
    //console.log('initialBlog', initialBlog)
    //console.log('updatedBlog', updatedBlog)

    await api
      .put(`/api/blogs/${initialBlog.id}`)
      .send(updatedBlog)

    const blogsAfterUpdate = await testHelper.blogsInDB()
    //console.log('blogsAfterUpdate', blogsAfterUpdate)

    const blogAfterUpdate = blogsAfterUpdate.find(b => b.id === initialBlog.id)
    //console.log('blogAfterUpdate', blogAfterUpdate)

    //checks if likes are updated
    assert(blogAfterUpdate.likes === initialBlog.likes + 1)

    //checking different properties with the strictEqual() method
    assert.strictEqual(blogAfterUpdate.title, updatedBlog.title)
    assert.strictEqual(blogAfterUpdate.author, updatedBlog.author)
    assert.strictEqual(blogAfterUpdate.url, updatedBlog.url)
    assert.strictEqual(blogAfterUpdate.likes, updatedBlog.likes)

    //checking the entire object
    assert.deepStrictEqual(blogAfterUpdate, updatedBlog)
  })
})

after(async () => {
  await mongoose.connection.close()
})
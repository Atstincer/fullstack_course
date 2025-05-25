const supertest = require('supertest')
const app = require('../app')
const { test, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const api = supertest(app)

describe('trying to login', () => {
  beforeEach(async () => {
    await User.deleteMany()
    const passWord = '1234'
    const pwh = await bcrypt.hash(passWord, 10)
    const user = new User({
      username: 'pedrogh',
      passwordHash: pwh,
      name: 'Pedro'
    })
    await user.save()
  })

  test('login with valid info returns OK', async () => {
    const user = {
      username: 'pedrogh',
      password: '1234'
    }
    const result = await api
      .post('/api/login')
      .send(user)
      .expect(200)
  })

  test('login with no registered user/invalid username returns 401 unauthorized', async () => {
    const user = {
      username: 'unregistered',
      password: '1234'
    }

    const result = await api
      .post('/api/login')
      .send(user)
      .expect(401)

    assert.strictEqual(result.error.text, '{"error":"username or password incorrect"}')
  })

  test('login with wrong password returns 401 unauthorized', async () => {
    const user = {
      username: 'pedrogh',
      password: '12345'
    }

    const result = await api
      .post('/api/login')
      .send(user)
      .expect(401)

    assert.strictEqual(result.error.text, '{"error":"username or password incorrect"}')
  })
})

after(async () => {
  await mongoose.connection.close()
})
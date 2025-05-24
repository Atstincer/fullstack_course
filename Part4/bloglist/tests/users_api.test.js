const mongoose = require('mongoose')
const supertest = require('supertest')
const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const testHelper = require('./test_helper')

const api = supertest(app)

describe('adding new users', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('adding valid user works OK', async () => {
    const user = {
      username: 'antoniogh',
      password: '1234',
      name: 'Antonio'
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(201)

    const usersInDB = await testHelper.usersInDB()
    const usernames = usersInDB.map(u => u.username)
    assert(usernames.includes(user.username))
  })

  test('adding user without username returns 400 bad request', async () => {
    const user = {
      password: '1234',
      name: 'Antonio'
    }
    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    assert.strictEqual(result.error.text,
      '{"error":"User validation failed: username: Path `username` is required."}')
  })

  test('adding shorter username as allowed returs 400 bad request', async () => {
    const user = {
      username: 'an',
      password: '1234',
      name: 'Antonio'
    }

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    //console.log('text', result.error.text)
    assert.strictEqual(result.error.text, '{"error":"User validation failed: username: Path `username` (`an`) is shorter than the minimum allowed length (3)."}')
  })

  test('adding user without password returns 400 bad request', async () => {
    const user = {
      username: 'an',
      name: 'Antonio'
    }

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    //console.log('result.error.text:', result.error.text)
    assert.strictEqual(result.error.text, '{"error":"missing password"}')
  })

  test('adding user with shorter password as allowed returns 400 bad request', async () => {
    const user = {
      username: 'an',
      password: '12',
      name: 'Antonio'
    }

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    assert.strictEqual(result.error.text, '{"error":"password too short"}')
  })

  test('adding an excisting user returns 400 bad request', async () => {
    //adding the one user via mongoose
    const passhash = await bcrypt.hash('1234', 10)
    const theOnlyUserInDb = new User({
      username: 'pedrolh',
      passwordHash: passhash,
      name: 'Pedro'
    })
    await theOnlyUserInDb.save()

    //second user with the same username
    const user = {
      username: 'pedrolh',
      password: '1234',
      name: 'Pedrito'
    }

    //tryning to add second user to the db via the api
    await api
      .post('/api/users')
      .send(user)
      .expect(400)
  })

  
})

after(async () => {
  await mongoose.connection.close()
})
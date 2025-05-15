const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { listWithOneBlog, blogs } = require('./dummyData')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {

  test('of empty list is cero', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 36)
  })
})

describe('favorite blog', () => {

  test('if empty list returns undefine', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog([]), undefined)
  })

  test('when there is only one blog returns the same blog', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(listWithOneBlog), listWithOneBlog[0])
  })

  test('when several items in the list', () => {
    const blogFav = {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    }
    assert.deepStrictEqual(listHelper.favoriteBlog(blogs), blogFav)
  })
})

describe('most blogs', () => {
  test('with an empty list returns undefined', () => {
    assert.deepStrictEqual(listHelper.mostBlogs([]), undefined)
  })

  test('with only one item in the list', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(listWithOneBlog), {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })

  test('if several items in the blog list', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(blogs), {
      author: "Robert C. Martin",
      blogs: 3
    })
  })
})

describe('most likes', () => {
  test('with an empty list returns undefined', () => {
    assert.deepStrictEqual(listHelper.mostLikes([]), undefined)
  })

  test('with only one item returns ok', () => {
    assert.deepStrictEqual(listHelper.mostLikes(listWithOneBlog), {
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('with a lot of items in the list is OK', () => {
    assert.deepStrictEqual(listHelper.mostLikes(blogs), {
      author: "Edsger W. Dijkstra",
      likes: 17
    })
  })
})
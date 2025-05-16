const _ = require('lodash')

const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  const result = blogs.map(blog => blog.likes).reduce((sum, v) => { return sum + v }, 0)
  return result
}

const favoriteBlog = blogs => {
  const favorite = blogs.length > 0 ? blogs.reduce((fav, newBlog) => {
    //console.log('fav', fav)
    //console.log('newBlog', newBlog)
    return newBlog.likes > fav.likes ? newBlog : fav
  }, { likes: 0 }) : undefined
  //console.log('blog favorito',favorite)
  return favorite
}

const mostBlogs = blogs => {
  if (blogs.length === 0) return undefined
  let authors = {}
  blogs.forEach(blog => {
    const author = blog.author
    authors[author] ? authors[author] = authors[author] + 1 : authors[author] = 1
  })
  //console.log('authors',authors)
  let authorWithMostBlogs = { blogs: 0 }
  for (let a in authors) {
    if (authors[a] > authorWithMostBlogs.blogs) authorWithMostBlogs = {
      author: a,
      blogs: authors[a]
    }
  }
  //console.log('author with most blogs',authorWithMostBlogs)
  return authorWithMostBlogs
}

const _mostBLogs = blogs => {
  if (!blogs || blogs.length === 0) return undefined
  const authorsBlogs = Object.entries(_.countBy(blogs, 'author')).map(e => {
    return {
      author: e[0],
      blogs: e[1]
    }
  })
  const max = _.maxBy(authorsBlogs, 'blogs')

  return max
}

const mostLikes = blogs => {
  if (!blogs || blogs.length === 0) return undefined
  let authorLikes = {}
  blogs.forEach(blog => {
    authorLikes[blog.author] ? authorLikes[blog.author] = authorLikes[blog.author] + blog.likes : authorLikes[blog.author] = blog.likes
  })
  //console.log('authorLikes', authorLikes)
  let AML = { likes: 0 }
  for (a in authorLikes) {
    if (authorLikes[a] > AML.likes) {
      AML = {
        author: a,
        likes: authorLikes[a]
      }
    }
  }
  //console.log('AML',AML)
  return AML
}

const _mostLlikes = blogs => {
  if(!blogs || blogs.length === 0) return undefined
  const result1 = _.groupBy(blogs, 'author')
  const result2 = Object.entries(result1)
  //console.log('result1', result1)
  //console.log('result2', result2)

  const result3 = result2.map(l => {
    return {
      author: l[0],
      likes: _.sumBy(l[1], 'likes')
    }
  })
  //console.log('result3', result3)

  const result4 = _.maxBy(result3, 'likes')
  //console.log('result4', result4)

  /*const result5 = _.maxBy(Object.entries(_.groupBy(blogs, 'author')).map(l => {
    return {
      author: l[0],
      likes: _.sumBy(l[1], 'likes')
    }
  }), 'likes')
  console.log('result5',result5)*/

  return result4
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  _mostBLogs,
  mostLikes,
  _mostLlikes
}
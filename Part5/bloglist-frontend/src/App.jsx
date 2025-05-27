import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Message = ({ msg }) => {
  if (!msg) return null
  return (
    <div className='message'>{msg}</div>
  )
}

const ErrorMessage = ({ msg }) => {
  if (!msg) return null
  return (
    <div className='error_message'>{msg}</div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUserName] = useState('')
  const [password, setPassWord] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const userLoggedIn = window.localStorage.getItem('loggedBlogAppUser')
    if (userLoggedIn) {
      const userObject = JSON.parse(userLoggedIn)
      setUser(userObject)
      blogService.setToken(userObject.token)
    }
  }, [])

  const updateBlogsToShow = async () => {
    const blogsInDb = await blogService.getAll()
    setBlogs(blogsInDb)
  }

  const handleLoggin = async (event) => {
    event.preventDefault()
    //console.log('Logging in with', username, password)
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUserName('')
      setPassWord('')
    } catch (error) {
      //console.log('error.response.data:', error.response.data.error)
      setErrorMessage(error.response.data.error)
      setTimeout(() => { setErrorMessage(null) }, 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    blogService.setToken(null)
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLoggin}>
        <div>
          username <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => { setUserName(target.value) }}
          />
        </div>
        <div>
          password <input
            type='password'
            name='Password'
            value={password}
            onChange={({ target }) => { setPassWord(target.value) }}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    )
  }

  const handleAddNewBlog = async event => {
    event.preventDefault()
    //console.log('adding new blog:', title, author, url)
    try {
      const blogCreated = await blogService.create({
        title, author, url
      })
      //console.log('blogCreated', blogCreated)
      setTitle('')
      setAuthor('')
      setUrl('')
      await updateBlogsToShow()
      setMessage(`a new blog ${blogCreated.title} by ${blogCreated.author}`)
      setTimeout(() => { setMessage(null) }, 3000)
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {setErrorMessage(null)}, 3000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Message msg={message} />
        <ErrorMessage msg={errorMessage} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Message msg={message} />
      <ErrorMessage msg={errorMessage} />
      <div>{user.username} logged in <button onClick={handleLogout}>logout</button>
        <h2>create new</h2>
        <form onSubmit={handleAddNewBlog}>
          <div>title: <input
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => { setTitle(target.value) }} />
          </div>
          <div>author: <input
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => { setAuthor(target.value) }} />
            <div>url: <input
              type='text'
              name='Url'
              value={url}
              onChange={({ target }) => { setUrl(target.value) }} />
            </div>
            <button type='submit'>create</button>
          </div>
        </form>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
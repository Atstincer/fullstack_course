import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import LoginForm from './components/LoginForm'
import ToggleViews from './components/ToggleViews'
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
    <div className='error_message' data-testid='errormsg_div'>{msg}</div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    async function getBlogs() {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    getBlogs()
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

  const login = async credentials => {
    try {
      const user = await loginService.login(credentials)
      setUser(user)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => { setErrorMessage(null) }, 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    blogService.setToken(null)
  }

  const addNewBlog = async (newBlog) => {
    try {
      //blogFormRef.current.toggleVisibility() -> error: TypeError: blogFormRef.current.toggleVisibility is not a function
      blogFormRef.current()
      const blogCreated = await blogService.create(newBlog)
      await updateBlogsToShow()
      setMessage(`a new blog ${blogCreated.title} by ${blogCreated.author}`)
      setTimeout(() => { setMessage(null) }, 3000)
    } catch (error) {
      console.log('error:', error)
      setErrorMessage(error.response.data.error)
      setTimeout(() => { setErrorMessage(null) }, 3000)
    }
  }

  const addOneLike = async blog => {
    try {
      //console.log('blog recibido:', blog)
      const blogToUpdate = { ...blog, likes: blog.likes + 1 }
      //console.log('blogToUpdate:', blogToUpdate)
      const updatedBlog = await blogService.update(blogToUpdate)
      await updateBlogsToShow()
      setMessage(`${updatedBlog.title} has now ${updatedBlog.likes} likes`)
      setTimeout(() => { setMessage('') }, 3000)
    } catch (error) {
      console.log('error:', error)
      setErrorMessage(error.response.data.error)
      setTimeout(() => { setErrorMessage('') }, 3000)
    }
  }

  const removeBlog = async blog => {
    const conf = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    //console.log('conf:', conf)
    if (conf) {
      try {
        await blogService.deleteBlog(blog)
        setMessage('Blog delete successfully')
        setTimeout(() => { setMessage('') }, 3000)
        updateBlogsToShow()
      } catch (error) {
        console.log('error', error)
      }
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Message msg={message} />
        <ErrorMessage msg={errorMessage} />
        <LoginForm login={login} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Message msg={message} />
      <ErrorMessage msg={errorMessage} />
      <div>
        {user.username} logged in
        <button onClick={handleLogout}>logout</button>
      </div>

      <ToggleViews buttonLabel='new blog' ref={blogFormRef}>
        <NewBlogForm addNewBlog={addNewBlog} />
      </ToggleViews>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addOneLike={addOneLike} removeBlog={removeBlog} />
      )}
    </div>
  )
}

export default App
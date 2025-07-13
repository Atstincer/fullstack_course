import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import LoginForm from './components/LoginForm'
import ToggleViews from './components/ToggleViews'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
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

  const getSuccessNotification = (msg) => {
    return {
      type: 'success',
      msg: msg,
    }
  }

  const getErrorNotification = (msg) => {
    return {
      type: 'error',
      msg: msg,
    }
  }

  const login = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      setUser(user)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
    } catch (error) {
      setNotification(getErrorNotification(error.response.data.error))
      setTimeout(() => {
        setNotification(null)
      }, 3000)
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
      setNotification(
        getSuccessNotification(
          `a new blog ${blogCreated.title} by ${blogCreated.author}`,
        ),
      )
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch (error) {
      console.log('error:', error)
      setNotification(getErrorNotification(error.response.data.error))
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  const addOneLike = async (blog) => {
    try {
      const blogToUpdate = { ...blog, likes: blog.likes + 1 }
      //console.log('blogToUpdate:', blogToUpdate)
      const updatedBlog = await blogService.update(blogToUpdate)
      await updateBlogsToShow()
      setNotification(
        getSuccessNotification(
          `${updatedBlog.title} has now ${updatedBlog.likes} likes`,
        ),
      )
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch (error) {
      console.log('error:', error)
      setNotification(getErrorNotification(error.response.data.error))
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  const removeBlog = async (blog) => {
    const conf = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (conf) {
      try {
        await blogService.deleteBlog(blog)
        setNotification(getSuccessNotification('Blog deleted successfully'))
        setTimeout(() => {
          setNotification(null)
        }, 3000)
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
        <Notification notification={notification} />
        <LoginForm login={login} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <div>
        {user.username} logged in
        <button onClick={handleLogout}>logout</button>
      </div>

      <ToggleViews buttonLabel="new blog" ref={blogFormRef}>
        <NewBlogForm addNewBlog={addNewBlog} />
      </ToggleViews>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          addOneLike={addOneLike}
          removeBlog={removeBlog}
        />
      ))}
    </div>
  )
}

export default App

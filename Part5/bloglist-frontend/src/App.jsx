import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import LoginForm from './components/LoginForm'
import ToggleViews from './components/ToggleViews'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import {
  getSuccessMsgAction,
  getErrorMsgAction,
  getRemoveNotAction,
  useNotificationDispatch,
} from './components/NotificationContext'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const notDispatch = useNotificationDispatch()
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

  const login = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      setUser(user)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
    } catch (error) {
      notDispatch(getErrorMsgAction(error.response.data.error))
      setTimeout(() => {
        notDispatch(getRemoveNotAction())
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
      notDispatch(
        getSuccessMsgAction(
          `a new blog ${blogCreated.title} by ${blogCreated.author}`,
        ),
      )
      setTimeout(() => {
        notDispatch(getRemoveNotAction())
      }, 3000)
    } catch (error) {
      console.log('error:', error)
      notDispatch(getErrorMsgAction(error.response.data.error))
      setTimeout(() => {
        notDispatch(getRemoveNotAction())
      }, 3000)
    }
  }

  const addOneLike = async (blog) => {
    try {
      const blogToUpdate = { ...blog, likes: blog.likes + 1 }
      //console.log('blogToUpdate:', blogToUpdate)
      const updatedBlog = await blogService.update(blogToUpdate)
      await updateBlogsToShow()
      notDispatch(
        getSuccessMsgAction(
          `${updatedBlog.title} has now ${updatedBlog.likes} likes`,
        ),
      )
      setTimeout(() => {
        notDispatch(getRemoveNotAction())
      }, 3000)
    } catch (error) {
      console.log('error:', error)
      notDispatch(getErrorMsgAction(error.response.data.error))
      setTimeout(() => {
        notDispatch(getRemoveNotAction())
      }, 3000)
    }
  }

  const removeBlog = async (blog) => {
    const conf = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (conf) {
      try {
        await blogService.deleteBlog(blog)
        notDispatch(getSuccessMsgAction('Blog deleted successfully'))
        setTimeout(() => {
          notDispatch(getRemoveNotAction())
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
        <Notification />
        <LoginForm login={login} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
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

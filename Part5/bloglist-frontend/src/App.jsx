import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import LoginForm from './components/LoginForm'
import ToggleViews from './components/ToggleViews'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initialiceBlogs, createBlog, deleteBlog, addLikeToBlog } from './reducers/blogs_reducer'
import { setUserIfLoggedIn, loggin, logout } from './reducers/user_reducer'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialiceBlogs())
  }, [])

  useEffect(() => {
    dispatch(setUserIfLoggedIn())
  }, [])

  const handleLogin = credentials => {
    dispatch(loggin(credentials))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const addNewBlog = async (newBlog) => {
    blogFormRef.current()
    dispatch(createBlog(newBlog))
  }

  const addOneLike = async blog => {
    dispatch(addLikeToBlog(blog))
  }

  const removeBlog = async blog => {
    dispatch(deleteBlog(blog))
  }

  if (!user.username) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm login={handleLogin} />
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
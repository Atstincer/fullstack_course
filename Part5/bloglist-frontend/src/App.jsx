import { useEffect } from 'react'
import Notification from './components/Notification'
import Users from './components/Users'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initialiceBlogs } from './reducers/blogs_reducer'
import { setUserIfLoggedIn } from './reducers/user_reducer'
import { initialiceUsers } from './reducers/users_reducer'
import UserDetail from './components/UserDetail'
import BlogDetail from './components/BlogDetail'
import BlogsScreen from './components/BlogsScreen'
import NavBar from './components/NavBar'
import LoginScreen from './components/LoginScreen'

const App = () => {
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialiceBlogs())
  }, [])

  useEffect(() => {
    dispatch(initialiceUsers())
  }, [])

  useEffect(() => {
    dispatch(setUserIfLoggedIn())
  }, [])

  if (!user.username) {
    return <LoginScreen />
  }

  return (
    <div className="container bg-light p-2">
      <NavBar />
      <h2>blogs</h2>
      <Notification />

      <Routes>
        <Route path="/" element={<BlogsScreen />} />
        <Route path="/blogs" element={<BlogsScreen />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetail />} />
      </Routes>
    </div>
  )
}

export default App

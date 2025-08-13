import { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UsersTable from './components/UsersTable'
import UserDetail from './components/UserDetail'
import BlogDetail from './components/BlogDetail'
import BlogsScreen from './components/BlogsScreen'
import NavigationMenu from './components/NavigationMenu'
import blogService from './services/blogs'
import loginService from './services/login'
import {
  getErrorMsgAction,
  getRemoveNotAction,
  useNotificationDispatch
} from './components/NotificationContext'
import {
  useUserState,
  useUserDispatch,
  getRemoveUserAction,
  getSetUserAction
} from './components/UserContext'
import { Routes, Route } from 'react-router-dom'
import {
  useAppState,
  useMatchUserDetail,
  useMatchBlogDetail
} from './state/appState'

const App = () => {
  const user = useUserState()
  const notDispatch = useNotificationDispatch()
  const userDispatch = useUserDispatch()

  const appState = useAppState()
  const userToShowDetails = useMatchUserDetail()
  const blogToShowDetails = useMatchBlogDetail()

  useEffect(() => {
    const userLoggedIn = window.localStorage.getItem('loggedBlogAppUser')
    if (userLoggedIn) {
      const userObject = JSON.parse(userLoggedIn)
      blogService.setToken(userObject.token)
      userDispatch(getSetUserAction(userObject))
    }
  }, [])

  const handleLogin = async credentials => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      userDispatch(getSetUserAction(user))
    } catch (error) {
      notDispatch(getErrorMsgAction(error.response.data.error))
      setTimeout(() => {
        notDispatch(getRemoveNotAction())
      }, 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    userDispatch(getRemoveUserAction())
  }

  if (user === null) {
    return (
      <div className="body container login-container">
        <Notification />
        <div className="d-flex login-container">
          <LoginForm login={handleLogin} />
        </div>
      </div>
    )
  }

  return (
    <div className="body container p-2">
      <Notification />
      <div className="bg-secondary mt-2 px-2">
        <ul className="list-inline">
          <li className="list-inline-item">
            <NavigationMenu />
          </li>
          <li className="list-inline-item">
            <div>{user.username} logged in</div>
          </li>
          <li className="list-inline-item">
            <button onClick={handleLogout}>logout</button>
          </li>
        </ul>
      </div>
      <h2>blog app</h2>

      <Routes>
        <Route path="/" element={<BlogsScreen />} />
        <Route path="/blogs" element={<BlogsScreen />} />
        <Route
          path="/blogs/:id"
          element={<BlogDetail blog={blogToShowDetails} />}
        />
        <Route
          path="/users"
          element={<UsersTable result={appState.usersQuery} />}
        />
        <Route
          path="/users/:id"
          element={<UserDetail user={userToShowDetails} />}
        />
      </Routes>
    </div>
  )
}

export default App

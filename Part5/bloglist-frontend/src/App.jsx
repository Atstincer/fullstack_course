import { useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
//import BlogList from './components/BlogList'
import UsersTable from './components/UsersTable'
import UserDetail from './components/UserDetail'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
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
import { useQuery } from '@tanstack/react-query'
import { Routes, Route, useMatch } from 'react-router-dom'

const App = () => {
  const user = useUserState()
  const notDispatch = useNotificationDispatch()
  const userDispatch = useUserDispatch()

  const usersQueryResult = useQuery({
    queryFn: userService.getAll,
    queryKey: ['users']
  })

  /*const match = useMatch('/users/:id')
  const userToShowDetails =
    match && !usersQueryResult.isLoading
      ? usersQueryResult.data.find(u => u.id === Number(match.params.id))
      : null*/

  const users = usersQueryResult.isLoading ? null : usersQueryResult.data

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
        <div>{user.username} logged in</div>
        <br />
        <button onClick={handleLogout}>logout</button>
      </div>

      <Routes>
        <Route path="/" element={<UsersTable result={usersQueryResult} />} />
        <Route path="/users/:id" element={<UserDetail users={users} />} />
        <Route
          path="/users"
          element={<UsersTable result={usersQueryResult} />}
        />
      </Routes>
    </div>
  )
}

export default App

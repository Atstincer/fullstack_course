import { useEffect, useRef } from 'react'
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
  useNotificationDispatch
} from './components/NotificationContext'
import {
  useUserState,
  useUserDispatch,
  getRemoveUserAction,
  getSetUserAction
} from './components/UserContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const App = () => {
  //const [user, setUser] = useState(null)
  const user = useUserState()
  const notDispatch = useNotificationDispatch()
  const blogFormRef = useRef()
  const queryClient = useQueryClient()

  const userDispatch = useUserDispatch()

  useEffect(() => {
    const userLoggedIn = window.localStorage.getItem('loggedBlogAppUser')
    if (userLoggedIn) {
      const userObject = JSON.parse(userLoggedIn)
      //setUser(userObject)
      blogService.setToken(userObject.token)
      userDispatch(getSetUserAction(userObject))
    }
  }, [])

  const queryResult = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll
  })

  const addLikeMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: blogUpdated => {
      const blogs = queryClient.getQueryData(['blogs'])
      //console.log('blogs', blogs)
      const blogsMapped = blogs.map(b =>
        b.id === blogUpdated.id ? blogUpdated : b
      )
      //console.log('blogsMapped', blogsMapped)
      queryClient.setQueryData(['blogs'], blogsMapped)

      notDispatch(
        getSuccessMsgAction(
          `${blogUpdated.title} has now ${blogUpdated.likes} likes`
        )
      )
      setTimeout(() => {
        notDispatch(getRemoveNotAction())
      }, 3000)
    },
    onError: error => {
      console.log('error:', error)
      notDispatch(getErrorMsgAction(error.response.data.error))
      setTimeout(() => {
        notDispatch(getRemoveNotAction())
      }, 3000)
    }
  })

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: blogCreated => {
      //queryClient.invalidateQueries({ queryKey: ['blogs'] })
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(blogCreated))
      notDispatch(
        getSuccessMsgAction(
          `a new blog ${blogCreated.title} by ${blogCreated.author}`
        )
      )
      setTimeout(() => {
        notDispatch(getRemoveNotAction())
      }, 3000)
    },
    onError: error => {
      console.log('error:', error)
      notDispatch(getErrorMsgAction(error.response.data.error))
      setTimeout(() => {
        notDispatch(getRemoveNotAction())
      }, 3000)
    }
  })

  const removeBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
      notDispatch(getSuccessMsgAction('Blog deleted successfully'))
      setTimeout(() => {
        notDispatch(getRemoveNotAction())
      }, 3000)
    },
    onError: error => {
      console.log('error:', error)
      notDispatch(getErrorMsgAction(error.response.data.error))
      setTimeout(() => {
        notDispatch(getRemoveNotAction())
      }, 3000)
    }
  })

  const handleLogin = async credentials => {
    try {
      const user = await loginService.login(credentials)
      //setUser(user)
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

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm login={handleLogin} />
      </div>
    )
  }

  if (queryResult.isLoading) {
    return <div>loading data...</div>
  }

  const blogs = queryResult.data

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    //setUser(null)
    blogService.setToken(null)
    userDispatch(getRemoveUserAction())
  }

  const addNewBlog = async newBlog => {
    blogFormRef.current()
    newBlogMutation.mutate(newBlog)
  }

  const addOneLike = blog => {
    addLikeMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }

  const removeBlog = async blog => {
    const conf = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (conf) {
      removeBlogMutation.mutate(blog)
    }
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

      {blogs.map(blog => (
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

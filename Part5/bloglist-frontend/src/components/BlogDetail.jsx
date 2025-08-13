import blogService from '../services/blogs'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import {
  useNotificationDispatch,
  getSuccessMsgAction,
  getRemoveNotAction,
  getErrorMsgAction
} from '../components/NotificationContext'
import { useNavigate } from 'react-router-dom'
import AddCommentForm from './AddCommentForm'

const BlogDetail = ({ blog }) => {
  const queryClient = useQueryClient()
  const notDispatch = useNotificationDispatch()
  const navigate = useNavigate()

  const showDeleteButtton = () => {
    const userLoggedIn = window.localStorage.getItem('loggedBlogAppUser')
    if (userLoggedIn) {
      const user = JSON.parse(userLoggedIn)
      return user.username === blog.user.username
    }
    return false
  }

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

  const removeBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
      notDispatch(getSuccessMsgAction('Blog deleted successfully'))
      setTimeout(() => {
        notDispatch(getRemoveNotAction())
      }, 3000)
      navigate(-1)
    },
    onError: error => {
      console.log('error:', error)
      notDispatch(getErrorMsgAction(error.response.data.error))
      setTimeout(() => {
        notDispatch(getRemoveNotAction())
      }, 3000)
    }
  })

  const handleAddOneClick = () => {
    addLikeMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }

  const handleRemoveBlog = async () => {
    const conf = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (conf) {
      removeBlogMutation.mutate(blog)
    }
  }

  if (!blog) return null

  return (
    <div>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes{' '}
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={handleAddOneClick}>
          like
        </button>
      </div>
      <div>added by {blog.user.name}</div>
      {showDeleteButtton() && (
        <button
          onClick={handleRemoveBlog}
          className="btn btn-outline-secondary btn-sm">
          remove
        </button>
      )}
      <div className="mt-3">
        <h6>comments</h6>
        <AddCommentForm blogId={blog.id} />
        {blog.comments.length > 0 ? (
          <ul>
            {blog.comments.map(c => (
              <li key={blog.comments.indexOf(c)}>{c}</li>
            ))}
          </ul>
        ) : (
          <small className="ps-3">no comments to show</small>
        )}
      </div>
    </div>
  )
}

export default BlogDetail

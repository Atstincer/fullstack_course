import ToggleViews from './ToggleViews'
import NewBlogForm from './NewBlogForm'
import Blog from './Blog'
import blogService from '../services/blogs'
import { useRef } from 'react'
import {
  useNotificationDispatch,
  getErrorMsgAction,
  getSuccessMsgAction,
  getRemoveNotAction
} from './NotificationContext'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

const BlogList = () => {
  const notDispatch = useNotificationDispatch()
  const blogFormRef = useRef()
  const queryClient = useQueryClient()

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

  if (queryResult.isLoading) {
    return <div>loading data...</div>
  }

  const blogs = queryResult.data

  return (
    <div>
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

export default BlogList

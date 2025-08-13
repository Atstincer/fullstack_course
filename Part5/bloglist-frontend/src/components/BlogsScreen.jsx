import ToggleViews from './ToggleViews'
import NewBlogForm from './NewBlogForm'
import BlogList from './BlogList'
import blogService from '../services/blogs'
import {
  useNotificationDispatch,
  getErrorMsgAction,
  getSuccessMsgAction,
  getRemoveNotAction
} from './NotificationContext'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useAppState } from '../state/appState'
import { useRef } from 'react'

const BlogsScreen = () => {
  const notDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const appState = useAppState()
  const blogFormRef = useRef(null)

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

  const handleCancelAddNewBlog = () => {
    blogFormRef.current.toggleVisibility()
  }

  const addNewBlog = async newBlog => {
    blogFormRef.current.toggleVisibility()
    newBlogMutation.mutate(newBlog)
  }

  if (appState.blogQuery.isLoading) {
    return <div>loading data...</div>
  }

  const blogs = appState.blogQuery.data

  return (
    <div>
      <ToggleViews buttonLabel="new blog" ref={blogFormRef}>
        <NewBlogForm
          addNewBlog={addNewBlog}
          onCancel={handleCancelAddNewBlog}
        />
      </ToggleViews>
      <BlogList blogsToShow={blogs} />
    </div>
  )
}

export default BlogsScreen

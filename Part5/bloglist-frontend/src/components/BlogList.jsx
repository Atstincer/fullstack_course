import { useNotificationDispatch } from './NotificationContext'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

const BlogList = ({ blogsToShow }) => {
  //const notDispatch = useNotificationDispatch()
  //const queryClient = useQueryClient()

  /*const newBlogMutation = useMutation({
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
  })*/

  /*const removeBlogMutation = useMutation({
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
  })*/

  /*const addNewBlog = async newBlog => {
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
  }*/

  return (
    <div className="my-2">
      {blogsToShow ? (
        <ul>
          {blogsToShow.map(b => (
            <Link key={b.id} to={`/blogs/${b.id}`}>
              <li>{b.title}</li>
            </Link>
          ))}
        </ul>
      ) : (
        <div>no blogs to show</div>
      )}
    </div>
  )
}

export default BlogList

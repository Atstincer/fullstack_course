import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  addLikeToBlog,
  deleteBlog,
  addCommentToBlog
} from '../reducers/blogs_reducer'

const BlogDetail = () => {
  const blogId = useParams().id
  const blog = useSelector(state => state.blogs.find(b => b.id === blogId))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //console.log('in BlogDetail', blog)

  const handleAddOneLike = () => {
    dispatch(addLikeToBlog(blog))
  }

  const handleDeleteBlog = () => {
    dispatch(deleteBlog(blog))
    navigate(-1)
  }

  const showDeleteButton = () => {
    const userLoggedIn = window.localStorage.getItem('loggedBlogAppUser')
    if (userLoggedIn) {
      const userObject = JSON.parse(userLoggedIn)
      //console.log('userObject', userObject)
      //console.log('blog', blog)
      if (blog && userObject.username === blog.user.username) {
        return true
      } else {
        return false
      }
    }
    return false
  }

  const handleAddComment = event => {
    event.preventDefault()
    //console.log('event.target.comment.value', event.target.comment.value)
    if (blog) {
      dispatch(
        addCommentToBlog(blog.id, event.target.comment.value, () => {
          event.target.comment.value = ''
        })
      )
    }
  }

  return (
    <div className="mt-3">
      {blog ? (
        <div>
          <h3>{blog.title}</h3>
          <a href="#">{blog.url}</a>
          <div>
            {blog.likes} likes{' '}
            <button
              className="btn btn-outline-primary btn-sm ms-2"
              onClick={handleAddOneLike}>
              like
            </button>
          </div>
          <div>added by {blog.author}</div>

          {showDeleteButton() && (
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={handleDeleteBlog}>
              delete
            </button>
          )}

          <div className="mt-2">
            {blog ? (
              <div>
                <h5>comments</h5>
                <div>
                  <form onSubmit={handleAddComment}>
                    <input type="text" name="comment" />
                    <button className="btn btn-outline-primary btn-sm ms-2">
                      add comment
                    </button>
                  </form>
                </div>
                {blog.comments && blog.comments.length > 0 ? (
                  <ul className="my-2">
                    {blog.comments.map(c => (
                      <li key={blog.comments.indexOf(c)}>{c}</li>
                    ))}
                  </ul>
                ) : (
                  <div className="ms-3">no comments added yet</div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div>loading info</div>
      )}
    </div>
  )
}

export default BlogDetail

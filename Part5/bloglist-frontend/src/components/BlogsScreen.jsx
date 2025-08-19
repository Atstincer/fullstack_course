import BlogList from './BlogList'
import ToggleViews from './ToggleViews'
import NewBlogForm from './NewBlogForm'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogs_reducer'

const BlogsScreen = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const addNewBlog = async newBlog => {
    blogFormRef.current()
    dispatch(createBlog(newBlog))
  }

  const cancel = () => {
    blogFormRef.current()
  }

  return (
    <div className="mt-3">
      <ToggleViews buttonLabel="new blog" ref={blogFormRef}>
        <NewBlogForm addNewBlog={addNewBlog} cancel={cancel} />
      </ToggleViews>
      <BlogList />
    </div>
  )
}

export default BlogsScreen

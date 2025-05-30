import { useState } from 'react'

const Blog = ({ blog, addOneLike, removeBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const showDeleteButtton = () => {
    const userLoggedIn = window.localStorage.getItem('loggedBlogAppUser')
    if (userLoggedIn) {
      const user = JSON.parse(userLoggedIn)
      return user.username === blog.user.username
    }
    return false
  }

  const toggleVisibility = () => {
    setShowDetails(!showDetails)
  }

  const blogStyle = {
    paddingTop: 7,
    paddingLeft: 2,
    paddingBottom: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogDetails = () => {
    return (
      <div>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={() => { addOneLike(blog) }}>like</button></div>
        <div>{blog.user.name}</div>
        {showDeleteButtton() && <button onClick={() => { removeBlog(blog) }} style={{ background: 'blue' }}>remove</button>}
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{showDetails ? 'hide' : 'show'}</button>
      {showDetails && blogDetails()}
    </div>
  )
}

export default Blog
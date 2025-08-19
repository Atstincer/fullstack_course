import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = ({ blogsToShow }) => {
  const blogs = blogsToShow ? blogsToShow : useSelector(state => state.blogs)

  return (
    <div className="my-2">
      {blogs ? (
        <ul>
          {blogs.map(b => (
            <li key={b.id}>
              <Link to={`/blogs/${b.id}`}>{b.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>no blogs to show</div>
      )}
    </div>
  )
}

export default BlogList

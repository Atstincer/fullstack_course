import BlogList from './BlogList'

const UserDetail = ({ user }) => {
  if (!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.length > 0 ? (
          <BlogList blogsToShow={user.blogs} />
        ) : (
          <div>no blogs added yet</div>
        )}
      </ul>
    </div>
  )
}

export default UserDetail

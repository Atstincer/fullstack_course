const UserDetail = ({ user }) => {
  if (!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.length > 0 ? (
          user.blogs.map(b => {
            return <li key={b.id}>{b.title}</li>
          })
        ) : (
          <div>no blogs added yet</div>
        )}
      </ul>
    </div>
  )
}

export default UserDetail

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <div className="mt-4 users-table">
      <h2>Users</h2>
      {users && users.length > 0 ? (
        <table className="table table-sm table-dark table-striped table-borderless">
          <thead>
            <tr>
              <th></th>
              <th className="px-2">blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>
                  <Link to={`/users/${u.id}`}>{u.username}</Link>
                </td>
                <td className="text-center">{u.blogs ? u.blogs.length : 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>no users to show</div>
      )}
    </div>
  )
}

export default Users

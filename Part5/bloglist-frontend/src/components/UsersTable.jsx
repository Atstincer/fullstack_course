import { Link } from 'react-router-dom'

const UsersTable = ({ result }) => {
  if (result.isLoading) {
    return <div>Loading data...</div>
  }

  const users = result.data

  return (
    <div>
      <h2>Users</h2>
      <table className="table table-striped table-dark table-hover table-sm w-auto">
        {/*<caption>list of users</caption>*/}
        <thead>
          <tr>
            <th></th>
            <th className="px-2">blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => {
            return (
              <tr key={u.id}>
                <td className="px-2">
                  <Link to={`/users/${u.id}`}>{u.name}</Link>
                </td>
                <td className="text-center">{u.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default UsersTable

import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/user_reducer'

const NavBar = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className="mt-2 bg-secondary">
      <ul className="list-inline d-flex px-2 align-items-center">
        <li>
          <Link to={'/blogs'} className="link-light">
            blogs
          </Link>
        </li>
        <li className="mx-2">
          <Link to={'/users'} className="link-light">
            users
          </Link>
        </li>
        <li className="ms-auto">
          <div>
            {user.username} logged in
            <button
              className="btn btn-primary btn-sm my-1 ms-1"
              onClick={handleLogout}>
              logout
            </button>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default NavBar

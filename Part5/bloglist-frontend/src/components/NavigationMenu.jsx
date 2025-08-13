import { Link } from 'react-router-dom'

const NavigationMenu = () => {
  return (
    <ul className="list-inline">
      <Link className="list-inline-item text-white" to={'/blogs'}>
        <li>blogs</li>
      </Link>
      <Link className="list-inline-item text-white" to={'/users'}>
        <li>users</li>
      </Link>
    </ul>
  )
}

export default NavigationMenu

import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import BlogList from './BlogList'

const UserDetail = () => {
  const id = useParams().id
  const user = useSelector(state => state.users.find(u => u.id === id))
  //console.log('in UserDetail', user)

  return user ? (
    <div className="mt-4">
      <h3>{user.name}</h3>
      <h5>added blogs</h5>
      {user.blogs && user.blogs.length > 0 ? (
        <BlogList blogsToShow={user.blogs} />
      ) : (
        <div className="ms-2">no blogs added yet</div>
      )}
    </div>
  ) : (
    <div>no users registered</div>
  )
}

export default UserDetail

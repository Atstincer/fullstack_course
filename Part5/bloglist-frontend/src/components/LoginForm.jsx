import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loggin } from '../reducers/user_reducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassWord] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = event => {
    event.preventDefault()
    dispatch(loggin({ username, password }))
    setUsername('')
    setPassWord('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row mb-2">
        <label className="col-sm-3" htmlFor="inputUsername">
          username:
        </label>
        <div className="col-sm-4">
          <input
            type="text"
            id="inputUsername"
            onChange={({ target }) => {
              setUsername(target.value)
            }}
            value={username}
            data-testid="username"></input>
        </div>
      </div>

      <div className="row mb-2">
        <label className="col-sm-3" htmlFor="inputPassword">
          password:
        </label>
        <div className="col-sm-4">
          <input
            type="password"
            id="inputPassword"
            onChange={({ target }) => {
              setPassWord(target.value)
            }}
            value={password}
            data-testid="password"></input>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <button className="btn btn-primary me-3" type="submit">
          Login
        </button>
      </div>
    </form>
  )
}

export default LoginForm

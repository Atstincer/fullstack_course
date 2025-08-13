import { useState } from 'react'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassWord] = useState('')

  return (
    <div className="standard-form mx-auto my-auto">
      <form
        onSubmit={event => {
          event.preventDefault()
          login({ username, password })
          setUsername('')
          setPassWord('')
        }}>
        <h2>Log in to application</h2>
        <div>
          username{' '}
          <input
            type="text"
            value={username}
            name="Username"
            data-testid="username"
            onChange={({ target }) => {
              setUsername(target.value)
            }}
          />
        </div>
        <div className="my-2">
          password{' '}
          <input
            type="password"
            name="Password"
            value={password}
            data-testid="password"
            onChange={({ target }) => {
              setPassWord(target.value)
            }}
          />
        </div>
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm

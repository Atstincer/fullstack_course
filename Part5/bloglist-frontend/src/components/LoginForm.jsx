import { useState } from 'react'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassWord] = useState('')

  return (
    <form onSubmit={(event) => {
      event.preventDefault()
      login({ username, password })
      setUsername('')
      setPassWord('')
    }}>
      <div>
        username <input
          type='text'
          value={username}
          name='Username'
          data-testid='username'
          onChange={({ target }) => { setUsername(target.value) }}
        />
      </div>
      <div>
        password <input
          type='password'
          name='Password'
          value={password}
          data-testid='password'
          onChange={({ target }) => { setPassWord(target.value) }}
        />
      </div>
      <button type='submit'>Login</button>
    </form>
  )
}

export default LoginForm
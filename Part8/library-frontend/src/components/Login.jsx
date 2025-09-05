import { useMutation } from '@apollo/client/react'
import PropTypes from 'prop-types'
import { LOGIN } from '../querys'
import { useEffect } from 'react'

const Login = ({ show, setToken }) => {
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => console.log('Error', error),
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('login_user_token', token)
    }
  }, [result.data])

  if (!show) {
    return null
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    login({
      variables: {
        username: event.target.name.value,
        password: event.target.password.value,
      },
    })
    event.target.name.value = ''
    event.target.password.value = ''
  }

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-2">name</div>
        <input className="col-3" name="name" type="text" />
      </div>
      <div className="row mt-2">
        <div className="col-2">password</div>
        <input className="col-3" name="password" type="password" />
      </div>
      <button className="btn btn-sm btn-outline-primary mt-3">login</button>
    </form>
  )
}

Login.propTypes = {
  show: PropTypes.bool.isRequired,
  setToken: PropTypes.func.isRequired,
}

export default Login

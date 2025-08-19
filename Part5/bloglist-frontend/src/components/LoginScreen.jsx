import LoginForm from './LoginForm'
import Notification from './Notification'

const LoginScreen = () => {
  return (
    <div className="container login-container bg-light p-2">
      <Notification />
      <div className="login-container d-flex">
        <div className="login-form m-auto">
          <h2>Log in to application</h2>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default LoginScreen

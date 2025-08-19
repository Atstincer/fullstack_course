import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import notification_reducer from './reducers/notification_reducer'
import blog_reducer from './reducers/blogs_reducer'
import user_reducer from './reducers/user_reducer'
import users_reducer from './reducers/users_reducer'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

const store = configureStore({
  reducer: {
    notification: notification_reducer,
    blogs: blog_reducer,
    user: user_reducer,
    users: users_reducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
)

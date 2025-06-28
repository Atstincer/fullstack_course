import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import notification_reducer from './reducers/notification_reducer'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const store = createStore(notification_reducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
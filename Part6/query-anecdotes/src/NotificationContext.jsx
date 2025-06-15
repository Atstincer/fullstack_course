import { createContext, useReducer, useContext } from 'react'
import PropTypes from 'prop-types'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    case 'REMOVE_NOTIFICATION':
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const useNotDispatcher = () => {
  const stateAndDispatcher = useContext(NotificationContext)
  return stateAndDispatcher[1]
}

export const useNotMessage = () => {
  const stateAndDispatcher = useContext(NotificationContext)
  return stateAndDispatcher[0]
}

export const NotificationContextProvider = (props) => {
  const [message, notDispacher] = useReducer(notificationReducer, '')
  return (
    <NotificationContext.Provider value={[message, notDispacher]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

NotificationContextProvider.propTypes = {
  children: PropTypes.node
}

export default NotificationContext
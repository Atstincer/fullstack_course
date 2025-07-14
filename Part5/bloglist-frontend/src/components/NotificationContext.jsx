import { createContext, useContext, useReducer } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'setSuccesMsg':
      return {
        type: 'success',
        msg: action.payload,
      }
    case 'setErrorMsg':
      return {
        type: 'error',
        msg: action.payload,
      }
    case 'removeNotification':
      return null
  }
}

export const getSuccessMsgAction = (msg) => {
  return {
    type: 'setSuccesMsg',
    payload: msg,
  }
}

export const getErrorMsgAction = (msg) => {
  return {
    type: 'setErrorMsg',
    payload: msg,
  }
}

export const getRemoveNotAction = () => {
  return { type: 'removeNotification' }
}

export const useNotificationState = () => {
  const stateAndDispatch = useContext(NotificationContext)
  return stateAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const stateAndDispatch = useContext(NotificationContext)
  return stateAndDispatch[1]
}

export const NotificationContextProvider = (props) => {
  const [notification, notDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext

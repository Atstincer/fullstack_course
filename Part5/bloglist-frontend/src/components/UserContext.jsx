import { createContext, useContext, useReducer, useReduer } from 'react'

const UserContext = createContext()

const userReducer = (state, action) => {
  switch (action.type) {
    case 'setUser':
      return action.payload
    case 'removeUser':
      return null
  }
}

export const getSetUserAction = user => {
  return {
    type: 'setUser',
    payload: user
  }
}

export const getRemoveUserAction = () => {
  return {
    type: 'removeUser'
  }
}

export const useUserState = () => {
  const stateAndDispatch = useContext(UserContext)
  return stateAndDispatch[0]
}

export const useUserDispatch = () => {
  const stateAndDispatch = useContext(UserContext)
  return stateAndDispatch[1]
}

export const UserContextProvider = props => {
  const [user, userDispatch] = useReducer(userReducer, null)

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext

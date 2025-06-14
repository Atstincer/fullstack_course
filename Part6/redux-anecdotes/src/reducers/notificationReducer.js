import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotificationMsg(state, action) {
      //console.log('state', state)
      return action.payload
    },
    removeNotification(state, action) {
      //console.log('state', state)
      return ''
    }
  }
})

export const setNotification = (text, seg) => {
  return async dispatch => {
    dispatch(setNotificationMsg(text))
    setTimeout(() => dispatch(removeNotification()), seg*1000)
  }
}

export const { setNotificationMsg, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
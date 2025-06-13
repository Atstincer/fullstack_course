import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'Mensaje',
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

export const { setNotificationMsg, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  msg: null,
  kind: null
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setSuccessMesage(state, action) {
      return {
        msg: action.payload,
        kind: 'success'
      }
    },
    setErrorMesage(state, action) {
      return {
        msg: action.payload,
        kind: 'error'
      }
    },
    removeNotification(state, action) {
      return initialState
    }
  }
})

export const { setSuccessMesage, setErrorMesage, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
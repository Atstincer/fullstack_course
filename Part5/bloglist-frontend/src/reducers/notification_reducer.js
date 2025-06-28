const initialState = {
  msg: null,
  kind: null
}

const notification_reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'setSuccessMesage':
      return {
        msg: action.payload,
        kind: 'success'
      }
    case 'setErrorMesage':
      return {
        msg: action.payload,
        kind: 'error'
      }
    case 'removeMsg':
      return initialState
    default:
      return initialState
  }
}

export const setSuccessMesage = msg => {
  return {
    type: 'setSuccessMesage',
    payload: msg
  }
}

export const setErrorMesage = msg => {
  return {
    type: 'setErrorMesage',
    payload: msg
  }
}

export const removeMsg = () => {
  return {
    type: 'removeMsg',
  }
}

export default notification_reducer
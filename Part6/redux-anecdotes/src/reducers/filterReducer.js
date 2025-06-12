const reducer = (state = 'ALL', action) => {
  switch(action.type){
    case 'SET_FILTER':
      return action.payload
    default:
      return state
  }
}

export const getFilterAction = criteria => {
  return {
    type: 'SET_FILTER',
    payload: criteria
  }
}

export default reducer
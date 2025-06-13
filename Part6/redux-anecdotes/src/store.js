import { configureStore } from '@reduxjs/toolkit'
import anecdotesReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
//import anecdotesService from './services/anecdotes'

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    filter: filterReducer,
    notification: notificationReducer
  }
})

//anecdotesService.getAllAnecdotes().then(anecdotes => store.dispatch(setAnecdotes(anecdotes)))

//console.log(store.getState())

export default store
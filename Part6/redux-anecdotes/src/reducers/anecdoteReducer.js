import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'
import { setNotification } from './notificationReducer'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action){
      state.push(action.payload)
    },
    vote(state, action){
      //console.log('state', current(state))
      return state.map(a => {
        if(a.id === action.payload){
          const newVotes = a.votes + 1
          return {...a, votes: newVotes}
        }
        return a
      })
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAllAnecdotes()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNew = content => {
  return async dispatch => {
    const createdAnecdote = await anecdotesService.createAnecdote(content)
    dispatch(addAnecdote(createdAnecdote))
    dispatch(setNotification(`New anecdote "${createdAnecdote.content}"`, 5))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const newVotes = anecdote.votes + 1
    const response = await anecdotesService.updateAnecdote({...anecdote, votes: newVotes})
    //console.log('response', response)
    dispatch(vote(anecdote.id))
    dispatch(setNotification(`You voted "${anecdote.content}"`, 5))
  }
}

export const { addAnecdote, vote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
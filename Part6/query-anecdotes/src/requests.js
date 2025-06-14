import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

export const getAllAnecdotes = () => axios
  .get(baseURL)
  .then(res => res.data)

export const addNewAnecdote = anecdote => axios
  .post(baseURL, anecdote)
  .then(res => res.data)

export const vote = anecdote => axios
  .put(`${baseURL}/${anecdote.id}`, { ...anecdote, votes: anecdote.votes + 1 })
  .then(res => res.data)
import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const anecdotes = [...useSelector(state => {
    //console.log(state)
    const filter = state.filter
    if(filter === undefined || filter === '' || filter === 'ALL') {
      return state.anecdotes
    }
    return state.anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  })].sort((a, b) => b.votes - a.votes)

  const dispatch = useDispatch()

  const handleVote = (id) => {
    const anecdote = anecdotes.find(a => a.id === id)
    dispatch(voteAnecdote(anecdote))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
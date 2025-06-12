import { useSelector, useDispatch } from "react-redux"
import { getVoteAction } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    const filter = state.filter
    if(filter === undefined || filter === '' || filter === 'ALL') {
      return state.anecdotes.sort((a, b) => b.votes - a.votes)
    }
    return state.anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase())).sort((a, b) => b.votes - a.votes)
  })

  const dispatch = useDispatch()

  const vote = (id) => {
    //console.log('vote', id)
    dispatch(getVoteAction(id))
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
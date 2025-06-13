import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { setNotificationMsg, removeNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleOnSubmit = (event) => {
    event.preventDefault()
    const newAnecdote = event.target.anecdote.value
    dispatch(addAnecdote(newAnecdote))
    event.target.anecdote.value = ''
    dispatch(setNotificationMsg(`New anecdote "${newAnecdote}"`))
    setTimeout(() => { dispatch(removeNotification()) }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleOnSubmit}>
        <div><input name='anecdote'/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
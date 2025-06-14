import { useQueryClient, useMutation } from '@tanstack/react-query'
import { addNewAnecdote } from '../requests'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  const anecdoteMutation = useMutation({
    mutationFn: addNewAnecdote,
    onSuccess: newOne => {
      //queryClient.invalidateQueries(['anecdotes'])
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newOne))
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log(`new anecdote ${content}`)
    anecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

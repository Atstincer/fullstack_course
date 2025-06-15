import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAllAnecdotes, vote } from './requests'
//import { useContext } from 'react'
import { useNotDispatcher } from './NotificationContext'
//import NotificationContext from './NotificationContext'

const App = () => {

  //const [message, notDispacher] = useContext(NotificationContext)
  const notDispacher = useNotDispatcher()

  const queryClient = useQueryClient()

  const voteMutation = useMutation({
    mutationFn: vote,
    onSuccess: newOne => {
      //console.log('onSucces', newOne)
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      //const newData = anecdotes.map(a => a.id === newOne.id ? newOne : a)
      //console.log('newData', newData)
      queryClient.setQueryData(['anecdotes'], anecdotes.map(a => a.id === newOne.id ? newOne : a))
    }
  })

  const handleVote = (anecdote) => {
    //console.log('vote')
    voteMutation.mutate(anecdote)
    notDispacher({type:'SET_NOTIFICATION', payload: `Voted "${anecdote.content}"`})
    setTimeout(() => { notDispacher({type:'REMOVE_NOTIFICATION'}) }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAllAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading ...</div>
  }

  if (result.status === 'error') {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

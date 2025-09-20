import { useEffect, useState } from 'react'
import { useQuery, useSubscription } from '@apollo/client/react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import RecommendBooks from './components/RecommendBooks'
import Login from './components/Login'
import { ALL_AUTHORS, BOOK_ADDED } from './querys'
import { udQueries } from './util'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const response_authors = useQuery(ALL_AUTHORS, { skip: page !== 'authors' })

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      console.log('data received on subscription', data)
      //window.alert(`New book added: ${data.data.bookAdded.title}`)
      udQueries(client.cache, data.data.bookAdded)
    },
  })

  useEffect(() => {
    if (localStorage.getItem('login_user_token')) {
      setToken(localStorage.getItem('login_user_token'))
    }
  }, [])

  useEffect(() => {
    token ? setPage('authors') : setPage('login')
  }, [token])

  const logout = () => {
    localStorage.clear()
    setToken(null)
  }

  const handleSetToken = (value) => {
    setToken(value)
    if (value) setPage('authors')
  }

  return (
    <div className="container mt-2">
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button className="ms-1" onClick={() => setPage('books')}>
          books
        </button>
        <button
          className="ms-1"
          style={{ display: token ? 'inline-block' : 'none' }}
          onClick={() => setPage('add')}
        >
          add book
        </button>
        <button
          className="ms-1"
          style={{ display: token ? 'inline-block' : 'none' }}
          onClick={() => setPage('recommend')}
        >
          recommend
        </button>
        <button
          className="ms-1"
          style={{ display: token ? 'none' : 'inline-block' }}
          onClick={() => setPage('login')}
        >
          login
        </button>
        <button
          className="ms-1"
          style={{ display: token ? 'inline-block' : 'none' }}
          onClick={logout}
        >
          logout
        </button>
      </div>

      <Authors show={page === 'authors'} response={response_authors} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <RecommendBooks show={page === 'recommend'} />

      <Login show={page === 'login'} setToken={handleSetToken} />
    </div>
  )
}

export default App

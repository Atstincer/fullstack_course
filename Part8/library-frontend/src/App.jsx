import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client/react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { ALL_AUTHORS } from './querys'

//valid token Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImF0c3RpbmNlciIsImlkIjoiNjhiNTY4YjM2OGE1MzZlZWY1ZmYyMmRjIiwiaWF0IjoxNzU2NzE5NDQxfQ.6hGSXdywDWJ1gQQ2Wug93lfNVZp9CfGE5xzN4shXdkw

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const response_authors = useQuery(ALL_AUTHORS, {
    skip: page !== 'authors',
  })
  /*const response_books = useQuery(ALL_BOOKS, {
    skip: page !== 'books',
  })*/

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

      <Login show={page === 'login'} setToken={handleSetToken} />
    </div>
  )
}

export default App

import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS, ALL_BOOKS } from './querys'

//valid token Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImF0c3RpbmNlciIsImlkIjoiNjhiNTY4YjM2OGE1MzZlZWY1ZmYyMmRjIiwiaWF0IjoxNzU2NzE5NDQxfQ.6hGSXdywDWJ1gQQ2Wug93lfNVZp9CfGE5xzN4shXdkw

const App = () => {
  const [page, setPage] = useState('authors')
  const response_authors = useQuery(ALL_AUTHORS, {
    skip: page !== 'authors',
  })
  const response_books = useQuery(ALL_BOOKS, {
    skip: page !== 'books',
  })

  //console.log('response.loading', response.loading)
  /*if (response.data) {
    console.log('response.data.allAuthors', response.data.allAuthors)
  }*/

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} response={response_authors} />

      <Books show={page === 'books'} response={response_books} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App

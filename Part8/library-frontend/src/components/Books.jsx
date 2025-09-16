import PropTypes from 'prop-types'
import { useQuery } from '@apollo/client/react'
import { ALL_GENRES, ALL_BOOKS } from '../querys'
import { useEffect, useState } from 'react'
import BooksTable from './BooksTable'

const Books = ({ show }) => {
  const [genres, setGenres] = useState(null)
  const [genreFilter, setGenreFilter] = useState('all genres')

  const booksToShowQuery = useQuery(ALL_BOOKS, {
    variables: {
      genre: genreFilter,
    },
    skip: !show,
    //fetchPolicy: 'no-cache',
  })

  const allGenresQuery = useQuery(ALL_GENRES, {
    skip: !show,
  })

  useEffect(
    () =>
      setGenres(
        allGenresQuery.data && allGenresQuery.data.genres.length > 0
          ? allGenresQuery.data.genres.concat('all genres')
          : null
      ),
    [allGenresQuery.data]
  )

  if (!show || !booksToShowQuery.data) {
    return null
  }

  if (booksToShowQuery.loading) {
    return <div>loading</div>
  }

  const books = booksToShowQuery.data.allBooks

  if (!books || books.length === 0) {
    return <div className="mt-3">no books added yet</div>
  }

  return (
    <div className="mt-3">
      <h2>books</h2>
      {genreFilter && (
        <div className="my-1">
          in genre <b>{genreFilter}</b>
        </div>
      )}
      <BooksTable books={books} />
      <div className="mt-3">
        {genres
          ? genres.map((g) => (
              <button
                className="me-1"
                style={g === genreFilter ? { color: '#4CAF50' } : {}}
                key={g}
                onClick={() => setGenreFilter(g)}
              >
                {g}
              </button>
            ))
          : null}
      </div>
    </div>
  )
}

Books.propTypes = {
  show: PropTypes.bool.isRequired,
}

export default Books

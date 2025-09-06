import PropTypes from 'prop-types'
import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS, ALL_GENRES } from '../querys'
import { useEffect, useState } from 'react'

const Books = ({ show }) => {
  const [genres, setGenres] = useState(null)
  const [genreFilter, setGenreFilter] = useState('all genres')

  const booksToShowQuery = useQuery(ALL_BOOKS, {
    variables: {
      genre: genreFilter === 'all genres' ? null : genreFilter,
    },
    skip: !show,
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
      <table>
        <tbody>
          <tr>
            <th></th>
            <th className="ps-3">author</th>
            <th className="ps-2">published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td className="ps-3">{b.author.name}</td>
              <td className="ps-2 text-center">{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
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

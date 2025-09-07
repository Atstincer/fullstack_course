import { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client/react'
import { ALL_AUTHORS, ALL_GENRES, CREATE_BOOK, ME } from '../querys'

const NewBook = ({ show }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [ALL_AUTHORS, ALL_GENRES, ME], //{ query: ALL_BOOKS }, { query: ALL_AUTHORS }, { query: ALL_GENRES },
    onError: (error) => {
      console.log(error)
    },
  })

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    //console.log('add book...')
    createBook({
      variables: { title, author, published: parseInt(published), genres },
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div className="mt-3">
      <form onSubmit={submit}>
        <div className="row">
          <div className="col-2">title</div>
          <input
            className="col-4"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className="row mt-2">
          <div className="col-2">author</div>
          <input
            className="col-4"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div className="row mt-2">
          <div className="col-2">published</div>
          <input
            className="col-4"
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div className="mt-2">
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button className="ms-2" onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div className="mt-2">genres: {genres.join(' ')}</div>
        <button className="mt-2" type="submit">
          create book
        </button>
      </form>
    </div>
  )
}

NewBook.propTypes = {
  show: PropTypes.bool.isRequired,
}

export default NewBook

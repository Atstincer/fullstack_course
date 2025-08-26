import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { ALL_AUTHORS, EDIT_BIRTHYEAR } from '../querys'

const AuthorEditForm = ({ author, onSuccess }) => {
  const [year, setYear] = useState('')

  const [addBirthYear] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => console.log(error),
  })

  useEffect(() => {
    author ? setYear(author.born ? author.born : '') : setYear('')
  }, [author])

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('submitting...')
    if (author)
      addBirthYear({
        variables: {
          name: author.name,
          setBornTo: year === '' ? null : parseInt(year),
        },
      })
    onSuccess()
  }

  return (
    <div>
      <h4>Set birthyear</h4>
      <form onSubmit={handleSubmit}>
        <div>
          name
          <input value={author ? author.name : ''} readOnly />
        </div>
        <div>
          born
          <input
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

AuthorEditForm.propTypes = {
  author: PropTypes.object,
  onSuccess: PropTypes.func,
}

export default AuthorEditForm

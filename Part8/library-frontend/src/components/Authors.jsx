import PropTypes from 'prop-types'
import { useState } from 'react'
import AuthorEditForm from './AuthorEditForm'

const Authors = ({ show, response }) => {
  const [authorToEdit, setAuthorToEdit] = useState(null)

  if (!show) {
    return null
  }
  if (response.loading) {
    return <div>loading</div>
  }

  const handleOnEditSuccess = () => setAuthorToEdit(null)

  const authors = response.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td onClick={() => setAuthorToEdit(a)}>
                <a href="#">{a.name}</a>
              </td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AuthorEditForm author={authorToEdit} onSuccess={handleOnEditSuccess} />
    </div>
  )
}

Authors.propTypes = {
  show: PropTypes.bool.isRequired,
  response: PropTypes.object.isRequired,
}

export default Authors

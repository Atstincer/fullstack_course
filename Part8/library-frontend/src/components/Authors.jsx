import PropTypes from 'prop-types'
import AuthorEditForm from './AuthorEditForm'

const Authors = ({ show, response }) => {
  if (!show) {
    return null
  }
  if (response.loading) {
    return <div>loading</div>
  }

  const authors = response.data.allAuthors

  //console.log('authors in Authors', authors)

  return (
    <div className="mt-2">
      <h2>authors</h2>
      {authors && authors.length > 0 ? (
        <div>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th className="ps-2">born</th>
                <th className="ps-2">books</th>
              </tr>
              {authors.map((a) => (
                <tr key={a.name}>
                  <td>{a.name}</td>
                  <td className="ps-2">{a.born}</td>
                  <td className="text-center">{a.books.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <AuthorEditForm authors={authors} />
        </div>
      ) : (
        <div>there are no authors registered</div>
      )}
    </div>
  )
}

Authors.propTypes = {
  show: PropTypes.bool.isRequired,
  response: PropTypes.object.isRequired,
}

export default Authors

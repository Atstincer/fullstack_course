import PropTypes from 'prop-types'

const Books = ({ show, response }) => {
  if (!show || !response.data) {
    return null
  }

  if (response.loading) {
    return <div>loading</div>
  }

  const books = response.data.allBooks

  if (!books || books.length === 0) {
    return <div className="mt-3">no books added yet</div>
  }

  return (
    <div className="mt-3">
      <h2>books</h2>
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
    </div>
  )
}

Books.propTypes = {
  show: PropTypes.bool.isRequired,
  response: PropTypes.object.isRequired,
}

export default Books

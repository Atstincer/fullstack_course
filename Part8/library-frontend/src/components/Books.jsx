import PropTypes from 'prop-types'

const Books = ({ show, response }) => {
  if (!show) {
    return null
  }

  if (response.loading) {
    return <div>loading</div>
  }

  const books = response.data.allBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
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

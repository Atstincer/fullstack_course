import PropTypes from 'prop-types'

const BooksTable = ({ books }) => {
  return books ? (
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
  ) : null
}

BooksTable.propTypes = {
  books: PropTypes.array,
}

export default BooksTable

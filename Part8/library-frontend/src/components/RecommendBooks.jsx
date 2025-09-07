import { useQuery } from '@apollo/client/react'
import PropTypes from 'prop-types'
import { ME } from '../querys'
import BooksTable from './BooksTable'

const RecommendBooks = ({ show }) => {
  const meQuery = useQuery(ME, {
    skip: !show,
  })

  if (!show) return null
  if (meQuery.loading) return <div>loading...</div>

  //console.log('booksQuery.data', booksQuery.data)

  if (!meQuery.data || !meQuery.data.me)
    return <div>No recomendations found</div>

  return (
    <div className="my-3">
      <h4>Recommendations</h4>
      <div className="mt-3 mb-1">
        books in your favorite genre <b>{meQuery.data.me.favoriteGenre}</b>
      </div>
      {meQuery.data.me.recommend.length > 0 ? (
        <BooksTable books={meQuery.data.me.recommend} />
      ) : (
        <div>No recomendations found</div>
      )}
    </div>
  )
}

RecommendBooks.propTypes = {
  show: PropTypes.bool.isRequired,
}

export default RecommendBooks

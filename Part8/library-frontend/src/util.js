import { ALL_AUTHORS, ALL_BOOKS, ALL_GENRES, ME } from './querys'

export const udQueries = (cache, bookAdded) => {
  //console.log('bookAdded', bookAdded)

  cache.updateQuery(
    { query: ALL_BOOKS, variables: { genre: 'all genres' } },
    ({ allBooks }) => {
      return {
        allBooks: allBooks.concat(bookAdded),
      }
    }
  )

  const { genres } = cache.readQuery({ query: ALL_GENRES })
  //console.log('query all genres', genres)
  let genresToAdd = []
  bookAdded.genres.forEach((element) => {
    genres.includes(element) ? null : genresToAdd.push(element)
  })
  //console.log('genresToAdd', genresToAdd)
  cache.writeQuery({
    query: ALL_GENRES,
    data: { genres: genres.concat(genresToAdd) },
  })

  const { allAuthors } = cache.readQuery({ query: ALL_AUTHORS })
  //console.log('query all authors', allAuthors)
  const authorFound = allAuthors.find((a) => a.name === bookAdded.author.name)
  //console.log('authorFound', authorFound)
  if (!authorFound) {
    cache.writeQuery({
      query: ALL_AUTHORS,
      data: {
        allAuthors: allAuthors.concat({ ...bookAdded.author, bookCount: 1 }),
      },
    })
  }

  const { me } = cache.readQuery({ query: ME })
  //console.log('me', me)
  if (bookAdded.genres.includes(me.favoriteGenre)) {
    cache.writeQuery({
      query: ME,
      data: { me: { ...me, recommend: me.recommend.concat(bookAdded) } },
    })
  }
}

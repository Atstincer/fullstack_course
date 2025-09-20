import { ALL_AUTHORS, ALL_BOOKS, ALL_GENRES, ME } from './querys'

export const udQueries = (cache, bookAdded) => {
  //console.log('bookAdded', bookAdded)

  /*cache.updateQuery(
    { query: ALL_BOOKS, variables: { genre: 'all genres' } },
    ({ allBooks }) => {
      return {
        allBooks: allBooks.concat(bookAdded),
      }
    }
  )*/

  //updating allBooks query 'all genres'
  const { allBooks } = cache.readQuery({
    query: ALL_BOOKS,
    variables: { genre: 'all genres' },
  })
  //console.log('all books all genres query in chache', allBooks)
  allBooks.map((b) => b.id).includes(bookAdded.id)
    ? null
    : cache.writeQuery({
        query: ALL_BOOKS,
        variables: { genre: 'all genres' },
        data: { allBooks: allBooks.concat(bookAdded) },
      })

  //updating all genres query
  const { genres } = cache.readQuery({ query: ALL_GENRES })
  //console.log('query all genres before adding new ones', genres)
  let genresToAdd = []
  bookAdded.genres.forEach((element) => {
    genres.includes(element) ? null : genresToAdd.push(element)
  })
  //console.log('genresToAdd', genresToAdd)
  cache.writeQuery({
    query: ALL_GENRES,
    data: { genres: genres.concat(genresToAdd) },
  })
  //console.log('query all genres after adding new ones', genres)

  //updating all books query segun genres
  console.log('updating allBooks query', bookAdded.title)
  bookAdded.genres.forEach((g) => {
    console.log('genre:', g)
    const inCache = cache.readQuery({
      query: ALL_BOOKS,
      variables: { genre: g },
    })
    if (inCache && !inCache.allBooks.map((b) => b.id).includes(bookAdded.id)) {
      console.log('inCache exist and the book is not included')
      console.log('allBooks', inCache.allBooks)
      cache.writeQuery({
        query: ALL_BOOKS,
        variables: { genre: g },
        data: { allBooks: inCache.allBooks.concat(bookAdded) },
      })
    } else {
      console.log('inCache', inCache)
      if (inCache) {
        console.log(
          '!inCache.allBooks.map((b) => b.id).includes(bookAdded.id)',
          !inCache.allBooks.map((b) => b.id).includes(bookAdded.id)
        )
      }
    }
  })

  //updating all authors query
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

  //updating recomended books
  const me = cache.readQuery({ query: ME })
  //console.log('me', me)
  if (me && bookAdded.genres.includes(me.me.favoriteGenre)) {
    if (!me.me.recommend.map((b) => b.id).includes(bookAdded.id)) {
      cache.writeQuery({
        query: ME,
        data: {
          me: { ...me.me, recommend: me.me.recommend.concat(bookAdded) },
        },
      })
    }
  }
}

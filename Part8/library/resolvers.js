const { GraphQLError, subscribe } = require('graphql')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let query = {}
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (author) {
          query.author = author._id
        } else {
          return []
        }
      }
      //console.log('args.genre', args.genre)
      if (args.genre && args.genre !== 'all genres') {
        query.genres = args.genre
      }
      return Book.find(query).populate('author')
    },
    allAuthors: async () => Author.find({}).populate('books'),
    me: (root, args, context) => {
      return context.currentUser
    },
    genres: async () => {
      const books = await Book.find({})
      const genres = Array.from(new Set(books.flatMap((b) => b.genres)))
      return genres
    },
  },

  /*Author: {
    bookCount: async (root) => {
      const libros = await Book.find({ author: root.id })
      return libros ? libros.length : 0
    },
  },*/

  User: {
    recommend: async (root, args, { currentUser }) => {
      if (!currentUser) return null
      //console.log('currentUser', currentUser)
      return Book.find({ genres: currentUser.favoriteGenre }).populate('author')
    },
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('Unothorize action, no user log in')
      }
      const authorFound = await Author.findOne({ name: args.author }).populate(
        'books'
      )
      let authorId
      if (authorFound) {
        authorId = authorFound._id
      } else {
        const newAuthor = new Author({ name: args.author })
        try {
          await newAuthor.save()
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error,
            },
          })
        }
        authorId = newAuthor._id
      }
      const newBook = new Book({ ...args, author: authorId })
      try {
        await newBook.save()

        const finalAuthor = await Author.findById(authorId)
        finalAuthor.books.push(newBook._id)
        await finalAuthor.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error,
          },
        })
      }

      const bookAdded = await Book.findById(newBook._id).populate('author')

      pubsub.publish('BOOK_ADDED', { bookAdded })

      console.log('book added in backend', bookAdded)

      return bookAdded
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('Unothorize action, no user log in')
      }
      const authorFound = await Author.findOne({ name: args.name }).populate(
        'books'
      )
      if (authorFound) {
        authorFound.born = args.setBornTo
        await authorFound.save()
        return authorFound
      }
      return undefined
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })
      return user.save().catch((error) => {
        throw new GraphQLError('Create user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error,
          },
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== '1234') {
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED'),
    },
  },
}

module.exports = resolvers

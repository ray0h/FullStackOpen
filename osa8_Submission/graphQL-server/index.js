const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const pubsub = new PubSub()
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const JWT_SECRET = "NOT_VERY_SECRET"

mongoose.set('useFindAndModify', false)
const MONGODB_URI = 'mongodb+srv://macchi0h:macchipwd@cluster0-iwduy.mongodb.net/gql_library?retryWrites=true&w=majority'

console.log('connecting to MongoDB...')
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology:true })
  .then(console.log('connected to MongoDB'))
  .catch((error) => {
    console.log('error connection to MongoDB: ', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    books: [Books]!
    bookCount: Int
    id: ID!
  }

  type Books {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Books!]!
    allAuthors: [Author!]!
    getGenres: [String!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!,
      genres: [String!]
    ): Books

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Books!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let id = await Author.find({name: args.author})
      if (args.author && args.genre) {
        return Book.find({ $and: [{ author: id}, { genres: { $in: [args.genre]}} ]}).populate('author')
      } else if (args.author) {
        return Book.find({ author : id }).populate('author')
      } else if (args.genre) {
        return Book.find({ genres: {$in: [args.genre]}}).populate('author')
      } else {
        return Book.find({}).populate('author')
      }
    },
    allAuthors: async () => {
      const authors = await Author.find({}).populate('books')
      authors.forEach(author => author.bookCount = author.books.length)
      return authors
    },
    me: (root, args, context) => {
      return context.currentUser
    },
    getGenres: () => Book.find({})
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated; please login')
      }
      let author = await Author.find({ name: args.author })
      let id
      if (author.length !== 0) {
        author = author[0]
        id = author.id
      } else {
        author = new Author({ name: args.author })
        await author.save()
        id = author.id
      }
      
      let newBook = new Book({ ...args, author: id })
      try {
        await newBook.save()
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      author.books.push(newBook.id)
      await author.save()
      
      const popBook = await Book.findOne({title: newBook.title}).populate('author')
      pubsub.publish('BOOK_ADDED', { bookAdded: popBook })
      return popBook
    
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated; please login')
      }
      let author = await Author.find({name: args.name})
      
      if (author.length === 0) {
        throw new UserInputError('No such author in DB', {
          invalidArgs: args.name,
        })
      } else {
        author = author[0]
      }
      author.born = args.setBornTo
      
      try {
        await author.save()  
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }  
      return author
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })
      
      return user.save()
        .catch (error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== "password") {
        throw new UserInputError('Enter correct username / password')
      }
      const tokenUser = {
        username: user.username,
        id: user.id
      }
      return { value: jwt.sign(tokenUser, JWT_SECRET) }
    }
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization: null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
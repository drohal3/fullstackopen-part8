const { ApolloServer, UserInputError, gql } = require('apollo-server')
const logger = require('./utils/logger')

const Author = require('./models/author')
const Book = require('./models/book')

// run node index.js to run it in local

/*
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
*/

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }
  
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

// const { v1: uuidv1 } = require('uuid');

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let conds = []
      if (args.author) {
        const author = await Author.findOne({name:args.author})

        if (!author) {

          return []
        }

        conds = [...conds, {author: author._id}]
      }

      if (args.genre) {
        conds = [...conds, {genres: {$in: [args.genre]}}]
      }

      conds = conds.length ? {$and: conds} : {}

      logger.info('cond', conds)

      const ret = await Book.find(conds).populate('author') // tried to create an original solution

      logger.info('allBooks', ret)

      return ret
    },
    allAuthors: async () => await Author.find({})
  },

  Mutation: { // operations causing states
    addBook: async (root, args) => {
      logger.info('args', args)

      let author = await Author.findOne({name: args.author})

      logger.info('author', author)
      if (!author) {
        logger.info("Creating new author")
        const newAuthor = new Author({name: args.author, born: 0})
        try {
          author = await newAuthor.save()
        } catch (e) {
          throw new UserInputError(e.message, {
            invalidArgs: args,
          })
        }

        logger.info('new author', author)
      }

      logger.info('author', author)

      const newBook = new Book({author, title: args.title, published: args.published, genres: args.genres})

      let book = null

      try {
        book = await newBook.save()
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        })
      }


      logger.info('newBook', book)

      return book
    },

    editAuthor: async (root, args) => {
      const filter = {name: args.name}

      const author = await Author.findOne(filter)

      if (!author) {
        return null // actually, null can't be returned (not nullable mutation), but returning it from habit
      }

      const updateAuthor = {
        $set: {
          ...author.document, born: args.setBornTo
        },
      }

      logger.info('updateAuthor', updateAuthor)

      try {
        await Author.updateOne(filter, updateAuthor, {} )
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        })
      }

      const ret = await Author.findOne({filter})

      logger.info('edited author', ret)

      return ret
    }
  },

  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({name: root.name})

      if (!author) {
        return 0 // is it necessary?
      }

      const books = await Book.find({author: author._id}) // is there a way to limit calls to MongoDB?

      return books.length
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  logger.info(`Server ready at ${url}`)
})
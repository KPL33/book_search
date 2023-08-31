//"typeDef"initions are essentially GraphQL's version of traditional "ORM Schema Models". Here, we are defining what a "User, Book, Query, Auth(oriztion), bookInput and Mutation" are and exporting these "type"s, to be utilized in our "server.js" file.

const typeDefs = `
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: ID!
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
  }

  type Query {
    me: User
  }

  type Auth {
    token: ID!
    user: User
  }

  input bookInput {
    bookId: String!
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth,
    addUser(username: String!, email: String!, password: String!): Auth,
    saveBook(bookData: bookInput!): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;

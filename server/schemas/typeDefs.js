const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Book {
    _id: ID
    authors: [String]!
    description: String!
    title: String!
    bookId: String!
    image: String!
    link: String
  }

  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    books: [Book]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getSingleUser: User 
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
    addBook(
      authors: [String!]!
      description: String!
      title: String!
      bookId: String!
      image: String!
      link: String
    ): User
    deleteBook(bookId: String!): User
  }
`;

module.exports = typeDefs;

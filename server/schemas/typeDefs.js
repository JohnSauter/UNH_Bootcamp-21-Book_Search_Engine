const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
  }

  type Book {
    _id: ID
    authors: [String]!
    description: String!
    title: String!
    bookId: String!
    image: String!
    link: String
  }

  type Auth {
    user: String!
    token: String!
  }

  type Query {
    getSingleUser: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
    saveBook(
      author: [String!]!
      description: String!
      title: String!
      bookId: String!
      image: String!
      link: String
    ): Auth
    deleteBook(bookId: String!): Auth
  }
`;

module.exports = typeDefs;

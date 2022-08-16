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
    unique_id: ID!
    previewLink: String
  }

  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
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
      unique_id: ID!
      previewLink: String!
    ): User
    deleteBook(unique_id: ID!): User
  }
`;

module.exports = typeDefs;

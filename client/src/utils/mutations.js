/* mutations.js */

import { gql } from "@apollo/client";

export const MUTATION_CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const MUTATION_LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
        savedBooks {
          unique_id
        }
      }
    }
  }
`;

export const MUTATION_ADD_BOOK = gql`
  mutation addBook(
    $authors: [String!]!
    $description: String!
    $title: String!
    $bookId: String!
    $image: String!
    $link: String
    $unique_id: ID!
  ) {
    addBook(
      authors: $authors
      description: $description
      title: $title
      bookId: $bookId
      image: $image
      link: $link
      unique_id: $unique_id
    ) {
      _id
      username
      savedBooks {
        _id
        authors
        description
        title
        bookId
        image
        link
        unique_id
      }
    }
  }
`;

export const MUTATION_DELETE_BOOK = gql`
  mutation deleteBook($unique_id: ID!) {
    deleteBook(unique_id: $unique_id) {
      _id
      username
      savedBooks {
        _id
        authors
        description
        title
        bookId
        image
        link
        unique_id
      }
    }
  }
`;

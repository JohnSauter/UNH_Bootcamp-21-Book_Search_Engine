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
      }
    }
  }
`;

export const MUTATION_SAVE_BOOK = gql`
  mutation saveBook(
    $authors: [String!]!
    $description: String!
    $title: String!
    $bookId: String!
    $image: String!
    $link: String
  ) {
    saveBook(
      authors: $authors
      description: $description
      title: $title
      bookId: $bookId
      image: $image
      link: $link
    ) {
      User
    }
  }
`;

export const MUTATION_DELETE_BOOK = gql`
  mutation deleteBook($bookId: String!) {
    deleteBook(bookId: $bookId) {
      User
    }
  }
`;

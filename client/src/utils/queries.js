import { gql } from "@apollo/client";

export const QUERY_GET_SINGLE_USER = gql`
  query getSingleUser {
    getSingleUser {
      _id
      username
      email
      savedBooks {
        _id
        authors
        description
        title
        bookId
        image
        link
        unique_id
        previewLink
      }
    }
  }
`;

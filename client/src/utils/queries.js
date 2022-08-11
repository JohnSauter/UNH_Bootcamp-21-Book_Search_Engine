import { gql } from "@apollo/client";

export const QUERY_GET_SINGLE_USER = gql`
  query getSingleUser() {
    getSingleUser {
      User
    }
  }
`;

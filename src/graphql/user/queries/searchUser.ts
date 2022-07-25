import { gql } from "apollo-boost";

export const SEARCH_USER = gql`
  query searchUser($query: String) {
    searchUser(query: $query) {
      username
      id
      profilePicture
    }
  }
`;

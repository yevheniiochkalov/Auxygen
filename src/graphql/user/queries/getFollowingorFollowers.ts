import { gql } from "apollo-boost";

export const GET_FOLLOWING_OR_FOLLOWERS = gql`
  query getFollowingorFollowers($id: Float, $request: String) {
    getFollowingorFollowers(id: $id, request: $request) {
      id
      username
      email
      profilePicture
    }
  }
`;

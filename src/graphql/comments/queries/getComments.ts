import { gql } from "apollo-boost";

export const GET_COMMENTS = gql`
  query getComments($data: CommentInput) {
    getComments(data: $data) {
      id
      text
      timeSubmitted
      likes
      user {
        username
        id
        profilePicture
      }
    }
  }
`;

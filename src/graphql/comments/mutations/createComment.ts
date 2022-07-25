import { gql } from "apollo-boost";

export const CREATE_COMMENT = gql`
  mutation CreateComment($data: CommentInput) {
    createComment(data: $data) {
      likes
      timeSubmitted
      text
      trackPost {
        trackName
      }
      artistPost {
        artistName
      }
      albumPost {
        albumName
      }
    }
  }
`;

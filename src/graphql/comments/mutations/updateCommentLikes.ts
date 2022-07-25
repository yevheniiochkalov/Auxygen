import { gql } from "apollo-boost";

export const UPDATE_COMMENT_LIKES = gql`
  mutation updateCommentLikes($data: LikeInput) {
    updateCommentLikes(data: $data) {
      likes
    }
  }
`;

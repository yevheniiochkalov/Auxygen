import { gql } from "apollo-boost";

export const UPDATE_POST_LIKES = gql`
  mutation updatePostLikes($data: LikeInput) {
    updatePostLikes(data: $data) {
      ... on AlbumPost {
        likes
      }
      ... on TrackPost {
        likes
      }
      ... on ArtistPost {
        likes
      }
      ... on Poll {
        likes
      }
      ... on Playlist {
        likes
      }
    }
  }
`;

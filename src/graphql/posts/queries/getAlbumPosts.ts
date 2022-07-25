import { gql } from "apollo-boost";

export const GET_ALBUM_POSTS = gql`
  query getAlbumPosts($id: String!) {
    getAlbumPosts(id: $id) {
      albumName
      externalUrl
      artistNames
      text
      rating
      timeSubmitted
      user {
        username
        profilePicture
        id
      }
    }
  }
`;

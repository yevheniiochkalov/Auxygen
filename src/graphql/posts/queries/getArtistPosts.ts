import { gql } from "apollo-boost";

export const GET_ALBUM_POSTS = gql`
  query getArtistPosts($id: String!) {
    getArtistPosts(id: $id) {
      id
      artistName
      externalUrl
      text
      timeSubmitted
      user {
        username
        profilePicture
        id
      }
    }
  }
`;

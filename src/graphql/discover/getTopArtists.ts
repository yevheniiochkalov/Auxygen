import { gql } from "apollo-boost";

export const GET_TOP_ARTISTS = gql`
  query getTopArtists {
    getTopArtists {
      id
      text
      likes
      imageUrl
      externalUrl
      timeSubmitted
      artistId
      artistName
      user {
        username
        id
        profilePicture
      }
    }
  }
`;

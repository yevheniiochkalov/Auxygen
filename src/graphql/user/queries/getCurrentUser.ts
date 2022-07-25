import { gql } from "apollo-boost";

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      name
      username
      googleId
      facebookId
      email
      profilePicture
      followers
      following
      genres
      firstLogin
      topAlbums {
        name
        imageUrl
        id
        artistNames
      }
      topArtists {
        name
        imageUrl
        id
      }
      topTracks {
        name
        imageUrl
        id
        artistNames
      }
    }
  }
`;

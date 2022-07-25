import { gql } from "apollo-boost";

export const UPDATE_USER_TOP_FIVE = gql`
  mutation updateUserTopFive($data: TopFiveArrayInput) {
    updateUserTopFive(data: $data) {
      id
      username
      email
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

import { gql } from "apollo-boost";

export const FOLLOW_OTHER_USER = gql`
  mutation followOtherUser($id: Float, $follow: Boolean) {
    followOtherUser(id: $id, follow: $follow) {
      id
      username
      email
      profilePicture
      followers
      following
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

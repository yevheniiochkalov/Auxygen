import { gql } from "apollo-boost";

export const GET_ARTIST_ALBUMS = gql`
  query getArtistAlbums($id: String!) {
    getArtistAlbums(id: $id) {
      items {
        id
        name
        type
        images {
          url
        }
      }
    }
  }
`;

import { gql } from "apollo-boost";

export const GET_ALBUM_TRACKS = gql`
  query getAlbumTracks($id: String) {
    getAlbumTracks(id: $id) {
      items {
        name
        preview_url
        track_number
        artists {
          name
        }
      }
    }
  }
`;

import { gql } from "apollo-boost";

export const GET_ARTIST_TOP_TRACKS = gql`
  query getArtistTopTracks($id: String!) {
    getArtistTopTracks(id: $id) {
      tracks {
        id
        name
        artists {
          name
        }
        preview_url
        album {
          images {
            url
          }
        }
      }
    }
  }
`;

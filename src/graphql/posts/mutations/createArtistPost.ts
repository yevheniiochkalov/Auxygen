import { gql } from "apollo-boost";

export const CREATE_ARTIST_POST = gql`
  mutation CreateArtistPost($data: ArtistPostInput!) {
    createArtistPost(data: $data) {
      id
    }
  }
`;

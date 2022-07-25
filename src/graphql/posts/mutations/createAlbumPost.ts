import { gql } from "apollo-boost";

export const CREATE_ALBUM_POST = gql`
  mutation CreateAlbumPost($data: AlbumPostInput!) {
    createAlbumPost(data: $data) {
      id
    }
  }
`;

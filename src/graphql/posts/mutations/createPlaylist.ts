import { gql } from "apollo-boost";

export const CREATE_PLAYLIST = gql`
  mutation createPlaylist($data: PlaylistInput!) {
    createPlaylist(data: $data) {
      id
    }
  }
`;

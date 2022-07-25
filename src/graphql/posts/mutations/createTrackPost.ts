import { gql } from "apollo-boost";

export const CREATE_TRACK_POST = gql`
  mutation CreateTrackPost($data: TrackPostInput!) {
    createTrackPost(data: $data) {
      id
    }
  }
`;

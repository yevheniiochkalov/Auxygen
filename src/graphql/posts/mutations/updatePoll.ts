import { gql } from "apollo-boost";

export const UPDATE_POLL = gql`
  mutation updatePoll($data: PollInput!) {
    updatePoll(data: $data) {
      id
    }
  }
`;

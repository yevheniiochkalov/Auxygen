import { gql } from "apollo-boost";

export const CREATE_POLL = gql`
  mutation createPoll($data: PollInput!) {
    createPoll(data: $data) {
      id
    }
  }
`;

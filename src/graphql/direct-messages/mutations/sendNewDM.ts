import { gql } from "apollo-boost";

export const SEND_NEW_DM = gql`
  mutation sendNewDM($data: DirectMessageInput) {
    sendNewDM(data: $data) {
      id
      text
      timeSubmitted
      sender {
        username
        id
        profilePicture
      }
    }
  }
`;

import { gql } from "apollo-boost";

export const GET_MY_DM_CHAT = gql`
  query getMyDMChat($data: DirectMessageInput) {
    getMyDMChat(data: $data) {
      id
      text
      timeSubmitted
      sender {
        username
        id
        profilePicture
      }
      recipient {
        id
        username
        profilePicture
      }
    }
  }
`;

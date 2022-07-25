import { gql } from "apollo-boost";

export const GET_MY_DMS = gql`
  query getMyDMs {
    getMyDMs {
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

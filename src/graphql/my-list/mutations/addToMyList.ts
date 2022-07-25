import { gql } from "apollo-boost";

export const ADD_TO_MY_LIST = gql`
  mutation addToMyList($data: MyListInput!) {
    addToMyList(data: $data) {
      username
      id
      myList {
        postId
        postType
      }
    }
  }
`;

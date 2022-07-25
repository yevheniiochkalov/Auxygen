import { gql } from "apollo-boost";

export const REMOVE_FROM_MY_LIST = gql`
  mutation removeFromMyList($data: MyListInput!) {
    removeFromMyList(data: $data) {
      username
      id
      myList {
        postId
        postType
      }
    }
  }
`;

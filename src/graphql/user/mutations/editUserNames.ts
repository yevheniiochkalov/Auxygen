import { gql } from "apollo-boost";

export const EDIT_USER_NAMES = gql`
  mutation editUserNames($data: EditUserInput!) {
    editUserNames(data: $data)
  }
`;

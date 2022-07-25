import { gql } from "apollo-boost";

export const EDIT_USER_GENRES = gql`
  mutation editUserGenres($data: EditUserInput!) {
    editUserGenres(data: $data)
  }
`;

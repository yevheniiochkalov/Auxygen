import { gql } from "apollo-boost";

export const GOOGLE_SSO = gql`
  mutation GoogleSSO($data: SSORegisterInput!) {
    googleSSO(data: $data) {
      accessToken
    }
  }
`;

import { gql } from "apollo-boost";

export const FACEBOOK_SSO = gql`
  mutation FacebookSSO($data: SSORegisterInput!) {
    facebookSSO(data: $data) {
      accessToken
    }
  }
`;

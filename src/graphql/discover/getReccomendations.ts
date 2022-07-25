import { gql } from "apollo-boost";

export const GET_RECOMMENDATIONS = gql`
  query getReccomendations {
    getReccomendations {
      tracks {
        name
        album {
          name
          id
          images {
            url
          }
          artists {
            name
          }
        }
      }
    }
  }
`;

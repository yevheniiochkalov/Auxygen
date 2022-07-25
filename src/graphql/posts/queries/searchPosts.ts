import { gql } from "apollo-boost";

export const SEARCH_POSTS = gql`
  query searchPosts($query: String) {
    searchPosts(query: $query) {
      ... on AlbumPost {
        text
        id
        externalUrl
        artistNames
        albumName
        rating
        imageUrl
        timeSubmitted
        albumId
        user {
          username
        }
      }
      ... on TrackPost {
        text
        id
        artistNames
        externalUrl
        trackName
        vote
        imageUrl
        timeSubmitted

        trackId
        user {
          username
        }
      }
      ... on ArtistPost {
        text
        id
        imageUrl
        artistName
        timeSubmitted
        artistId
        user {
          username
        }
      }
    }
  }
`;

import { gql } from "apollo-boost";

export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      ... on Playlist {
        id
        playlistPicture
        title
        description
        likes
        tracks {
          id
          artists
          name
          trackImageUrl
          externalUrl
        }
        timeSubmitted
        user {
          username
          id
          profilePicture
        }
      }
      ... on Poll {
        id
        question
        timeSubmitted
        length
        likes
        options {
          option
          votes
        }

        user {
          username
          id
          profilePicture
        }
      }
      ... on AlbumPost {
        id
        text
        likes
        externalUrl
        artistNames
        rating
        imageUrl
        timeSubmitted
        albumId
        albumName
        user {
          username
          id
          profilePicture
        }
      }
      ... on TrackPost {
        id
        text
        likes
        artistNames
        externalUrl
        vote
        imageUrl
        timeSubmitted
        trackId
        trackName
        user {
          username
          id
          profilePicture
        }
      }
      ... on ArtistPost {
        id
        text
        likes
        imageUrl
        externalUrl
        timeSubmitted
        artistId
        artistName
        user {
          username
          id
          profilePicture
        }
      }
    }
  }
`;

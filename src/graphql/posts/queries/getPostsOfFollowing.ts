import { gql } from "apollo-boost";

export const GET_POSTS_Of_FOLLOWING = gql`
  query getPostsOfFollowing {
    getPostsOfFollowing {
      ... on Playlist {
        id
        playlistPicture
        title
        description
        numComments
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
        numComments
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
        numComments
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
        numComments
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
        numComments
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

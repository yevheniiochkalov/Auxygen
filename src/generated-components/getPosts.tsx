import getEnvVars from '../../environment';
import { getAccessToken } from '../utils/accessToken';

const { apiUrl } = getEnvVars();

export const getAlbumPostFetch = async (id: string) => {
  const query = `
  query getAlbumPostById($id: String!) {
    getAlbumPostById(id: $id) {
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
  }
  `;

  const getAlbumPost = await fetch(`${apiUrl}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({
      query,
      variables: {
        id,
      },
    }),
  });

  const res = await getAlbumPost.json();
  return res.data.getAlbumPostById;
};

export const getTrackPostFetch = async (id: string) => {
  const query = `
  query getTrackPostById($id: String!) {
    getTrackPostById(id: $id) {
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
  }
  `;

  const getTrackPost = await fetch(`${apiUrl}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({
      query,
      variables: {
        id,
      },
    }),
  });

  const res = await getTrackPost.json();

  return res.data.getTrackPostById;
};

export const getArtistPostFetch = async (id: string) => {
  const query = `
    query getArtitstPostById($id: String!) {
      getArtitstPostById(id: $id) {
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
  `;

  const getArtistPost = await fetch(`${apiUrl}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({
      query,
      variables: {
        id,
      },
    }),
  });

  const res = await getArtistPost.json();
  return res.data.getArtitstPostById;
};
export const getThoughtsPostFetch = async (id: string) => {
  const query = `
    query getThoughtsPostById($id: String!) {
      getThoughtsPostById(id: $id) {
        id
        text
        likes
        likedUsers
        numComments
        imageUrl
        timeSubmitted
        user {
          username
          id
          profilePicture
        }
      }
    }
  `;

  const getThoughtsPost = await fetch(`${apiUrl}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({
      query,
      variables: {
        id,
      },
    }),
  });

  const res = await getThoughtsPost.json();
  return res.data.getThoughtsPostById;
};

export const getPollFetch = async (id: string) => {
  const query = `
    query getPollById($id: String!) {
      getPollById(id: $id) {
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
    }
  `;

  const getPoll = await fetch(`${apiUrl}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({
      query,
      variables: {
        id,
      },
    }),
  });

  const res = await getPoll.json();
  return res.data.getPollById;
};

export const getPlaylistFetch = async (id: string) => {
  const query = `
    query getPlaylistById($id: String!) {
      getPlaylistById(id: $id) {
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
    }
  `;

  const getPlaylist = await fetch(`${apiUrl}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({
      query,
      variables: {
        id,
      },
    }),
  });

  const res = await getPlaylist.json();
  return res.data.getPlaylistById;
};

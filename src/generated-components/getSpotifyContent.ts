import getEnvVars from '../../environment';
import { getAccessToken } from '../utils/accessToken';

const { apiUrl } = getEnvVars();

export const getSpotifyArtist = async (id: string, type: string) => {
  const albumQuery = `
    query getSpotifyAlbum($id: String!) {
      getSpotifyAlbum(id: $id) {
        artists {
          id
          name
          uri
          external_urls {
            spotify
          }
          type
          images {
            url
          }
          
        }
      }
    }
  `;

  const trackQuery = `
    query getSpotifyTrack($id: String!) {
      getSpotifyTrack(id: $id) {
        artists {
          id
          name
          uri
          external_urls {
            spotify
          }
          type
          images {
            url
          }
          
        }
      }
    }
  `;

  const getSpotifyArtistPost = await fetch(`${apiUrl}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({
      query: type === 'track'
        ? trackQuery
        : albumQuery,
      variables: {
        id,
      },
    }),
  });

  const res = await getSpotifyArtistPost.json();

  return res;
};

export const getSpotifyContent = async (id: string, type: string) => {
  const albumQuery = `
    query getSpotifyAlbum($id: String!) {
      getSpotifyAlbum(id: $id) {
        id
        name
        images {
          url
        }
        external_urls {
          spotify
        }
        artists {
          id
          name
          uri
          external_urls {
            spotify
          }
          type
          images {
            url
          }
          
        }
      }
    }
  `;

  const trackQuery = `
    query getSpotifyTrack($id: String!) {
      getSpotifyTrack(id: $id) {
        id
        name
        images {
          url
        }
        external_urls {
          spotify
        }
        artists {
          id
          name
          uri
          external_urls {
            spotify
          }
          type
          images {
            url
          }
          
        }
      }
    }
  `;

  const artistQuery = `
    query getSpotifyArtist($id: String!) {
      getSpotifyArtist(id: $id) {
        id
        name
        images {
          url
        }
        external_urls {
          spotify
        }
      }
    }
  `;

  const getSpotifyContentPost = await fetch(`${apiUrl}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({
      query: type === 'track'
        ? trackQuery
        : type === 'album'
          ? albumQuery
          : artistQuery,
      variables: {
        id,
      },
    }),
  });

  const res = await getSpotifyContentPost.json();

  if (type === 'album') {
    const album = res.data.getSpotifyAlbum;
    const result = {
      id: album.id,
      name: album.name,
      imageUrl: album.images?.map((item, ix) => item?.url)[1],
      externalUrl: album.external_urls?.spotify,
      artistNames: album.artists?.map((item, ix) => item?.name),
    };
    return result;
  }

  if (type === 'track') {
    const track = res.data.getSpotifyTrack;
    const result = {
      id: track.id,
      name: track.name,
      imageUrl: track.images?.map((item, ix) => item?.url)[1],
      externalUrl: track.external_urls?.spotify,
      artistNames: track.artists?.map((item, ix) => item?.name),
    };
    return result;
  }

  if (type === 'artist') {
    const artist = res.data.getSpotifyArtist;
    const result = {
      id: artist.id,
      name: artist.name,
      imageUrl: artist.images?.map((item, ix) => item?.url)[1],
      externalUrl: artist.external_urls?.spotify,
    };
    return result;
  }
};

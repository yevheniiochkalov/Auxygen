import getEnvVars from '../../environment';
import { getAccessToken } from '../utils/accessToken';

const { apiUrl } = getEnvVars();

export const getSelectedGenresFetch = async () => {
  const query = `
    query getCurrentUser {
      getCurrentUser {
        genres
      }
    }
  `;

  const res = await fetch(`${apiUrl}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({
      query,
    }),
  });

  const result = await res.json();

  return result;
};

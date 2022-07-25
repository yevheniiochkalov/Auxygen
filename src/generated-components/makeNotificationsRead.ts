import getEnvVars from '../../environment';
import { getAccessToken } from '../utils/accessToken';

const { apiUrl } = getEnvVars();

export const makeNotificationsReadFetch = async (notifications) => {
  const query = `
    mutation makeNotificationsRead($data: MakeNotificationsReadInput) {
      makeNotificationsRead(data: $data) {
          id
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
      variables: {
        data: {
          notifications,
        },
      },
    }),
  });

  const result = await res.json();
};

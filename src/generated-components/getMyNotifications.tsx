import getEnvVars from '../../environment';
import { getAccessToken } from '../utils/accessToken';

const { apiUrl } = getEnvVars();

export const getMyNotificationsFetch = async () => {
  const query = `
    query getMyNotifications {
      getMyNotifications {
        id,
        type,
        timeSubmitted,
        sender {
          username
          id
          profilePicture
        }
        recipient {
          id
          username
          profilePicture
        }
        isRead
        postId
        postType
        text
      }
    }
  `;

  const getMyNotifications = await fetch(`${apiUrl}/graphql`, {
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

  const res = await getMyNotifications.json();
  return res.data.getMyNotifications;
};

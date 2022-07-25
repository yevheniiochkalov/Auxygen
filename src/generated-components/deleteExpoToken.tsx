import * as Notifications from 'expo-notifications';

import getEnvVars from '../../environment';
import { getAccessToken } from '../utils/accessToken';

const { apiUrl } = getEnvVars();

export const deleteExpoToken = async () => {
  const query = `
    mutation deleteExpoToken($expoToken: String) {
      deleteExpoToken(expoToken: $expoToken) {
          id
      }
    }
  `;

  const expoToken = (await Notifications.getExpoPushTokenAsync()).data;

  const deletePostRes = await fetch(`${apiUrl}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({
      query,
      variables: {
        expoToken,
      },
    }),
  });

  const res = await deletePostRes.json();
};

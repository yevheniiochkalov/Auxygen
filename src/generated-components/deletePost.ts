import getEnvVars from '../../environment';
import { getAccessToken } from '../utils/accessToken';

const { apiUrl } = getEnvVars();

export const deletePost = async (postId, postType) => {
  const query = `
    mutation deletePost($data: DeletePostInput) {
      deletePost(data: $data) {
          id
      }
    }
  `;

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
        data: {
          id: postId,
          postType,
        },
      },
    }),
  });

  const res = await deletePostRes.json();
};

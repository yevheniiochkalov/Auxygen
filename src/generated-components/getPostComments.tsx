import getEnvVars from '../../environment';
import { getAccessToken } from '../utils/accessToken';

const { apiUrl } = getEnvVars();

export const getPostCommentsFetch = async (data) => {
  const query = `
    query getComments($data: CommentInput) {
      getComments(data: $data) {
        id
        text
        replyToId
        timeSubmitted
        likes
        likedUsers
        user {
          username
          id
          profilePicture
        }
      }
    }
  `;

  const getPostComments = await fetch(`${apiUrl}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({
      query,
      variables: {
        data,
      },
    }),
  });

  const res = await getPostComments.json();
  return res.data.getComments;
};

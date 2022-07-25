import getEnvVars from '../../environment';
import { getAccessToken } from '../utils/accessToken';

const { apiUrl } = getEnvVars();

export const getMyDMChatFetch = async (partnerID = 1) => {
  const query = `
      query getMyDMChat($data: DirectMessageInput) {
        getMyDMChat(data: $data) {
          id
          text
          timeSubmitted
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
        }
      }
    `;

  const data = {
    partnerID,
  };

  const getMyDMChat = await fetch(`${apiUrl}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({
      query,
      variables: { data },
    }),
  });

  const res = await getMyDMChat.json();
  return res.data.getMyDMChat;
};

export const getMyDMsFetch = async () => {
  const query = `
    query getMyDMs {
      getMyDMs {
        id
        text
        timeSubmitted
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
      }
    }
  `;

  const getMyDMs = await fetch(`${apiUrl}/graphql`, {
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

  const res = await getMyDMs.json();
  return res.data.getMyDMs;
};

export const getChatMessagesFetch = async (partnerID) => {
  const query = `
    query getChatMessages($partnerID: number) {
      getChatMessages(partnerID: $partnerID) {
        id
        text
        timeSubmitted
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
      }
    }
  `;

  const getMyDMs = await fetch(`${apiUrl}/graphql`, {
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

  const res = await getMyDMs.json();
  return res.data.getMyDMs;
};

export const makeMessagesReadFetch = async (messages) => {
  const query = `
    mutation makeMessagesRead($data: MakeMessagesReadInput) {
      makeMessagesRead(data: $data) {
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
          messages,
        },
      },
    }),
  });

  const result = await res.json();
};

import {
  Action, action, Thunk, thunk,
} from 'easy-peasy';
import { getMyDMChatFetch, getMyDMsFetch, makeMessagesReadFetch } from '../../generated-components/getMyDMChatFetch';

interface ChatPartnerInterface {
  id: number,
  username: string,
  profilePicture: string
}

export interface ChatEntities {
  [id: string]: {
    partner: ChatPartnerInterface;
    messages: number[];
    isRead: boolean
  }
}

export interface MessageEntities {
  [id: string]: {
    id: number;
    recipient: ChatPartnerInterface;
    sender: ChatPartnerInterface;
    timeSubmitted: string;
    text: string;
  }
}

export interface DmModelInterface {
  chats: number[];
  chatEntities: ChatEntities,
  messageEntities: MessageEntities,
  loading: boolean,
  currentChat: number,
  setCurrentChat: Action<DmModelInterface, number>,
  setLoading: Action<DmModelInterface, boolean>,
  setMessagesToChatThunk: Thunk<DmModelInterface, any>;
  setMessagesToChat: Action<DmModelInterface, any>;
  setChatsThunk: Thunk<DmModelInterface>;
  setChats: Action<DmModelInterface, any>;
  setSocketMessageToChat: Action<DmModelInterface, any>;
  createNewChat: Action<DmModelInterface, any>;
  makeChatRead: Action<DmModelInterface, any>;
  makeChatMessagesReadThunk: Thunk<DmModelInterface, any>;
  // makeChatMessagesRead: Action<DmModelInterface, any>;
}

const dmModel: DmModelInterface = {
  chats: [],
  chatEntities: {},
  messageEntities: {},
  loading: false,
  currentChat: null,
  setCurrentChat: action((state, payload) => {
    state.currentChat = payload;
  }),
  setLoading: action((state, payload) => {
    state.loading = payload;
  }),
  setMessagesToChatThunk: thunk(async (actions, payload) => {
    actions.setLoading(true);
    const messages = await getMyDMChatFetch(payload);
    actions.setMessagesToChat({
      messages,
      partnerID: payload,
    });
  }),
  setMessagesToChat: action((state, payload) => {
    const newMessageEntities = {};
    const newMessages = [];

    // Нужно удалить из стора сообщение(я) того чата, в который мы переходим
    const oldMessages = state.chatEntities[payload.partnerID].messages;
    const oldMessagesEntities = { ...state.messageEntities };

    oldMessages.forEach((m) => {
      delete oldMessagesEntities[m];
    });

    // state.messageEntities = { ...oldMessagesEntities };

    payload.messages.forEach((message) => {
      newMessageEntities[message.id] = message;
      newMessages.push(message.id);
    });

    state.chatEntities[payload.partnerID].messages = [
      ...newMessages,
    ];
    state.messageEntities = newMessageEntities;

    state.messageEntities = {
      ...oldMessagesEntities,
      ...newMessageEntities,
    };
    state.loading = false;
  }),
  setChatsThunk: thunk(async (actions, payload, { getStoreState }) => {
    actions.setLoading(true);
    const dms = await getMyDMsFetch();
    actions.setChats({
      dms,
      currentUser: getStoreState().user.user,
    });
  }),
  setChats: action((state, payload) => {
    const { dms, currentUser } = payload;

    const newChatEntities = {};
    const newMessageEntities = {};
    const newChats = [];

    dms.forEach((el) => {
      const partner = +el.sender.id === +currentUser.id ? (
        el.recipient
      ) : (
        el.sender
      );
      let isRead = true;

      if (!el.isRead && +el.sender.id !== +currentUser.id) {
        isRead = false;
      }

      newChats.push(partner.id);
      newChatEntities[partner.id] = {
        partner,
        messages: [el.id],
        isRead,
      };
      newMessageEntities[el.id] = {
        id: el.id,
        recipient: el.recipient,
        sender: el.sender,
        timeSubmitted: el.timeSubmitted,
        text: el.text,
        isRead: el.isRead,
      };
    });

    state.chatEntities = newChatEntities;
    state.chats = newChats;
    state.messageEntities = newMessageEntities;
    state.loading = false;
  }),
  setSocketMessageToChat: action((state, payload) => {
    const { currentUserId } = payload;
    const { id, recipient, sender } = payload.message;

    let isRead = false;
    if (state.currentChat === +sender.id) {
      makeMessagesReadFetch([+id]);
      isRead = true;
    }

    if (+sender.id === +currentUserId) {
      state.chatEntities[recipient.id].messages = [
        ...state.chatEntities[recipient.id].messages,
        id,
      ];
    } else if (!state.chatEntities[sender.id]) {
      state.chatEntities[sender.id] = {
        partner: sender,
        messages: [id],
        isRead,
      };
    } else {
      state.chatEntities[sender.id].isRead = isRead;
      state.chatEntities[sender.id].messages = [
        ...state.chatEntities[sender.id].messages,
        id,
      ];
    }
    state.messageEntities[id] = payload.message;
  }),
  createNewChat: action((state, payload) => {
    if (!state.chatEntities[payload.id]) {
      state.chatEntities[payload.id] = {
        partner: payload,
        messages: [],
        isRead: true,
      };
    }
  }),
  makeChatRead: action((state, payload) => {
    const { chatId, value } = payload;

    const newChat = {
      ...state.chatEntities[chatId],
      isRead: true,
    };
    state.chatEntities = {
      ...state.chatEntities,
      [chatId]: newChat,
    };
  }),
  makeChatMessagesReadThunk: thunk(async (actions, payload, { getStoreState }) => {
    try {
      const { chatId, type } = payload;
      const { messageEntities, chatEntities } = getStoreState().direct;
      const currentUserId = getStoreState().user.user.id;

      const messagesIds = chatEntities[chatId].messages;

      const messages = messagesIds
        .filter((message) => (
          (!messageEntities[message].isRead) && (
            type === 'partner' ? (
              +messageEntities[message].recipient.id === +currentUserId
            ) : (
              +messageEntities[message].sender.id === +currentUserId
            )
          )
        ));

      await makeMessagesReadFetch(messages.map((m) => +m));
    } catch (error) {
      console.log(error);
    }
  }),
  // makeChatMessagesRead: action((state, payload) => {
  //   const newMessageEntities = {};

  //   payload.messages.map((id) => ({
  //     ...state.messageEntities[id],
  //     isRead: true,
  //   })).forEach((message) => {
  //     newMessageEntities[message.id] = message;
  //   });

  //   state.messageEntities = {
  //     ...state.messageEntities,
  //     ...newMessageEntities,
  //   };
  // }),
};

export default dmModel;

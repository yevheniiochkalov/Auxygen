import socketIOClient from 'socket.io-client';
import { DirectMessage } from '../../generated-components/apolloComponents';
import getEnvVars from '../../../environment';

const { apiUrl } = getEnvVars();

export const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage';
export const FOLLOW_EVENT = 'followEvent';
export const LIKE_EVENT = 'likeEvent';
export const COMMENT_EVENT = 'commentEvent';
export const COMMENT_REPLY_EVENT = 'commentReplyEvent';

type SocketClientType = {
  socket?: any;
  initialize: () => void;
  sendSocketMessage: (data: DirectMessage) => void;
}

class SocketClient implements SocketClientType {
  constructor(public socket = null) {
    this.socket = null;
  }

  initialize(id = 1) {
    this.socket = socketIOClient(apiUrl, {
      query: { id },
    });
  }

  sendSocketMessage(message) {
    try {
      this.socket.emit(NEW_CHAT_MESSAGE_EVENT, {
        message,
        senderSocketId: this.socket.id,
      });
    } catch (error) {
      console.log(error);
    }
  }

  sendSocketFollow(recipient, sender) {
    try {
      this.socket.emit(FOLLOW_EVENT, {
        recipient,
        senderSocketId: this.socket.id,
        sender,
      });
    } catch (error) {
      console.log(error);
    }
  }

  sendSocketLike(data) {
    try {
      this.socket.emit(LIKE_EVENT, data);
    } catch (error) {
      console.log(error);
    }
  }

  sendSocketComment(data) {
    try {
      this.socket.emit(COMMENT_EVENT, data);
    } catch (error) {
      console.log(error);
    }
  }

  sendSocketReplyComment(data) {
    try {
      this.socket.emit(COMMENT_REPLY_EVENT, data);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new SocketClient();

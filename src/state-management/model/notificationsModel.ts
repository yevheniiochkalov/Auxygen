import {
  Action, action, Thunk, thunk,
} from 'easy-peasy';
import { getMyNotificationsFetch } from '../../generated-components/getMyNotifications';
import {
  getAlbumPostFetch,
  getArtistPostFetch,
  getPlaylistFetch,
  getPollFetch,
  getTrackPostFetch,
  getThoughtsPostFetch,
} from '../../generated-components/getPosts';
import { makeNotificationsReadFetch } from '../../generated-components/makeNotificationsRead';

interface NotificationUserInterface {
  id: number,
  username: string,
  profilePicture: string
}

export interface NotificationInterface {
  replyToId?: number | null,
  id: number,
  type: string,
  timeSubmitted: Date,
  sender: NotificationUserInterface,
  recipient: NotificationUserInterface,
  isRead: boolean,
  post?: any,
  postType?: string,
  postId?: string,
}

export interface NotificationsModelInterface {
  notifications: NotificationInterface[];
  getNotificationsThunk: Thunk<NotificationsModelInterface>;
  addNotificationsThunk: Thunk<NotificationsModelInterface, any>;
  getNotifications: Action<NotificationsModelInterface, any>;
  addNewNotification: Action<NotificationsModelInterface, NotificationInterface>;
  makeNotificationsReadThunk: Thunk<NotificationsModelInterface>;
}

const notificationsModel: NotificationsModelInterface = {
  notifications: [],
  getNotificationsThunk: thunk(async (actions) => {
    const notifications = (await getMyNotificationsFetch())
      .reverse()
      .slice(0, 35);

    for (const notification of notifications) {
      if (notification.type === 'comment' || notification.type === 'like' || notification.type === 'commentReply') {
        const { postType, postId } = notification;
        let post;
        switch (postType) {
          case 'album':
            post = await getAlbumPostFetch(String(postId));
            post.__typename = 'AlbumPost';
            break;
          case 'track':
            post = await getTrackPostFetch(String(postId));
            post.__typename = 'TrackPost';
            break;
          case 'artist':
            post = await getArtistPostFetch(String(postId));
            post.__typename = 'ArtistPost';
            break;
          case 'thoughts':
            post = await getThoughtsPostFetch(String(postId));
            post.__typename = 'ThoughtsPost';
            break;
          default:
            break;
        }

        if (postType === 'playlist') {
          post = await getPlaylistFetch(String(postId));
          post.__typename = 'Playlist';
        }
        if (postType === 'poll') {
          post = await getPollFetch(String(postId));
          post.__typename = 'Poll';
        }
        notification.post = post;
      }
    }

    actions.getNotifications(notifications);
  }),
  addNotificationsThunk: thunk(async (actions, payload) => {
    if (payload.notificaiton?.type === 'comment' || payload.notificaiton?.type === 'like') {
      const { postType, postId } = payload.notificaiton;
      let post;
      switch (postType) {
        case 'album':
          post = await getAlbumPostFetch(String(postId));
          post.__typename = 'AlbumPost';
          break;
        case 'track':
          post = await getTrackPostFetch(String(postId));
          post.__typename = 'TrackPost';
          break;
        case 'artist':
          post = await getArtistPostFetch(String(postId));
          post.__typename = 'ArtistPost';
          break;
        case 'thoughts':
          post = await getThoughtsPostFetch(String(postId));
          post.__typename = 'ThoughtsPost';
          break;
        default:
          break;
      }

      if (postType === 'playlist') {
        post = await getPlaylistFetch(String(postId));
        post.__typename = 'Playlist';
      }
      if (postType === 'poll') {
        post = await getPollFetch(String(postId));
        post.__typename = 'Poll';
      }
      payload.notification.post = post;
    }

    actions.addNewNotification(payload.notification);
  }),
  getNotifications: action((state, payload) => {
    state.notifications = payload;
  }),
  addNewNotification: action((state, payload) => {
    state.notifications = [
      ...state.notifications,
      payload,
    ];
  }),
  makeNotificationsReadThunk: thunk(async (actions, payload, { getStoreState }) => {
    try {
      const { notifications } = getStoreState().notifications;

      const notificationsIds = notifications
        .filter((notification) => !notification.isRead)
        .map((notification) => +notification.id);

      await makeNotificationsReadFetch(notificationsIds);
    } catch (error) {
      console.log(error);
    }
  }),
};
export default notificationsModel;

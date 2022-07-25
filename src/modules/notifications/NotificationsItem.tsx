import React from 'react';
import { Avatar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { NotificationsText } from './NotificationsText';

import { NotificationInterface } from '../../state-management/model/notificationsModel';
import { styles } from './styles';
import getEnvVars from '../../../environment';

const { apiUrl } = getEnvVars();

interface NotificationsItemProps {
  notification: NotificationInterface
}

export const NotificationsItem: React.FC<NotificationsItemProps> = ({ notification }) => {
  const navigation = useNavigation();
  const handleClick = (value: string = 'post') => {
    const {
      type, sender, post, postType, postId,
    } = notification;

    if (value === 'user') return navigation.navigate('UserPage', { id: +notification.sender.id });

    if (type === 'follow') {
      return navigation.navigate('UserPage', { id: +sender.id });
    }

    // if (type === 'commentReply') {
    //   return console.log(notification);
    // }

    navigation.navigate('CommentPage', {
      fromReplyNotification: notification.replyToId || null,
      postId: +post.id,
      postAuthor: post.user,
      playlistTitle: post.__typename === 'Playlist' ? post.title : '',
      poll: post.__typename === 'Poll' ? post : null,
      text: post.__typename === 'Playlist'
        ? post.description
        : post.__typename === 'Poll'
          ? post.question
          : post.text,
      imageUrl:
        postType === 'playlist'
          ? post.playlistPicture
          : postType === 'poll'
            ? null
            : post.imageUrl,
      postType,
      contentId:
        postType === 'album'
          ? post.albumId
          : postType === 'thoughts'
            ? post.id
            : postType === 'track'
              ? post.trackId
              : postType === 'playlist'
                ? post.id
                : postType === 'poll'
                  ? post.id
                  : post.artistId,
      name:
        postType === 'album'
          ? post.albumName
          : postType === 'track'
            ? post.trackName
            : postType === 'playlist'
              ? post.title
              : postType === 'poll'
                ? post.question
                : postType === 'artist'
                  ? post.artistName : null,
    });
  };

  return (
    <TouchableOpacity
      style={styles.notificationBox}
      onPress={() => handleClick('post')}
    >
      <Avatar.Image
        size={45}
        style={styles.avatar}
        source={{
          uri: `${apiUrl}/${notification.sender.profilePicture}`,
        }}
      />
      <NotificationsText notification={notification} onPress={handleClick} />
    </TouchableOpacity>
  );
};

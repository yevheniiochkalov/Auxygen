import React, { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Text, View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NotificationInterface } from '../../state-management/model/notificationsModel';
import { styles } from './styles';
import { timeSince } from '../../utils/timeSince';

interface NotificationsTextProps {
  notification: NotificationInterface,
  onPress: (value: string) => void
}

export const NotificationsText: React.FC<NotificationsTextProps> = ({ notification, onPress }) => {
  const { type, text } = notification;
  const navigation = useNavigation();

  const renderText = useMemo(() => {
    switch (type) {
      case 'like':
        return 'liked your post';
      case 'follow':
        return 'followed you';
      case 'comment':
        return ` ${text}`;
      case 'commentReply':
        return ' replied to your comment';

      default:
        return;
    }
  }, [type]);

  return (
    <View style={styles.notificationTextWrap}>
      <TouchableOpacity
        onPress={() => onPress('user')}
        containerStyle={{
          padding: 15,
          margin: -15,
        }}
      >
        <Text
          style={styles.notificationSender}
        >
          {`${notification.sender.username} `} {type === 'comment' && 'commented:'}
        </Text>
      </TouchableOpacity>
      <Text
        style={styles.notificationText}
        numberOfLines={3}
      >
        {renderText}
      </Text>

      {/* date */}
      <Text style={styles.notificationDate}>
        {timeSince(notification.timeSubmitted)}
      </Text>
    </View>
  );
};

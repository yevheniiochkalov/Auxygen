/* eslint-disable import/no-extraneous-dependencies */
import React, {
  useContext, useEffect, useMemo,
} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeContext } from 'styled-components';

import { Image } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useStoreState, useStoreActions } from '../../state-management/hooks';

import { AppParamList } from './AppParamList';
import { HomeStack } from './home/HomeStack';
import { CreatePostStack } from './create-post/CreatePostStack';
import { MyList } from '../../modules/my-list/MyList';
import { Discover } from '../../modules/discover/Discover';
import { DMStack } from './direct-messages/DMStack';
import { cyanB, orange700 } from '../../styled-components/colors';
import SocketClient, {
  COMMENT_EVENT, FOLLOW_EVENT, LIKE_EVENT, NEW_CHAT_MESSAGE_EVENT, NEW_POST_COMMENT_EVENT,
} from '../../modules/user/Socket';

import HomeIcon from '../../../assets/HomeIcon.png';
import DiscoveryIcon from '../../../assets/DiscoverIcon.png';
import NewPostIcon from '../../../assets/NewPostIcon.png';
import MyListIcon from '../../../assets/MyListIcon.png';
import MyMessagesIcon from '../../../assets/MyMessagesIcon.png';
import { getAlbumPostFetch } from '../../generated-components/getPosts';
import * as RootNavigation from '../../utils/RootNavigation';
import getEnvVars from '../../../environment';

const { apiUrl } = getEnvVars();

interface AppTabsProps {}

const Tabs = createBottomTabNavigator<AppParamList>();

export const AppTabs: React.FC<AppTabsProps> = () => {
  React.useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener((response: any) => {
      const { notification, post } = response.notification.request.content.data.body;

      if (notification.type === 'cron') return;

      const {
        type, sender, postType, postId,
      } = notification;

      if (type === 'message') {
        return RootNavigation.navigate('DirectMessages', {
          from: 'push',
          params: {
            partnerID: +notification.message.sender.id,
            partnerName: notification.message.sender.username,
            partnerPictureURL: `${apiUrl}/${notification.message.sender.profilePicture}`,
          },
        });
      }

      if (type === 'follow') {
        return RootNavigation.navigate('UserPage', { id: +sender.id });
      }
      RootNavigation.navigate('CommentPage', {
        fromReplyNotification: notification.replyToId || null,
        postId: +post.id,
        postAuthor: post.user,
        playlistTitle: postType === 'playlist' ? post.title : '',
        poll: postType === 'poll' ? post : null,
        text: postType === 'playlist'
          ? post.description
          : postType === 'poll'
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
    });

    return () => subscription.remove();
  }, []);
  const user = useStoreState((state) => state.user.user);
  const currentCommentsPost = useStoreState((state) => state.postComments.currentPost);
  const state = useStoreState((state) => state);
  const getCommentsThunk = useStoreActions((actions) => actions.postComments.getPostCommentsThunk);
  const setSocketMessageToChat = useStoreActions((actions) => (
    actions.direct.setSocketMessageToChat
  ));

  const addNewNotification = useStoreActions((actions) => (
    actions.notifications.addNotificationsThunk
  ));

  const chats = Object.values(useStoreState((state) => state.direct.chatEntities));

  const unreadChatsLength = chats.filter((chat: any) => !chat.isRead).length;
  // const unreadChatsLength = useMemo(() => chats.filter((chat) => !chat.isRead).length, [chats]);

  useEffect(() => {
    if (user?.id) {
      SocketClient.initialize(user.id);
      const { socket } = SocketClient;

      socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
        setSocketMessageToChat({
          message: data.message,
          currentUserId: user.id,
        });
      });

      socket.on(FOLLOW_EVENT, (data) => {
        addNewNotification(data);
      });

      socket.on(LIKE_EVENT, (data) => {
        addNewNotification(data);
      });

      socket.on(COMMENT_EVENT, (data) => {
        addNewNotification(data);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [user]);

  const themeContext = useContext(ThemeContext);
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let source;

          if (route.name === 'Home') {
            source = HomeIcon;
          } else if (route.name === 'CreatePost') {
            source = NewPostIcon;
          } else if (route.name === 'MyList') {
            source = MyListIcon;
          } else if (route.name === 'Discover') {
            source = DiscoveryIcon;
          } else if (route.name === 'DirectMessages') {
            source = MyMessagesIcon;
          }
          return (
            <Image
              source={source}
              style={[{
                height: route.name === 'Discover' ? 29 : 26,
                width: 25,
                marginTop: 15,
              }, {
                tintColor: focused ? cyanB : '#5A5369',
              }]}
            />
          );
        },
      })}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        activeTintColor: cyanB,
        inactiveTintColor: themeContext.colors.darkText,
        activeBackgroundColor: themeContext.colors.background,
        inactiveBackgroundColor: themeContext.colors.background,
        tabStyle: {
          backgroundColor: themeContext.colors.background,
          height: 80,
          paddingBottom: 45,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tabs.Screen name="Discover" component={Discover} />
      <Tabs.Screen
        name="CreatePost"
        component={CreatePostStack}
        options={{
          tabBarLabel: 'Create Post',
        }}
      />
      <Tabs.Screen
        name="MyList"
        component={MyList}
        options={{
          tabBarLabel: 'My List',
        }}
      />
      <Tabs.Screen
        name="DirectMessages"
        children={() => <DMStack />}
        options={{
          tabBarLabel: 'DMs',
          tabBarBadge: unreadChatsLength || null,
          tabBarBadgeStyle: {
            backgroundColor: orange700,
            color: '#ffffff',
            fontSize: 12,
          },
        }}
      />
    </Tabs.Navigator>
  );
};

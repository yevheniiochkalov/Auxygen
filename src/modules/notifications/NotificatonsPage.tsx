import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Dimensions, ImageBackground, Platform, Text, View,
} from 'react-native';

import { createSelector } from 'reselect';
import { NotificationsItem } from './NotificationsItem';

import { HomeStackNavProps } from '../../navigation/app/home/HomeParamList';
import { styles as mainStyles } from '../../styled-components/StyleSheet';
import { useStoreActions, useStoreState } from '../../state-management/hooks';
import { styles } from './styles';

const getNotifications = (state) => state.notifications.notifications;

const getReadNotifications = createSelector(
  [getNotifications],
  (notifications) => (
    notifications
      .filter((notification) => notification.isRead)
      .sort((a, b) => new Date(b.timeSubmitted) - new Date(a.timeSubmitted))
  ),
);

const getUnreadNotifications = createSelector(
  [getNotifications],
  (notifications) => (
    notifications
      .filter((notification) => !notification.isRead)
      .sort((a, b) => new Date(b.timeSubmitted) - new Date(a.timeSubmitted))
  ),
);

export const NotificationsPage: React.FC<HomeStackNavProps<'NotificationsPage'>> = ({
  navigation,
  route,
}) => {
  const state = useStoreState((state) => state);
  const makeNotificationsReadThunk = useStoreActions((actions) => (
    actions.notifications.makeNotificationsReadThunk
  ));
  const getNotificationsThunk = useStoreActions((actions) => (
    actions.notifications.getNotificationsThunk
  ));

  const readNotifications = getReadNotifications(state);
  const unreadNotifications = getUnreadNotifications(state);

  React.useEffect(() => {
    makeNotificationsReadThunk();

    return () => getNotificationsThunk();
  }, []);
  return (
    <ImageBackground
      style={mainStyles.wavyBackgroundStyle}
      imageStyle={mainStyles.wavyBackgroundImageStyle}
      source={require('../../local-assets/wavy.png')}
    >
      <ScrollView contentContainerStyle={styles.notificationsContainer}>
        {unreadNotifications.length ? (
          <>
            <View style={styles.groupHeader}>
              <Text style={styles.groupTitle}> Unread Notifications</Text>
            </View>
            {unreadNotifications.map((notification) => (
              <NotificationsItem notification={notification} key={notification.id} />
            ))}
          </>
        ) : <></>}

        {readNotifications.length ? (
          <>
            <View style={styles.groupHeader}>
              <Text style={styles.groupTitle}> Read Notifications</Text>
            </View>
            {readNotifications.map((notification) => (
              <NotificationsItem notification={notification} key={notification.id} />
            ))}
          </>
        ) : <></>}
      </ScrollView>
    </ImageBackground>
  );
};

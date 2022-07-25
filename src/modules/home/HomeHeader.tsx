import React from 'react';
import {
  Image, StyleSheet, View, Dimensions, Platform,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createSelector } from 'reselect';

import { UserButton } from '../user/UserButton';
import { SearchButton } from '../search/SearchButton';
import logo from '../../../assets/logo_text.png';
import { NotificationsButton } from './NotificationsButton';
import { useStoreState } from '../../state-management/hooks';

export function isIphoneX() {
  const iphoneXLength = 812;
  const iphoneXSMaxLength = 896;
  const windowDimensions = Dimensions.get('window');
  return (
    Platform.OS === 'ios'
    && !Platform.isPad
    && !Platform.isTVOS
    && (windowDimensions.width === iphoneXLength
      || windowDimensions.height === iphoneXLength
      || windowDimensions.width === iphoneXSMaxLength
      || windowDimensions.height === iphoneXSMaxLength)
  );
}

const safeAreaTopHeight = Platform.OS === 'ios' ? (isIphoneX() ? 100 : 'auto') : 'auto';

interface HomeHeaderProps {
  navigation: StackNavigationProp<any>;
}

const getNotifications = (state) => state.notifications.notifications;

const getUnreadNotificationsAmount = createSelector(
  [getNotifications],
  (notifications) => (
    notifications
      .filter((notification) => !notification.isRead)
      .length
  ),
);

export const HomeHeader: React.FC<HomeHeaderProps> = ({ navigation }) => {
  const state = useStoreState((state) => state);

  const notificationsAmount = getUnreadNotificationsAmount(state);
  return (
    <SafeAreaView style={{
      paddingBottom: 0,
      marginBottom: 0,
      padding: 0,
      height: safeAreaTopHeight,

    }}
    >
      <View style={styles.header}>
        <Image
          source={logo}
          style={{
            height: 30,
            width: 110,
            marginTop: 5,
          }}
        />
        <View style={styles.headerRight}>
          <NotificationsButton navigation={navigation} notificationAmount={notificationsAmount} />
          <SearchButton navigation={navigation} />
          <UserButton navigation={navigation} />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  logo: {
    height: 30,
    width: 120,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    // paddingBottom: 30,
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

  },
  screenTitle: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 22,

  },
});

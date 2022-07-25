import React from 'react';
import {
  View, ImageBackground, StyleSheet, Image, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Title } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

import { createSelector } from 'reselect';
import { DiscoverAlbums } from './DiscoverAlbums';
import { DiscoverPlaylists } from './DiscoverPlaylists';
import { DiscoverArtists } from './DiscoverArtists';
import { DiscoverReviews } from './DiscoverReviews';
import { UserButton } from '../user/UserButton';
import { SearchButton } from '../search/SearchButton';

import { BoldWhiteHeading } from '../../styled-components/StylishComponents';
import { HomeStackNavProps } from '../../navigation/app/home/HomeParamList';
import { styles } from '../../styled-components/StyleSheet';
import { LineBreak } from '../../styled-components/ReusedUI';
import { HomeHeader, isIphoneX } from '../home/HomeHeader';
import logo from '../../../assets/logo_text.png';
import { useStoreState } from '../../state-management/hooks';
import { NotificationsButton } from '../home/NotificationsButton';

const safeAreaTopHeight = Platform.OS === 'ios' ? (isIphoneX() ? 100 : 'auto') : 'auto';

interface DiscoverProps {}

const getNotifications = (state) => state.notifications.notifications;

const getUnreadNotificationsAmount = createSelector(
  [getNotifications],
  (notifications) => (
    notifications
      .filter((notification) => !notification.isRead)
      .length
  ),
);

export const Discover: React.FC<DiscoverProps & HomeStackNavProps<'Feed'>> = ({
  navigation,
  route,
}) => {
  const state = useStoreState((state) => state);

  const notificationsAmount = getUnreadNotificationsAmount(state);

  return (
    <ImageBackground
      style={styles.wavyBackgroundStyle}
      imageStyle={styles.wavyBackgroundImageStyle}
      source={require('../../local-assets/wavy.png')}
    >
      <SafeAreaView style={{ paddingBottom: 0, height: safeAreaTopHeight }}>
        <View style={discoverStyles.header}>
          <Image
            source={logo}
            style={discoverStyles.logo}
          />

          <View style={discoverStyles.headerRight}>
            <NotificationsButton navigation={navigation} notificationAmount={notificationsAmount} />
            <SearchButton navigation={navigation} />
            <UserButton navigation={navigation} />
          </View>
        </View>

      </SafeAreaView>
      <ScrollView>
        <View
          style={discoverStyles.container}
        >

          <BoldWhiteHeading>Trending Albums</BoldWhiteHeading>
          <DiscoverAlbums navigation={navigation} route={route} />
          <LineBreak />

          <BoldWhiteHeading>Most Popular Reviews</BoldWhiteHeading>
          <DiscoverReviews navigation={navigation} route={route} />
          <LineBreak />

          <BoldWhiteHeading>Hot Artists</BoldWhiteHeading>
          <DiscoverArtists navigation={navigation} route={route} />
          <LineBreak />

          <BoldWhiteHeading>Popular Playlists</BoldWhiteHeading>
          <DiscoverPlaylists navigation={navigation} route={route} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const discoverStyles = StyleSheet.create({
  logo: {
    height: 30,
    width: 110,
    marginTop: 5,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    // backgroundColor: 'red',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    margin: 15,
    marginTop: 0,
    paddingBottom: 40,
    marginBottom: 100,
  },
  sectionTitle: {
    fontFamily: 'Montserrat_800ExtraBold',
  },
});

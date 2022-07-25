import React, { useEffect, useRef } from 'react';
import {
  Image,
  ImageBackground, Linking, RefreshControl, View,
} from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Caption, Button } from 'react-native-paper';

import { useFocusEffect, useScrollToTop } from '@react-navigation/native';
import { HomeHeader } from './HomeHeader';
import { PollView } from './PollView';
import { ContentPostView } from './PostViews';

import { useGetOtherUserQuery, useGetPostsOfFollowingQuery } from '../../generated-components/apolloComponents';
import { HomeStackNavProps } from '../../navigation/app/home/HomeParamList';
import { useStoreState, useStoreActions } from '../../state-management/hooks';
import { StyledColumnView } from '../../styled-components/ReusedUI';
import { styles } from '../../styled-components/StyleSheet';
import { height, width } from '../../styled-components/theme';
import logo from '../../../assets/logo_img2.png';
import { getAccessToken } from '../../utils/accessToken';
import { Spinner } from '../../utils/Spinner';

export const openURL = (url: string) => {
  Linking.openURL(url).catch((err) => console.error('An error occurred while opening url', err));
};

export const emptyImage = 'https://www.pikpng.com/pngl/m/39-398340_emergency-medicine-physician-robert-tomsho-empty-profile-picture.png';

export const FeedView: React.FC<HomeStackNavProps<'Feed'>> = ({
  navigation,
  route,
}) => {
  const userState = useStoreState((state) => state.user.user);
  const [refreshing, setRefreshing] = React.useState(false);
  const ref = useRef(null);

  useScrollToTop(ref);

  const getNotificationsThunk = useStoreActions((actions) => (
    actions.notifications.getNotificationsThunk
  ));

  const {
    data: userData, loading: userLoading, error: userError, refetch: userRefetch,
  } = useGetOtherUserQuery({
    variables: {
      id: userState.id,
    },
  });

  React.useEffect(() => {
    getNotificationsThunk();
  }, []);

  useFocusEffect(() => {
    userRefetch();
    refetch();
  });

  const {
    data, loading, error, refetch,
  } = useGetPostsOfFollowingQuery();

  if (loading) {
    return <Spinner />;
  }
  if (error || !data) {
    console.log(error);
    return <Caption>Error...</Caption>;
  }

  const refreshFeeds = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const goToSearch = () => navigation.navigate('SearchPage');
  return (
    <ImageBackground
      style={styles.wavyBackgroundStyle}
      imageStyle={styles.wavyBackgroundImageStyle}
      source={require('../../local-assets/wavy.png')}
    >
      <HomeHeader navigation={navigation} />
      {userData?.getOtherUser.following.length <= 1 ? (
        <View style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 50,
        }}
        >
          <Image
            source={logo}
            style={{
              width: width * 0.7,
              height: height * 0.6,
              marginBottom: -120,
              marginTop: -40,
              marginLeft: -20,
            }}
          />

          <Button
            mode="contained"
            onPress={goToSearch}
            contentStyle={{
              paddingHorizontal: 15,
              paddingVertical: 8,
            }}
            labelStyle={{
              fontSize: 25,
              fontFamily: 'Montserrat_500Medium',
            }}
          >
            Find Friends
          </Button>
        </View>
      ) : (
        <ScrollView
          ref={ref}
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refreshFeeds}
            />
          )}
        >
          <StyledColumnView
            style={{ marginBottom: 100 }}
          >
            <FlatList
              data={data.getPostsOfFollowing.sort((a, b) => (
                b.timeSubmitted.localeCompare(a.timeSubmitted)
              ))}
              renderItem={({ item }) => (
                <StyledColumnView
                  style={{ paddingHorizontal: 10, paddingTop: 10 }}
                >
                  {item?.__typename === 'ArtistPost'
                || item?.__typename === 'AlbumPost'
                || item?.__typename === 'TrackPost'
                || item?.__typename === 'ThoughtsPost'
                || item?.__typename === 'Playlist' ? (
                  <ContentPostView
                    item={item}
                    navigation={navigation}
                    route={route}
                    refetchFeed={refetch}
                  />
                    ) : item?.__typename === 'Poll' && (
                      <PollView
                        item={item}
                        navigation={navigation}
                        route={route}
                        isLiked={item.likedUsers?.includes(+userState.id)}
                        refetchFeed={refetch}
                      />
                    )}
                </StyledColumnView>
              )}
              keyExtractor={(item, ix) => ix.toString()}
            />
          </StyledColumnView>
        </ScrollView>
      )}
    </ImageBackground>
  );
};

import React, { useEffect } from 'react';
import {
  Dimensions, View, ImageBackground, Text, Image,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper';
import { TabView, TabBar } from 'react-native-tab-view';

import { useFocusEffect } from '@react-navigation/native';
import Svg from 'react-native-svg';
import { HomeStackNavProps } from '../../navigation/app/home/HomeParamList';
import { LogoutButton } from '../authentication/components/LogoutButton';
import { FollowButton } from './FollowButton';
import { MessageButton } from './MessageButton';
import { UserPosts } from './user-posts/UserPosts';
import { UserTopFiveView } from './user-top-five/UserTopFiveView';
import { UserHeader } from './UserHeader';
import { useStoreActions, useStoreState } from '../../state-management/hooks';
import logo from '../../../assets/HomeIcon.png';

import getEnvVars from '../../../environment';

import {
  useGetOtherUserQuery,
  GetOtherUserDocument,
  GetOtherUserQuery,
  User,
  Maybe,
  TopFive,
} from '../../generated-components/apolloComponents';
import { client } from '../../index';
import { styles } from '../../styled-components/StyleSheet';
import { ThinLine } from '../../styled-components/ReusedUI';
import { profileStyles } from './styles';
import { orange700 } from '../../styled-components/colors';
import { PostsCounter } from './PostsCounter';
import { Spinner } from '../../utils/Spinner';

export const emptyImage = 'https://www.pikpng.com/pngl/m/39-398340_emergency-medicine-physician-robert-tomsho-empty-profile-picture.png';

const initialLayout = { width: Dimensions.get('window').width };
const { apiUrl } = getEnvVars();

export const UserView: React.FC<HomeStackNavProps<'UserPage'>> = ({
  navigation,
  route,
}) => {
  const userState = useStoreState((state) => state.user.user);
  const [index, setIndex] = React.useState(0);
  const [otherUser, setOtherUser] = React.useState<OtherUserData>({});
  const [routes] = React.useState([
    { key: 'first', title: 'Posts' },
    { key: 'second', title: 'Top 5' },
  ]);
  const { id } = route.params;
  const {
    data, loading, error, refetch,
  } = useGetOtherUserQuery({
    variables: {
      id,
    },
  });
  const createNewChat = useStoreActions((actions) => (
    actions.direct.createNewChat
  ));

  const goToChat = () => {
    createNewChat({
      id: +data.getOtherUser.id,
      username: data.getOtherUser.username,
      profilePicture: `${apiUrl}/${data.getOtherUser.profilePicture}`,
    });

    navigation.navigate('DirectMessages', {
      screen: 'DMChat',
      params: {
        partnerID: +data.getOtherUser.id,
        partnerName: data.getOtherUser.username,
        partnerPictureURL: `${apiUrl}/${data.getOtherUser.profilePicture}`,
      },
    });
  };

  useEffect(() => {
    try {
      const { getOtherUser: cacheData } = client.readQuery<GetOtherUserQuery>({
        query: GetOtherUserDocument,
        variables: {
          id,
        },
      });
    } catch (err) {
      console.log('no data yet', err);
    }
  });

  useEffect(() => {
    if (data) {
      setOtherUser(data.getOtherUser);
    }
    if (error) {
      console.log('error', error);
    }
  }, [data, loading, error]);

  useEffect(() => {
  }, [otherUser]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={{ backgroundColor: 'transparent' }}
      indicatorStyle={{
        backgroundColor: orange700,
        height: 4,
      }}
      labelStyle={{
        fontFamily: 'Montserrat_600SemiBold',
        letterSpacing: 0.8,
        fontSize: 13,
      }}
    />
  );

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <UserPosts navigation={navigation} route={route} id={id} />;
      case 'second':
        // TODO: take this as a prop from the navigation ...
        return <UserTopFiveView id={id} navigation={navigation} />;
      default:
        return null;
    }
  };

  if (loading) {
    return <Spinner />;
  }
  if (error || !data) {
    return <></>;
  }

  return (
    <ImageBackground
      style={styles.wavyBackgroundStyle}
      imageStyle={styles.wavyBackgroundImageStyle}
      source={require('../../local-assets/wavy.png')}
    >
      <UserHeader navigation={navigation} />
      {otherUser && otherUser.followers ? (
        <>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              // marginBottom: 30,
            }}
          >
            <View style={profileStyles.userInfo}>
              {otherUser.profilePicture ? (
                <Avatar.Image
                  size={140}
                  style={profileStyles.avatar}
                  source={{
                    uri: `${apiUrl}/${otherUser.profilePicture}`,
                  }}
                />
              ) : (
                <Avatar.Icon
                  size={140}
                  icon="account"
                />
              )}

              <View style={profileStyles.userInfoRight}>
                <View style={profileStyles.usernameWrap}>
                  <Text style={profileStyles.username}>
                    {otherUser.username}
                  </Text>
                </View>

                <View style={profileStyles.userCounts}>
                  <TouchableOpacity
                    style={profileStyles.countButton}
                    onPress={() => {
                      navigation.navigate('FollowersPage', {
                        id,
                        request: 'following',
                      });
                    }}
                  >
                    <Text style={profileStyles.countLabel}>
                      {otherUser.following.length > 1
                        ? `${otherUser.following.length - 1} FOLLOWING`
                        : `${0} FOLLOWING`}
                    </Text>
                  </TouchableOpacity>
                  <PostsCounter userId={id} />
                </View>
                <View style={profileStyles.userButtons}>
                  {id === userState.id ? (
                    <LogoutButton />
                  ) : (
                    <View style={profileStyles.followButtonsWrap}>
                      <FollowButton
                        id={id}
                        setOtherUser={setOtherUser}
                        follow={
                          !otherUser.followers.includes(userState.id)
                        }
                      />
                      <MessageButton onPress={goToChat} />
                    </View>
                  )}
                </View>
              </View>
            </View>

          </View>

          {/* <ThinLine style={{ marginHorizontal: 20 }} /> */}

          <TabView
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
          />
        </>
      ) : (
        <Spinner />
      )}
    </ImageBackground>
  );
};

export type OtherUserData = { __typename?: 'User' } & Pick<
  User,
  'id' | 'username' | 'email' | 'profilePicture' | 'followers' | 'following'
> & {
    topAlbums?: Maybe<
      Array<
        Maybe<
          { __typename?: 'TopFive' } & Pick<
            TopFive,
            'name' | 'imageUrl' | 'id' | 'artistNames'
          >
        >
      >
    >;
    topArtists?: Maybe<
      Array<
        Maybe<
          { __typename?: 'TopFive' } & Pick<TopFive, 'name' | 'imageUrl' | 'id'>
        >
      >
    >;
    topTracks?: Maybe<
      Array<
        Maybe<
          { __typename?: 'TopFive' } & Pick<
            TopFive,
            'name' | 'imageUrl' | 'id' | 'artistNames'
          >
        >
      >
    >;
  };

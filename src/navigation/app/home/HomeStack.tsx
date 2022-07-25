import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, ImageBackground } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSetUserHook } from '../../../modules/authentication/components/useSetUserHook';
import { AlbumPageView } from '../../../modules/content-pages/AlbumPageView';
import { ArtistPageView } from '../../../modules/content-pages/artist-page/ArtistPageView';
import { PlaylistPageView } from '../../../modules/content-pages/artist-page/PlaylistPageView';
import { ArtistPostsView } from '../../../modules/content-pages/ArtistPostsView';
import { TrackPageView } from '../../../modules/content-pages/TrackPageView';
import { CommentsView } from '../../../modules/home/comments/CommentsView';
import { FeedView } from '../../../modules/home/FeedView';
import { SearchButton } from '../../../modules/search/SearchButton';
import { SearchView } from '../../../modules/search/SearchView';
import { NotificationsPage } from '../../../modules/notifications/NotificatonsPage';
import { Followers } from '../../../modules/user/Followers';
import { SettingsView } from '../../../modules/user/user-settings/SettingsView';
import { UserOnBoarding } from '../../../modules/user/user-settings/UserOnBoarding';
import { UserView } from '../../../modules/user/UserView';
import { useStoreState } from '../../../state-management/hooks';
import { HomeParamList } from './HomeParamList';
import { Header } from '../header/Header';
import { SettingsHeader } from '../header/SettingsHeader';
import { PickGenres } from '../../../modules/user/user-settings/PickGenres';
import { Spinner } from '../../../utils/Spinner';

interface HomeStackProps {}

const Stack = createStackNavigator<HomeParamList>();
// more things will go here!!!
export const HomeStack: React.FC<HomeStackProps> = () => {
  const { colors } = useTheme();
  const userState = useStoreState((state) => state.user.user);
  const setCurrentUser = useSetUserHook();
  // const userData = client.readQuery<GetCurrentUserQuery>({
  //   query: GetCurrentUserDocument,
  // });

  if (!userState || !userState.username) {
    return <Spinner />;
  }

  return (
    <Stack.Navigator
      initialRouteName={userState.firstLogin ? 'UserOnBoarding' : 'Feed'}
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => {
          const { options } = scene.descriptor;
          const title = options.headerTitle !== undefined
            ? options.headerTitle
            : options.title !== undefined
              ? options.title
              : scene.route.name;

          return <Header navigation={navigation} title={title} />;
        },
      }}
    >
      <Stack.Screen
        name="Feed"
        options={{
          headerShown: false,
        }}
        component={FeedView}
      />

      {userState.firstLogin && (
        <Stack.Screen name="UserOnBoarding" component={UserOnBoarding} />
      )}

      <Stack.Screen name="ArtistPage" component={ArtistPageView} />
      <Stack.Screen name="ArtistPosts" component={ArtistPostsView} options={{ headerShown: false }} />
      <Stack.Screen name="AlbumPage" component={AlbumPageView} />
      <Stack.Screen name="TrackPage" component={TrackPageView} />
      <Stack.Screen
        name="UserPage"
        component={UserView}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="SearchPage" component={SearchView} />
      <Stack.Screen name="NotificationsPage" component={NotificationsPage} />
      <Stack.Screen
        name="SettingsPage"
        component={SettingsView}
        options={{
          header: ({ navigation }) => <SettingsHeader navigation={navigation} title="Settings" />,
        }}
      />
      <Stack.Screen
        name="PickGenres"
        component={PickGenres}
        options={{
          header: ({ navigation }) => <SettingsHeader navigation={navigation} title="Genre selection" />,
        }}
      />
      <Stack.Screen name="CommentPage" component={CommentsView} />
      <Stack.Screen name="FollowersPage" component={Followers} />
      {/* TODO: hide tabs on this view later  */}
      <Stack.Screen name="PlaylistPage" component={PlaylistPageView} />
    </Stack.Navigator>
  );
};

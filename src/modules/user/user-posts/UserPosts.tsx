import React, { useContext } from 'react';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import {
  Caption,
} from 'react-native-paper';
import { GestureResponderEvent, View } from 'react-native';
import { ThemeContext } from 'styled-components';

import { UserContentPostView } from './UserPostTypes';
import { FilterButton } from './FilterButtton';

import { useGetUserPostsQuery } from '../../../generated-components/apolloComponents';
import { HomeStackNavProps } from '../../../navigation/app/home/HomeParamList';
import { useStoreState } from '../../../state-management/hooks';
import { styles } from './styles';
import { Spinner } from '../../../utils/Spinner';

interface UserPostsProps {
  id: number;
}

type Status = 'checked' | 'unchecked';
type setFx = (value?: string | GestureResponderEvent) => void;

export const UserPosts: React.FC<
  UserPostsProps & HomeStackNavProps<'UserPage'>
> = ({ navigation, route, id }) => {
  const themeContext = useContext(ThemeContext);
  const currentUser = useStoreState((state) => state.user.user);
  const [artistStatus, setArtistStatus] = React.useState('checked');
  const [albumStatus, setAlbumStatus] = React.useState('checked');
  const [trackStatus, setTrackStatus] = React.useState('checked');
  const [playlistStatus, setPlaylistStatus] = React.useState('checked');
  const [pollStatus, setPollStatus] = React.useState('checked');
  const [thoughtsStatus, setThoughtsStatus] = React.useState('checked');

  const onArtistButtonToggle = () => {
    setArtistStatus(artistStatus === 'checked' ? 'unchecked' : 'checked');
  };

  const onAlbumButtonToggle = () => {
    setAlbumStatus(albumStatus === 'checked' ? 'unchecked' : 'checked');
  };

  const onTrackButtonToggle = () => {
    setTrackStatus(trackStatus === 'checked' ? 'unchecked' : 'checked');
  };

  const onPlaylistButtonToggle = () => {
    setPlaylistStatus(playlistStatus === 'checked' ? 'unchecked' : 'checked');
  };

  const onPollButtonToggle = () => {
    setPollStatus(pollStatus === 'checked' ? 'unchecked' : 'checked');
  };

  const onThoughtsButtonToggle = () => {
    setThoughtsStatus(thoughtsStatus === 'checked' ? 'unchecked' : 'checked');
  };

  const buttonArray = [
    ['artists', artistStatus, onArtistButtonToggle],
    ['albums', albumStatus, onAlbumButtonToggle],
    ['tracks', trackStatus, onTrackButtonToggle],
    ['playlists', playlistStatus, onPlaylistButtonToggle],
    ['polls', pollStatus, onPollButtonToggle],
    ['thoughts', thoughtsStatus, onThoughtsButtonToggle],
  ];

  const {
    data, loading, error, refetch,
  } = useGetUserPostsQuery({
    variables: {
      id,
    },
  });

  if (loading) {
    return <Spinner />;
  }
  if (error || !data) {
    return <Caption>Error...</Caption>;
  }

  return (
    <View
      style={{
        backgroundColor: themeContext.colors.backgroundContrast,
      }}
    >
      <ScrollView style={{
        backgroundColor: themeContext.colors.backgroundContrast,
      }}
      >
        <FlatList
          contentContainerStyle={styles.buttonContainer}
          showsVerticalScrollIndicator={false}
          directionalLockEnabled
          showsHorizontalScrollIndicator={false}
          horizontal
          data={buttonArray}
          renderItem={({ item }) => (
            <FilterButton
              label={String(item[0])}
              isActive={item[1] === 'checked'}
              onPress={item[2] as setFx}
            />
          )}
          keyExtractor={(item, ix) => ix.toString()}
        />

        <FlatList
          contentContainerStyle={{
            marginHorizontal: 20,
            display: 'flex',
            paddingBottom: 120,
            flexDirection: 'column-reverse',
          }}
          data={data.getUserPosts.sort((a, b) => a.timeSubmitted.localeCompare(b.timeSubmitted))}
          renderItem={({ item }) => (
            <View>
              {artistStatus === 'checked'
              && item?.__typename === 'ArtistPost' ? (
                <UserContentPostView
                  item={item}
                  navigation={navigation}
                  route={route}
                  refetch={refetch}
                  isOwner={+currentUser.id === +id}
                  user={currentUser}
                />
                ) : albumStatus === 'checked'
                && item?.__typename === 'AlbumPost' ? (
                  <UserContentPostView
                    item={item}
                    navigation={navigation}
                    route={route}
                    refetch={refetch}
                    isOwner={+currentUser.id === +id}
                    user={currentUser}
                  />
                  ) : trackStatus === 'checked'
                && item?.__typename === 'TrackPost' ? (
                  <UserContentPostView
                    item={item}
                    navigation={navigation}
                    route={route}
                    refetch={refetch}
                    isOwner={+currentUser.id === +id}
                    user={currentUser}
                  />
                    ) : playlistStatus === 'checked'
                && item?.__typename === 'Playlist' ? (
                  <UserContentPostView
                    item={item}
                    navigation={navigation}
                    route={route}
                    refetch={refetch}
                    isOwner={+currentUser.id === +id}
                    user={currentUser}
                  />
                      ) : pollStatus === 'checked'
                      && item?.__typename === 'Poll' ? (
                        <UserContentPostView
                          item={item}
                          navigation={navigation}
                          route={route}
                          refetch={refetch}
                          isOwner={+currentUser.id === +id}
                          user={currentUser}
                        />
                        ) : thoughtsStatus === 'checked'
                        && item?.__typename === 'ThoughtsPost' ? (
                          <UserContentPostView
                            item={item}
                            navigation={navigation}
                            route={route}
                            refetch={refetch}
                            isOwner={+currentUser.id === +id}
                            user={currentUser}
                          />
                          ) : (<></>)}
            </View>
          )}
          keyExtractor={(item, ix) => ix.toString()}
        />
      </ScrollView>
    </View>
  );
};

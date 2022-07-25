import React from 'react';
import {
  GestureResponderEvent, ImageBackground, View, Text, Platform,
} from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import {
  Caption,
  Title,
  ToggleButton,
} from 'react-native-paper';
import { useGetMyListQuery } from '../../generated-components/apolloComponents';
import { HomeStackNavProps } from '../../navigation/app/home/HomeParamList';
import { useStoreState } from '../../state-management/hooks';
import { cyanB, grayPlaceholder } from '../../styled-components/colors';
import { RowSpaceBetween } from '../../styled-components/ReusedUI';
import { styles } from '../../styled-components/StyleSheet';
import { Spinner } from '../../utils/Spinner';
import { MyListPostView } from './MyListPostView';
import { RemoveFromMyListButton } from './RemoveFromMyListButton';

interface MyListProps {}

type Status = 'checked' | 'unchecked';
type setFx = (value?: string | GestureResponderEvent) => void;

export const MyList: React.FC<MyListProps & HomeStackNavProps<'UserPage'>> = ({
  navigation,
  route,
}) => {
  const [artistStatus, setArtistStatus] = React.useState('checked');
  const [albumStatus, setAlbumStatus] = React.useState('checked');
  const [trackStatus, setTrackStatus] = React.useState('checked');
  const [playlistStatus, setPlaylistStatus] = React.useState('checked');

  // get user posts
  const userState = useStoreState((state) => state.user.user);
  const { data, loading, error } = useGetMyListQuery();

  if (loading) {
    return <Spinner />;
  }
  if (error || !data) {
    console.log(error);
    return <Caption>Error...</Caption>;
  }

  const onArtistButtonToggle = (value) => {
    setArtistStatus(artistStatus === 'checked' ? 'unchecked' : 'checked');
  };

  const onAlbumButtonToggle = (value) => {
    setAlbumStatus(albumStatus === 'checked' ? 'unchecked' : 'checked');
  };

  const onTrackButtonToggle = (value) => {
    setTrackStatus(trackStatus === 'checked' ? 'unchecked' : 'checked');
  };

  const onPlaylistButtonToggle = (value) => {
    setPlaylistStatus(playlistStatus === 'checked' ? 'unchecked' : 'checked');
  };

  const buttonArray = [
    ['artist', artistStatus, onArtistButtonToggle],
    ['album', albumStatus, onAlbumButtonToggle],
    ['music', trackStatus, onTrackButtonToggle],
    ['playlist-music', playlistStatus, onPlaylistButtonToggle],
  ];

  return (
    <ImageBackground
      style={styles.wavyBackgroundStyle}
      imageStyle={styles.wavyBackgroundImageStyle}
      source={require('../../local-assets/wavy.png')}
    >
      <ScrollView
        contentContainerStyle={{
          paddingBottom: Platform.OS === 'ios' ? 100 : 50,
        }}
      >
        <View
          style={{
            margin: 30,
            marginTop: 50,
          }}
        >
          <Text
            style={{
              color: '#ffffff',
              fontFamily: 'Montserrat_600SemiBold',
              fontSize: 24,
              marginBottom: 30,
            }}
          >
            List
          </Text>
          <FlatList
            contentContainerStyle={{
              // justifyContent: 'space-around',
              flexDirection: 'row',
              paddingBottom: 20,
            }}
            horizontal
            data={buttonArray}
            renderItem={({ item }) => (
              <Text
                onPress={item[2] as setFx}
                style={{
                  fontFamily: 'Montserrat_400Regular',
                  marginRight: 15,
                  // marginLeft: -20,
                  letterSpacing: 0.8,
                  fontSize: 12,
                  color: item[1] === 'checked' ? '#ffffff' : grayPlaceholder,
                  textTransform: 'uppercase',
                  borderWidth: 1,
                  borderColor: item[1] === 'checked' ? cyanB : grayPlaceholder,
                  padding: 10,
                  borderRadius: 19,
                }}
              >
                {item[0] === 'playlist-music'
                  ? 'playlist'
                  : item[0] === 'music'
                    ? 'track'
                    : item[0]}
              </Text>
            )}
            keyExtractor={(item, ix) => ix.toString()}
          />

          <FlatList
            data={data.getMyList}
            renderItem={({ item }) => (
              <View>
                {artistStatus === 'checked'
                && item?.__typename === 'ArtistPost' ? (
                  <RowSpaceBetween>
                    <MyListPostView
                      item={item}
                      navigation={navigation}
                      route={route}
                    />
                    <RemoveFromMyListButton
                      postId={+item.id}
                      postType="artist"
                    />
                  </RowSpaceBetween>
                  ) : albumStatus === 'checked'
                  && item?.__typename === 'AlbumPost' ? (
                    <RowSpaceBetween>
                      <MyListPostView
                        item={item}
                        navigation={navigation}
                        route={route}
                      />
                      <RemoveFromMyListButton
                        postId={+item.id}
                        postType="album"
                      />
                    </RowSpaceBetween>
                    ) : trackStatus === 'checked'
                  && item?.__typename === 'TrackPost' ? (
                    <RowSpaceBetween>
                      <MyListPostView
                        item={item}
                        navigation={navigation}
                        route={route}
                      />
                      <RemoveFromMyListButton
                        postId={+item.id}
                        postType="track"
                      />
                    </RowSpaceBetween>
                      ) : playlistStatus === 'checked'
                  && item?.__typename === 'Playlist' ? (
                    <RowSpaceBetween>
                      <MyListPostView
                        item={item}
                        navigation={navigation}
                        route={route}
                      />
                      <RemoveFromMyListButton
                        postId={+item.id}
                        postType="playlist"
                      />
                    </RowSpaceBetween>
                        ) : (
                          <></>
                        )}
              </View>
            )}
            keyExtractor={(item, ix) => ix.toString()}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

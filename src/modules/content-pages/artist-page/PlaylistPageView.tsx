import React, { useContext } from 'react';
import {
  Title,
  Card,
  Caption,
  Subheading,
  Avatar,
  List,
  IconButton,
} from 'react-native-paper';
import { ScrollView, FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import {
  Image, Text, ImageBackground, View, StyleSheet,
} from 'react-native';
import { ThemeContext } from 'styled-components';
import { HomeStackNavProps } from '../../../navigation/app/home/HomeParamList';
import {
  StyledColumnView,
  RoundImage,
} from '../../../styled-components/ReusedUI';
import { openURL, emptyImage } from '../../home/FeedView';
import { styles } from '../../../styled-components/StyleSheet';
import getEnvVars from '../../../../environment';

import playIcon from '../../../../assets/play_icon.png';

const { apiUrl } = getEnvVars();

interface PlaylistPageViewProps {}

export const PlaylistPageView: React.FC<HomeStackNavProps<'PlaylistPage'>> = ({
  route,
  navigation,
}) => {
  const themeContext = useContext(ThemeContext);
  const { playlist } = route.params;
  return (
    <ImageBackground
      style={styles.wavyBackgroundStyle}
      imageStyle={styles.wavyBackgroundImageStyle}
      source={require('../../../local-assets/wavy.png')}
    >
      <ScrollView
        style={{
          marginBottom: 200,
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <RoundImage
            style={{ width: 200, height: 200, marginTop: 20 }}
            resizeMode="contain"
            source={{
              uri: `${playlist.playlistPicture}`,
            }}
          />
          <Title>{playlist.title}</Title>
          <Caption>{playlist.description}</Caption>

          {playlist.user && (
            <TouchableOpacity
              style={playlistStyles.cardAuthor}
              onPress={() => (
                navigation.navigate('UserPage', { id: +playlist?.user.id })
              )}
            >
              <View style={playlistStyles.avatarWrap}>
                <Avatar.Image
                  size={30}
                  source={{
                    uri: `${apiUrl}/${
                      playlist?.user.profilePicture
                        ? playlist?.user.profilePicture
                        : emptyImage
                    }`,
                  }}
                />
              </View>

              <Text style={playlistStyles.cardAuthorName}>
                {playlist?.user.username}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <StyledColumnView>
          <FlatList
            data={playlist.tracks}
            renderItem={(item) => (
              <List.Item
                onPress={() => {
                  navigation.navigate('TrackPage', {
                    id: item?.item.id,
                    name: item?.item.name,
                    artistNames: item.item?.artists?.map((i) => i),
                    imageUrl: item.item.trackImageUrl,
                  });
                }}
                title={item.item?.name}
                description={item.item?.artists?.map((i, ix) => i)}
                left={(props) => (
                  <Avatar.Image
                    size={30}
                    style={{
                      marginTop: 8,
                      marginRight: 15,
                    }}
                    source={{
                      uri: `${item.item.trackImageUrl}`,
                    }}
                  />
                )}
                right={() => (
                  // <IconButton
                  //   color={themeContext.colors.primary}
                  //   icon="play-circle"
                  //   onPress={() => openURL(`${item.item.externalUrl}`)}
                  // />
                  <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  >
                    <Image
                      source={playIcon}
                      style={{
                        width: 24,
                        height: 24,
                        backgroundColor: 'white',
                        borderRadius: 50,
                      }}
                    />
                  </View>
                )}
              />
            )}
            keyExtractor={(item, ix) => ix.toString().concat(item.toString())}
          />
        </StyledColumnView>
      </ScrollView>
    </ImageBackground>
  );
};

const playlistStyles = StyleSheet.create({
  cardAuthor: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 25,
    paddingRight: 15,
  },
  cardAuthorName: {
    marginLeft: 12,
    color: '#ffffff',
    fontFamily: 'Montserrat_700Bold',
    fontSize: 18,
  },
});

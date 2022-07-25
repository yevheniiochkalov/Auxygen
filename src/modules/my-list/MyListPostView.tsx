import React, { useContext } from 'react';
import {
  Card,
  Caption,
  Title,
  Paragraph,
  Button,
  Text,
  List,
  Avatar,
  IconButton,
} from 'react-native-paper';
import {
  Image, Linking, TouchableOpacity, View,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import { ThemeContext } from 'styled-components';
import {
  AlbumPost,
  User,
  TrackPost,
  ArtistPost,
  Playlist,
} from '../../generated-components/apolloComponents';
import { HomeStackNavProps } from '../../navigation/app/home/HomeParamList';
import {
  StyledColumnView,
  RoundImage,
  Row,
  OrangeCaption,
} from '../../styled-components/ReusedUI';
import { emptyImage } from '../home/FeedView';
import { PostLikeButton } from '../home/PostLikeButton';

interface AlbumPostProps {
  item: AlbumPost;
}

interface TrackPostProps {
  item: TrackPost;
}

interface ArtistPostProps {
  item: ArtistPost;
}

interface ContentPostProps {
  item: ArtistPost | TrackPost | AlbumPost | Playlist;
}

export const MyListPostView: React.FC<
  ContentPostProps & HomeStackNavProps<'UserPage'>
> = ({ item, navigation, route }) => {
  const themeContext = useContext(ThemeContext);
  return (
    <TouchableOpacity
      style={{
        marginVertical: 20,
        marginRight: 20,
        width: 250,
      }}
      onPress={() => {
        item.__typename === 'AlbumPost'
          ? navigation.navigate('AlbumPage', {
            id: item?.albumId,
            name: item?.albumName,
            imageUrl: item.imageUrl,
          })
          : item.__typename === 'TrackPost'
            ? navigation.navigate('TrackPage', {
              id: item?.trackId,
              name: item?.trackName,
              artistNames: item?.artistNames,
              imageUrl: item?.imageUrl,
            })
            : item.__typename === 'ArtistPost'
              ? navigation.navigate('ArtistPage', {
                id: item?.artistId,
                name: item?.artistName,
                imageUrl: item.imageUrl,
              })
              : item.__typename === 'Playlist'
                ? navigation.navigate('PlaylistPage', {
                  playlist: item,
                })
                : null;
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          // alignContent: "center",

          // marginHorizontal: 10,
        }}
      >
        <RoundImage
          style={{ width: 130, height: 130 }}
          resizeMode="contain"
          source={{
            uri: `${
              item.__typename === 'Playlist'
                ? item.playlistPicture
                : item.imageUrl
            }`,
          }}
        />

        {/* Text */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',

            // alignItems: "flex-start",
            // justifyContent: "flex-start",
            paddingHorizontal: 10,
          }}
        >
          {item.__typename === 'AlbumPost' ? (
            <Row>
              <OrangeCaption style={{ bottom: 2 }}> ALBUM</OrangeCaption>
              <StarRating
                disabled
                maxStars={5}
                fullStar="star"
                halfStar="star-half"
                starSize={15}
                fullStarColor={themeContext.colors.accent}
                emptyStarColor={themeContext.colors.accent}
                rating={item.rating}
                selectedStar={() => {}}
              />
            </Row>
          ) : item.__typename === 'TrackPost' ? (
            <Row>
              <OrangeCaption style={{ top: 7, marginRight: 3 }}>
                TRACK
              </OrangeCaption>
              {item?.vote === 1 ? (
                <IconButton
                  size={15}
                  icon="thumb-up-outline"
                  color={themeContext.colors.accent}
                />
              ) : (
                <IconButton
                  size={15}
                  icon="thumb-down-outline"
                  color={themeContext.colors.accent}
                />
              )}
            </Row>
          ) : item.__typename === 'ArtistPost' ? (
            <OrangeCaption>ARTIST</OrangeCaption>
          ) : item.__typename === 'Playlist' ? (
            <OrangeCaption>PLAYLIST</OrangeCaption>
          ) : null}

          <Title
            style={{
              paddingRight: 30,
              marginRight: 40,
              fontSize: 17,
            }}
          >
            {item.__typename === 'AlbumPost'
              ? item.albumName
              : item.__typename === 'TrackPost'
                ? item.trackName
                : item.__typename === 'ArtistPost'
                  ? item.artistName
                  : item.__typename === 'Playlist'
                    ? item.title
                    : null}
          </Title>
          {/* <Text>
            {item.__typename === "Playlist" ? item.description : item.text}
          </Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

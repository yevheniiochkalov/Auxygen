import React, { useContext } from 'react';
import {
  Image, Linking, TouchableOpacity, View,
} from 'react-native';
import {
  Avatar,
  Button,
  Caption,
  Card,
  IconButton,
  Paragraph,
  Text,
  Title,
} from 'react-native-paper';
import StarRating from 'react-native-star-rating';
import { ThemeContext } from 'styled-components';
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu'; // 0.8.0
import {
  AlbumPost,
  ArtistPost,
  Playlist,
  Poll,
  ThoughtsPost,
  TrackPost,
  User,
} from '../../../generated-components/apolloComponents';
import { deletePost } from '../../../generated-components/deletePost';
import { HomeStackNavProps } from '../../../navigation/app/home/HomeParamList';
import {
  OrangeCaption,
  RoundImage,
  Row,
} from '../../../styled-components/ReusedUI';
import { CommentsAndLikes } from '../../home/CommentsAndLikes';
import { PollView } from '../../home/PollView';
import { width } from '../../../styled-components/theme';

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
  item: ArtistPost | TrackPost | AlbumPost | Playlist | Poll | ThoughtsPost;
  refetch: any,
  isOwner: boolean,
  user: User
}

export const UserContentPostView: React.FC<
  ContentPostProps & HomeStackNavProps<'UserPage'>
> = ({
  item, navigation, route, refetch, isOwner, user,
}) => {
  const themeContext = useContext(ThemeContext);

  const handleDelete = async () => {
    await deletePost(+item.id, item.__typename);
    refetch();
  };

  const goToPost = () => {
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
  };

  if (item.__typename === 'Poll') {
    return (
      <PollView
        item={item}
        navigation={navigation}
        route={route}
        showAvatar={false}
        handleDelete={handleDelete}
        isOwner={isOwner}
        isLiked={item.likedUsers?.includes(+user.id)}
      />
    );
  }

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginVertical: 20,
        marginRight: 20,
        position: 'relative',
      }}
    >
      {isOwner && (
      <Menu style={{
        position: 'absolute',
        top: -10,
        left: width * 0.8,
        zIndex: 10,
      }}
      >
        <MenuTrigger>
          <IconButton
            icon="dots-vertical"
            size={25}
            disabled
            style={{
              opacity: 0.8,
            }}
          />
        </MenuTrigger>
        <MenuOptions
          optionsContainerStyle={{
            marginTop: 30,
          }}
        >
          <MenuOption onSelect={handleDelete}>
            <Text style={{ color: 'red' }}>Delete</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
      )}

      {item.__typename === 'ThoughtsPost' ? (
        <Avatar.Image
          style={{
            marginTop: 5,
            marginRight: 5,
          }}
          size={50}
          source={{
            uri: `${item?.user?.profilePicture}`,
          }}
        />
      ) : (
        <TouchableOpacity
          onPress={goToPost}
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
        </TouchableOpacity>

      )}

      {/* Text */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingHorizontal: 10,
          paddingRight: 30,
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
            {/* {isOwner && (
              <Menu>
                <MenuTrigger>
                  <IconButton
                    icon="dots-vertical"
                    size={25}
                    disabled
                  />
                </MenuTrigger>
                <MenuOptions
                  optionsContainerStyle={{
                    marginLeft: 100,
                    marginTop: 30,
                  // position: 'absolute',
                  // top: -150,
                  // right: 30,
                  }}
                >
                  <MenuOption onSelect={handleDelete}>
                    <Text style={{ color: 'red' }}>Delete</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            )} */}
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
            {/* {isOwner && (
              <Menu>
                <MenuTrigger>
                  <IconButton
                    icon="dots-vertical"
                    size={25}
                    disabled
                  />
                </MenuTrigger>
                <MenuOptions
                  optionsContainerStyle={{
                    marginLeft: 100,
                    marginTop: 30,
                  // position: 'absolute',
                  // top: -150,
                  // right: 30,
                  }}
                >
                  <MenuOption onSelect={handleDelete}>
                    <Text style={{ color: 'red' }}>Delete</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            )} */}
          </Row>
        ) : item.__typename === 'ArtistPost' ? (
          <>
            <OrangeCaption>ARTIST</OrangeCaption>

          </>
        ) : item.__typename === 'Playlist' ? (
          <>
            <OrangeCaption>PLAYLIST</OrangeCaption>

          </>
        ) : item.__typename === 'ThoughtsPost' ? (
          <OrangeCaption>THOUGHTS</OrangeCaption>
        ) : null}

        <TouchableOpacity
          onPress={goToPost}
        >
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
          <View
            style={{
              flexDirection: 'row',
              marginRight: 40,
              paddingRight: 40,
            }}
          >
            <Text
              style={{
                flexShrink: 1,
                marginBottom: 20,
              }}
            >
              {item.__typename === 'Playlist' ? item.description : item.text}

            </Text>
          </View>
        </TouchableOpacity>

        <CommentsAndLikes
          navigation={navigation}
          item={item}
          route={route}
          isLiked={item.likedUsers?.includes(+user.id)}
        />

      </View>
    </View>
  );
};

export const ArtistPostView: React.FC<
  ArtistPostProps & HomeStackNavProps<'UserPage'>
> = ({ item, navigation, route }) => (
  <Card>
    {/* TODO: make a global style for centering */}
    <Card.Content style={{ alignItems: 'center' }}>
      <Image
        style={{ width: 100, height: 100 }}
        resizeMode="contain"
        source={{
          uri: `${item.imageUrl}`,
        }}
      />

      <Caption>ARTIST</Caption>
      <Title>{item?.artistName}</Title>
      <Paragraph>{item?.text}</Paragraph>
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate('ArtistPage', {
            id: item?.artistId,
            name: item?.artistName,
            imageUrl: item.imageUrl,
          });
        }}
      >
        SEE ARTIST
      </Button>
    </Card.Content>
  </Card>
);

export const AlbumPostView: React.FC<
  AlbumPostProps & HomeStackNavProps<'UserPage'>
> = ({ item, navigation, route }) => (
  <Card>
    {/* TODO: make a global style for centering */}
    <Card.Content style={{ alignItems: 'center' }}>
      <Image
        style={{ width: 100, height: 100 }}
        resizeMode="contain"
        source={{
          uri: `${item.imageUrl}`,
        }}
      />

      <Caption>ALBUM</Caption>
      {/* <StarRating disabled={true} rating={item?.rating} /> */}
      <Title>{item?.albumName}</Title>
      <Paragraph>{item?.text}</Paragraph>
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate('AlbumPage', {
            id: item?.albumId,
            name: item?.albumName,
            imageUrl: item.imageUrl,
          });
        }}
      >
        SEE ALBUM
      </Button>
    </Card.Content>
  </Card>
);

export const TrackPostView: React.FC<
  TrackPostProps & HomeStackNavProps<'UserPage'>
> = ({ item, navigation, route }) => {
  const openURL = (url: string) => {
    Linking.openURL(url).catch((err) => console.error('An error occurred while opening url', err));
  };
  return (
    <Card>
      <Card.Content style={{ alignItems: 'center' }}>
        {/* TODO: make a global style for centering */}

        <Image
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
          source={{
            uri: `${item.imageUrl}`,
          }}
        />

        <Caption>TRACK</Caption>
        <Button
          onPress={() => {
            navigation.navigate('TrackPage', {
              id: item?.trackId,
              name: item?.trackName,
              artistNames: item?.artistNames,
              imageUrl: item?.imageUrl,
            });
          }}
        >
          <Title>{item?.trackName}</Title>
        </Button>
        <Paragraph>{item?.text}</Paragraph>
        <Button
          mode="contained"
          onPress={() => {
            openURL(`${item.externalUrl}`);
          }}
        >
          SEE TRACK ON SPOTIFY
        </Button>
      </Card.Content>
    </Card>
  );
};

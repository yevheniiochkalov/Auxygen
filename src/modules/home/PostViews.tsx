import React, { useContext, useState } from 'react';
import {
  Image, Text, ToastAndroid, View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  Avatar,
  Button,
  Caption,
  Card,
  IconButton,
  List,
  Paragraph,
  Snackbar,
  Title,
} from 'react-native-paper';
import StarRating from 'react-native-star-rating';
import { ThemeContext } from 'styled-components';
import { LinearGradient } from 'expo-linear-gradient';

import { AddToMyListButton } from '../my-list/AddToMyListButton';
import { CommentsAndLikes } from './CommentsAndLikes';
import { emptyImage, openURL } from './FeedView';
import { PostLikeButton } from './PostLikeButton';

import {
  LeftColumn,
  LineBreak,
  OrangeCaption,
  Row,
  SimpleColumn,
  StyledColumnView,
  ThinLine,
} from '../../styled-components/ReusedUI';
import { HomeStackNavProps } from '../../navigation/app/home/HomeParamList';
import {
  AlbumPost,
  ArtistPost,
  Playlist,
  ThoughtsPost,
  TrackPost,
} from '../../generated-components/apolloComponents';
import { timeSince } from '../../utils/timeSince';
import { styles } from './styles';
import { orange700 } from '../../styled-components/colors';
import getEnvVars from '../../../environment';
import { useStoreState } from '../../state-management/hooks';

const { apiUrl } = getEnvVars();
interface ContentPostProps {
  item: ArtistPost | TrackPost | AlbumPost | Playlist | ThoughtsPost;
  refetchFeed: () => void
}

export const ContentPostView: React.FC<
  ContentPostProps & HomeStackNavProps<'Feed'>
> = ({
  item, navigation, route, refetchFeed,
}) => {
  const user = useStoreState((state) => state.user.user);
  const themeContext = useContext(ThemeContext);
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);

  const onTextLayout = React.useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 4);
  }, []);

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  return (
    <Card style={styles.card}>
      <Card.Content
        style={{
          paddingHorizontal: 0,
          paddingVertical: 0,
          paddingLeft: 20,
          paddingTop: item.__typename === 'ThoughtsPost' ? 20 : 0,
        }}
      >
        {/** ***********  Content Image + Add to My List  ************ */}
        {/* Content Image  TODO: music preview on press */}
        {item.__typename !== 'ThoughtsPost' && (
        <Row style={{ justifyContent: 'space-around', paddingRight: 10 }}>
          <View
            style={{
              // TODO: modify for android
              shadowColor: themeContext.colors.primary,
              shadowOffset: { width: 0.5, height: 5 },
              shadowOpacity: 0.3,
            }}
          >
            <Image
              style={{
                width: 260,
                height: 260,
                left: -30,
                top: -40,
                borderRadius: 7,
              }}
              resizeMode="contain"
              source={{
                uri: `${
                  item.__typename === 'Playlist'
                    ? item.playlistPicture
                    : item.imageUrl
                }`,
              }}
            />
          </View>

          {/* <Text
                    style={{
                      paddingRight: 5,
                      color: themeContext.colors.accent,
                      marginTop: 20,
                      fontFamily: 'Montserrat_600SemiBold',
                    }}
                  >
                    Saved to list
                  </Text> */}
          <AddToMyListButton
            postId={+item.id}
            postType={
              item.__typename === 'AlbumPost'
                ? 'album'
                : item.__typename === 'TrackPost'
                  ? 'track'
                  : item.__typename === 'ArtistPost'
                    ? 'artist'
                    : 'playlist'
            }
          />
        </Row>
        )}
        <SimpleColumn>
          {/** *********** User Submission + Time  ************ */}
          <LeftColumn>
            <TouchableOpacity
              style={styles.userContainer}
              onPress={() => {
                navigation.navigate('UserPage', { id: +item?.user?.id });
              }}
            >
              <Avatar.Image
                size={55}
                source={{
                  uri: `${apiUrl}/${
                    item?.user?.profilePicture
                      ? item?.user?.profilePicture
                      : emptyImage
                  }`,
                }}
              />

              <View style={styles.userRight}>
                <Text style={styles.username}>
                  {item?.user?.username}
                </Text>
                <Text style={styles.timeSubmitted}>
                  {timeSince(item?.timeSubmitted)}
                </Text>
              </View>
            </TouchableOpacity>
          </LeftColumn>
          <ThinLine />

          {/** *********** Main Content + Navigate to Content Page ************ */}

          <LeftColumn>
            {item.__typename === 'AlbumPost' ? (
              <Row>
                <OrangeCaption style={styles.postTypeCaption}>ALBUM</OrangeCaption>
                <StarRating
                  disabled
                  maxStars={5}
                  fullStar="star"
                  halfStar="star-half"
                  starSize={15}
                  fullStarColor={orange700}
                  emptyStarColor={orange700}
                  rating={item.rating}
                  selectedStar={() => {}}
                />
              </Row>
            ) : item.__typename === 'TrackPost' ? (
              <Row style={{ display: 'flex', alignItems: 'center' }}>
                <OrangeCaption style={styles.postTypeCaption}>
                  TRACK
                </OrangeCaption>
                {item?.vote !== 0 && (item?.vote === 1 ? (
                  <IconButton
                    size={15}
                    icon="thumb-up-outline"
                    color={orange700}
                  />
                ) : (
                  <IconButton
                    size={15}
                    icon="thumb-down-outline"
                    color={orange700}
                  />
                ))}
              </Row>
            ) : item.__typename === 'ArtistPost' ? (
              <OrangeCaption style={styles.postTypeCaption}>ARTIST</OrangeCaption>
            ) : item.__typename === 'Playlist' ? (
              <View style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
              }}
              >
                <OrangeCaption style={styles.postTypeCaption}>PLAYLIST</OrangeCaption>
              </View>
            ) : (
              <OrangeCaption style={styles.postTypeCaption}>THOUGHTS</OrangeCaption>
            )}

            {item.__typename !== 'ThoughtsPost' && (
            <TouchableOpacity
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
              <Title style={styles.cardTitle}>
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
            </TouchableOpacity>
            )}

            <Text
              style={
                item.__typename === 'ThoughtsPost' ? (
                  [styles.cardDescription, {
                    marginTop: 20,
                  }]
                ) : (
                  styles.cardDescription
                )
              }
              onTextLayout={onTextLayout}
              numberOfLines={textShown ? undefined : 4}
            >
              {item.__typename === 'Playlist' ? item.description : item.text}
            </Text>
            {lengthMore && (
              <Button
                onPress={toggleNumberOfLines}
                icon={textShown ? 'arrow-up' : 'arrow-down'}
                contentStyle={{ marginTop: 10 }}
                labelStyle={{
                  color: '#ffffff',
                  fontFamily: 'Montserrat_400Regular',
                  fontSize: 13,
                }}
              >
                {textShown ? 'Read less' : 'Read more'}
              </Button>
            )}
          </LeftColumn>
        </SimpleColumn>
        <LineBreak />

        {/** *********** Links ************ */}
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {/* Comments & Likes */}
          <CommentsAndLikes
            navigation={navigation}
            item={item}
            route={route}
            isLiked={item.likedUsers?.includes(+user.id)}
            refetchFeed={refetchFeed}
          />

          {/* Go To Spotify  */}
          {item.__typename === 'Playlist' || item.__typename === 'ThoughtsPost' ? (
            <></>
          ) : (
            <TouchableOpacity
              style={{ borderBottomRightRadius: 12 }}
              onPress={() => {
                openURL(`${item.externalUrl}`);
              }}
            >
              <LinearGradient
                style={{
                  padding: 14,
                  paddingRight: 15,
                  paddingLeft: 15,
                  borderRadius: 12,
                }}
                colors={['#422287', '#812fd3']}
                start={{
                  x: 0,
                  y: 1,
                }}
                end={{
                  x: 1,
                  y: 1,
                }}
              >
                <Text style={{
                  color: '#ffffff',
                  fontFamily: 'Montserrat_400Regular',
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                  fontSize: 10,
                }}
                >
                  play on spotify
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </Card.Content>
    </Card>
  );
};

/*
 *
 *
 *
// #######################################
// #######################################
// END OF USEFUL CODE
// #######################################
// #######################################
 *
 *
 *
 *
 */

interface AlbumPostProps {
  item: AlbumPost;
}

interface TrackPostProps {
  item: TrackPost;
}

interface ArtistPostProps {
  item: ArtistPost;
}

export const ArtistPostView: React.FC<
  ArtistPostProps & HomeStackNavProps<'Feed'>
> = ({ item, navigation, route }) =>
  // //console..log("artist post", item.user);
  (
    <Card>
      {/* TODO: make a global style for centering */}
      <Card.Content style={{ alignItems: 'center' }}>
        <Image
          style={{ width: 200, height: 200 }}
          resizeMode="contain"
          source={{
            uri: `${item.imageUrl}`,
          }}
        />
        {item.user ? (
          <StyledColumnView>
            {/* <Caption>{item.user.username}</Caption> */}
            <List.Item
              title={item?.user.username}
              // description={item?.user.username}
              onPress={() => {
                navigation.navigate('UserPage', { id: +item?.user.id });
              }}
              left={(props) => (
                <Avatar.Image
                  size={20}
                  source={{
                    uri: `${apiUrl}/${
                      item?.user.profilePicture
                        ? item?.user.profilePicture
                        : emptyImage
                    }`,
                  }}
                />
              )}
            />
          </StyledColumnView>
        ) : (
          <></>
        )}
        <AddToMyListButton postId={+item.id} postType="artist" />
        <Text>{item?.timeSubmitted}</Text>
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
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate('CommentPage', {
              postId: +item.id,
              postType: 'artist',
              contentId: item?.artistId,
              name: item?.artistName,
              imageUrl: item.imageUrl,
            });
          }}
        >
          SEE COMMENTS
        </Button>
        <PostLikeButton postType="artist" postId={+item.id} />
        <Paragraph>{`Likes: ${item.likes}`}</Paragraph>
      </Card.Content>
    </Card>
  );
export const AlbumPostView: React.FC<
  AlbumPostProps & HomeStackNavProps<'Feed'>
> = ({ item, navigation, route }) => (
  <Card>
    {/* TODO: make a global style for centering */}
    <Card.Content style={{ alignItems: 'center' }}>
      <AddToMyListButton postId={+item.id} postType="album" />
      <Image
        style={{ width: 200, height: 200 }}
        resizeMode="contain"
        source={{
          uri: `${item.imageUrl}`,
        }}
      />

      {item.user ? (
        <StyledColumnView>
          <Caption>{item.user.username}</Caption>
          <List.Item
            title={item?.user.username}
            description={item?.user.username}
            onPress={() => {
              navigation.navigate('UserPage', { id: +item?.user.id });
            }}
            left={(props) => (
              <Avatar.Image
                size={20}
                source={{
                  uri: `${apiUrl}/${
                    item?.user.profilePicture
                      ? item?.user.profilePicture
                      : emptyImage
                  }`,
                }}
              />
            )}
          />
        </StyledColumnView>
      ) : (
        <></>
      )}

      <Text>{item?.timeSubmitted}</Text>
      <Caption>ALBUM</Caption>
      {/* <StarRating disabled={true} rating={item?.rating} /> */}
      <Title>{item?.albumName}</Title>
      <Paragraph>{item?.text}</Paragraph>
      <Button
        mode="contained"
        onPress={() => {
          // //console..log("album button");
          navigation.navigate('AlbumPage', {
            id: item?.albumId,
            name: item?.albumName,
            imageUrl: item.imageUrl,
          });
        }}
      >
        SEE ALBUM
      </Button>
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate('CommentPage', {
            postId: +item.id,
            postType: 'album',
            contentId: item?.albumId,
            name: item?.albumName,
            imageUrl: item.imageUrl,
          });
        }}
      >
        SEE COMMENTS
      </Button>
      <PostLikeButton postType="album" postId={+item.id} />
      <Paragraph>{`Likes: ${item.likes}`}</Paragraph>
    </Card.Content>
  </Card>
);

export const TrackPostView: React.FC<
  TrackPostProps & HomeStackNavProps<'Feed'>
> = ({ item, navigation, route }) => (
  <Card>
    {/* TODO: make a global style for centering */}
    <Card.Content style={{ alignItems: 'center' }}>
      <AddToMyListButton postId={+item.id} postType="track" />
      <Image
        style={{ width: 200, height: 200 }}
        resizeMode="contain"
        source={{
          uri: `${item.imageUrl}`,
        }}
      />
      {item.user ? (
        <StyledColumnView>
          <Caption>{item.user.username}</Caption>
          <List.Item
            title={item?.user.username}
            description={item?.user.username}
            onPress={() => {
              navigation.navigate('UserPage', { id: +item?.user.id });
            }}
            left={(props) => (
              <Avatar.Image
                size={20}
                source={{
                  uri: `${apiUrl}/${
                    item?.user.profilePicture
                      ? item?.user.profilePicture
                      : emptyImage
                  }`,
                }}
              />
            )}
          />
        </StyledColumnView>
      ) : (
        <></>
      )}
      <Text>{item?.timeSubmitted}</Text>
      <Caption>TRACK</Caption>
      {item?.vote === 1 ? (
        <Button icon="thumb-up-outline" />
      ) : (
        <Button icon="thumb-down-outline" />
      )}
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
          // navigation.navigate("ArtistPage", {
          //   id: item?.artistId,
          //   name: item?.artistName,

          // });
        }}
      >
        SEE TRACK ON SPOTIFY
      </Button>
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate('CommentPage', {
            postId: +item.id,
            postType: 'track',
            contentId: item?.trackId,
            name: item?.trackName,
            imageUrl: item.imageUrl,
          });
        }}
      >
        SEE COMMENTS
      </Button>
      <PostLikeButton postType="track" postId={+item.id} likedUsers={item.likedUsers} />
      <Paragraph>{`Likes: ${item.likes}`}</Paragraph>
    </Card.Content>
  </Card>
);

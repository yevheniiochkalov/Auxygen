import React, { useContext } from 'react';
import {
  Title,
  Card,
  Caption,
  List,
  Avatar,
  Paragraph,
  Button,
  IconButton,
} from 'react-native-paper';
import {
  Image, Text, View, TouchableOpacity,
} from 'react-native';
import { ThemeContext } from 'styled-components';
import StarRating from 'react-native-star-rating';
import { HomeStackNavProps } from '../../navigation/app/home/HomeParamList';
import { Playlist } from '../../generated-components/apolloComponents';
import {
  StyledColumnView,
  Row,
  SimpleColumn,
  LeftColumn,
  ThinLine,
  OrangeCaption,
  LineBreak,
  IconDescription,
} from '../../styled-components/ReusedUI';
import { emptyImage, openURL } from './FeedView';
import { PostLikeButton } from './PostLikeButton';
import { AddToMyListButton } from '../my-list/AddToMyListButton';
import getEnvVars from '../../../environment';

const { apiUrl } = getEnvVars();
interface PlaylistViewProps {
  item: Playlist;
}

// FEED VIEW
export const PlaylistView: React.FC<
  PlaylistViewProps & HomeStackNavProps<'Feed'>
> = ({ item, navigation, route }) => {
  const themeContext = useContext(ThemeContext);
  return (
  // <Card style={{ marginBottom: 20 }} theme={{ roundness: 15 }}>
  //   <Card.Content
  //     style={{
  //       paddingHorizontal: 0,
  //       paddingVertical: 0,
  //       paddingLeft: 20,
  //     }}>
  //     {/*************  Content Image + Add to My List  *************/}

  //     <Row style={{ justifyContent: "space-around", paddingRight: 10 }}>
  //       {/* Content Image  TODO: music preview on press */}
  //       <View
  //         style={{
  //           // TODO: modify for android
  //           shadowColor: themeContext.colors.primary,
  //           shadowOffset: { width: 0.5, height: 5 },
  //           shadowOpacity: 0.3,
  //         }}>
  //         <Image
  //           style={{
  //             width: 260,
  //             height: 260,
  //             left: -30,
  //             top: -40,
  //             borderRadius: 15,
  //           }}
  //           resizeMode="contain"
  //           source={{
  //             uri: `${item.playlistPicture}`,
  //           }}
  //         />
  //       </View>
  //       <AddToMyListButton postId={+item.id} postType={"artist"} />
  //     </Row>

  //     <SimpleColumn>
  //       {/************* User Submission + Time  *************/}
  //       <LeftColumn>
  //         {item.user ? (
  //           <List.Item
  //             style={{ paddingLeft: 0 }}
  //             title={item?.user.username}
  //             titleStyle={{ fontWeight: "bold" }}
  //             description={item?.timeSubmitted}
  //             descriptionStyle={{ color: themeContext.colors.accentTwo }}
  //             onPress={() => {
  //               navigation.navigate("UserPage", { id: +item?.user.id });
  //             }}
  //             left={(props) => (
  //               <Avatar.Image
  //                 size={50}
  //                 source={{
  //                   uri: `${
  //                     item?.user.profilePicture
  //                       ? item?.user.profilePicture
  //                       : emptyImage
  //                   }`,
  //                 }}
  //               />
  //             )}
  //           />
  //         ) : (
  //           <></>
  //         )}
  //       </LeftColumn>
  //       <ThinLine />

  //       {/************* Main Content + Navigate to Content Page *************/}
  //       <TouchableOpacity
  //         onPress={() => {
  //           item.__typename === "AlbumPost"
  //             ? navigation.navigate("AlbumPage", {
  //                 id: item?.albumId,
  //                 name: item?.albumName,
  //                 imageUrl: item.imageUrl,
  //               })
  //             : item.__typename === "TrackPost"
  //             ? navigation.navigate("TrackPage", {
  //                 id: item?.trackId,
  //                 name: item?.trackName,
  //                 artistNames: item?.artistNames,
  //                 imageUrl: item?.imageUrl,
  //               })
  //             : item.__typename === "ArtistPost"
  //             ? navigation.navigate("ArtistPage", {
  //                 id: item?.artistId,
  //                 name: item?.artistName,
  //                 imageUrl: item.imageUrl,
  //               })
  //             : null;
  //         }}>
  //         <LeftColumn>
  //           {item.__typename === "AlbumPost" ? (
  //             <Row>
  //               <OrangeCaption style={{ bottom: 2 }}>ALBUM</OrangeCaption>
  //               <StarRating
  //                 disabled={true}
  //                 maxStars={5}
  //                 fullStar={"star"}
  //                 halfStar={"star-half"}
  //                 starSize={15}
  //                 fullStarColor={themeContext.colors.accent}
  //                 emptyStarColor={themeContext.colors.accent}
  //                 // iconSet={"react-native-vector-icons"}
  //                 rating={item.rating}
  //                 selectedStar={() => {}}
  //               />
  //             </Row>
  //           ) : item.__typename === "TrackPost" ? (
  //             <Row>
  //               <OrangeCaption style={{ top: 7, marginRight: 3 }}>
  //                 TRACK
  //               </OrangeCaption>
  //               {item?.vote === 1 ? (
  //                 <IconButton
  //                   size={15}
  //                   icon="thumb-up-outline"
  //                   color={themeContext.colors.accent}
  //                 />
  //               ) : (
  //                 <IconButton
  //                   size={15}
  //                   icon="thumb-down-outline"
  //                   color={themeContext.colors.accent}
  //                 />
  //               )}
  //             </Row>
  //           ) : item.__typename === "ArtistPost" ? (
  //             <OrangeCaption>ARTIST</OrangeCaption>
  //           ) : null}
  //           {/* TODO: ON PRESS -> NAV TO ARTIST PAGE -> CHANGE TO BUTTON?  */}
  //           <Title>
  //             {item.__typename === "AlbumPost"
  //               ? item.albumName
  //               : item.__typename === "TrackPost"
  //               ? item.trackName
  //               : item.__typename === "ArtistPost"
  //               ? item.artistName
  //               : null}
  //           </Title>
  //           <Paragraph style={{ color: themeContext.colors.darkText }}>
  //             {item?.text}
  //           </Paragraph>
  //         </LeftColumn>
  //       </TouchableOpacity>
  //     </SimpleColumn>
  //     <LineBreak />

  //     {/************* Links *************/}
  //     <View
  //       style={{
  //         display: "flex",
  //         flexDirection: "row",
  //         justifyContent: "space-between",
  //       }}>
  //       {/* Likes*/}
  //       <Row>
  //         <PostLikeButton postType={"artist"} postId={+item.id} />
  //         <IconDescription>{`${item.likes}`}</IconDescription>
  //       </Row>

  //       {/* Comments */}
  //       <Row>
  //         <IconButton
  //           icon="comment-processing-outline"
  //           color={themeContext.colors.accentTwo}
  //           size={20}
  //           onPress={() => {
  //             navigation.navigate("CommentPage", {
  //               postId: +item.id,
  //               imageUrl: item.imageUrl,
  //               postType:
  //                 item.__typename === "AlbumPost"
  //                   ? "album"
  //                   : item.__typename === "TrackPost"
  //                   ? "track"
  //                   : "artist",

  //               contentId:
  //                 item.__typename === "AlbumPost"
  //                   ? item.albumId
  //                   : item.__typename === "TrackPost"
  //                   ? item.trackId
  //                   : item.artistId,
  //               name:
  //                 item.__typename === "AlbumPost"
  //                   ? item.albumName
  //                   : item.__typename === "TrackPost"
  //                   ? item.trackName
  //                   : item.artistName,
  //             });
  //           }}
  //         />

  //         <IconDescription>2</IconDescription>
  //       </Row>

  //       {/* Go To Spotify  */}
  //       <Button
  //         theme={{ roundness: 0 }}
  //         style={{ borderBottomRightRadius: 12, paddingTop: 5 }}
  //         mode="contained"
  //         icon="play-circle-outline"
  //         onPress={() => {
  //           openURL(`${item.externalUrl}`);
  //         }}>
  //         PLAY ON SPOTIFY
  //       </Button>
  //     </View>
  //   </Card.Content>
  // </Card>

    <Card>
      {/* TODO: make a global style for centering */}
      <Card.Content style={{ alignItems: 'center' }}>
        <AddToMyListButton postId={+item.id} postType="playlist" />
        <Image
          style={{ width: 200, height: 200 }}
          resizeMode="contain"
          source={{
            uri: `${item.playlistPicture}`,
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
        <Caption>PLAYLIST</Caption>
        <Title>{item?.title}</Title>
        <Paragraph>{item?.description}</Paragraph>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate('PlaylistPage', {
              playlist: item,
            });
          }}
        >
          SEE PLAYLIST
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate('CommentPage', {
              postId: +item.id,
              playlistTitle: item.title,
              text: item.description,
              postType: 'playlist',
              contentId: item?.id,
              name: item?.title,
              imageUrl: item.playlistPicture,
            });
          }}
        >
          SEE COMMENTS
        </Button>
        <PostLikeButton postType="playlist" postId={+item.id} />
        <Paragraph>{`Likes: ${item.likes}`}</Paragraph>
      </Card.Content>
    </Card>
  );
};

//   FOR USER VIEW
export const PlaylistUserView: React.FC<
  PlaylistViewProps & HomeStackNavProps<'UserPage'>
> = ({
  item, navigation, route, navigation: navigationU,
}) => (
  <Card>
    {/* TODO: make a global style for centering */}
    <Card.Content style={{ alignItems: 'center' }}>
      <Image
        style={{ width: 200, height: 200 }}
        resizeMode="contain"
        source={{
          uri: `${item.playlistPicture}`,
        }}
      />
      {/* {item.user ? (
          <StyledColumnView>
            <Caption>{item.user.username}</Caption>
            <List.Item
              title={item?.user.username}
              description={item?.user.username}
              onPress={() => {
                navigation.navigate("UserPage", { id: +item?.user.id });
              }}
              left={(props) => (
                <Avatar.Image
                  size={20}
                  source={{
                    uri: `${
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
        )} */}

      <Text>{item?.timeSubmitted}</Text>
      <Caption>PLAYLIST</Caption>
      <Title>{item?.title}</Title>
      <Paragraph>{item?.description}</Paragraph>
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate('PlaylistPage', {
            playlist: item,
          });
        }}
      >
        SEE PLAYLIST
      </Button>
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate('CommentPage', {
            postId: +item.id,
            text: item.description,
            playlistTitle: item.title,
            postType: 'playlist',
            contentId: item?.id,
            name: item?.title,
            imageUrl: item.playlistPicture,
          });
        }}
      >
        SEE COMMENTS
      </Button>
      <PostLikeButton postType="playlist" postId={+item.id} />
      <Paragraph>{`Likes: ${item.likes}`}</Paragraph>
    </Card.Content>
  </Card>
);

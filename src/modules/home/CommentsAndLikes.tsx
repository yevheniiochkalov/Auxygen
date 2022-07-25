import React, { useContext } from 'react';
import { Button, IconButton } from 'react-native-paper';
import { Text, View } from 'react-native';
import { ThemeContext } from 'styled-components';

import { PostLikeButton } from './PostLikeButton';

import {
  ArtistPost,
  TrackPost,
  AlbumPost,
  Playlist,
  Poll,
  ThoughtsPost,
} from '../../generated-components/apolloComponents';
import { HomeStackNavProps } from '../../navigation/app/home/HomeParamList';

interface CommentsAndLikesProps {
  item: ArtistPost | TrackPost | AlbumPost | Playlist | Poll | ThoughtsPost;
  isLiked?: boolean;
  refetchFeed: () => void
}

export const CommentsAndLikes: React.FC<
  CommentsAndLikesProps & HomeStackNavProps<'Feed'>
> = ({
  item, navigation, isLiked, refetchFeed,
}) => {
  const themeContext = useContext(ThemeContext);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 0,
      }}
    >
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 25,
      }}
      >
        <PostLikeButton
          refetchFeed={refetchFeed}
          postType={
            item.__typename === 'AlbumPost'
              ? 'album'
              : item.__typename === 'TrackPost'
                ? 'track'
                : item.__typename === 'Playlist'
                  ? 'playlist'
                  : item.__typename === 'Poll'
                    ? 'poll'
                    : item.__typename === 'ArtistPost'
                      ? 'artist'
                      : 'thoughts'
          }
          postId={+item.id}
          postAuthor={item.user}
          isLiked={isLiked && +item.likes !== 0}
        />
        <Text style={{
          color: '#ffffff',
          fontSize: 13,
          fontFamily: 'Montserrat_500Medium',
        }}
        >{`${item.likes}`}
        </Text>
      </View>

      {/* Comments */}
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
      >
        <IconButton
          icon="comment-processing-outline"
          color={themeContext.colors.accentTwo}
          size={20}
          onPress={() => {
            navigation.navigate('CommentPage', {
              postId: +item.id,
              poll: item.__typename === 'Poll' ? item : null,
              text: item.__typename === 'Playlist'
                ? item.description
                : item.__typename === 'Poll'
                  ? item.question
                  : item.text,
              playlistTitle: item.__typename === 'Playlist' ? item.title : '',
              postAuthor: item.user,
              imageUrl:
                item.__typename === 'Playlist'
                  ? item.playlistPicture
                  : item.__typename === 'Poll'
                    ? null
                    : item.imageUrl,
              postType:
                item.__typename === 'AlbumPost'
                  ? 'album'
                  : item.__typename === 'TrackPost'
                    ? 'track'
                    : item.__typename === 'Playlist'
                      ? 'playlist'
                      : item.__typename === 'Poll'
                        ? 'poll'
                        : item.__typename === 'ArtistPost'
                          ? 'artist'
                          : 'thoughts',

              contentId:
                item.__typename === 'AlbumPost'
                  ? item.albumId
                  : item.__typename === 'ThoughtsPost'
                    ? item.id
                    : item.__typename === 'TrackPost'
                      ? item.trackId
                      : item.__typename === 'Playlist'
                        ? item.id
                        : item.__typename === 'Poll'
                          ? item.id
                          : item.artistId,
              name:
                item.__typename === 'AlbumPost'
                  ? item.albumName
                  : item.__typename === 'TrackPost'
                    ? item.trackName
                    : item.__typename === 'Playlist'
                      ? item.title
                      : item.__typename === 'Poll'
                        ? item.question
                        : item.__typename === 'ArtistPost'
                          ? item.artistName : null,
            });
          }}
        />

        <Text style={{
          color: '#ffffff',
          fontSize: 13,
          fontFamily: 'Montserrat_500Medium',
        }}
        >{item.numComments}
        </Text>
      </View>
    </View>
  );
};

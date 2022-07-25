import React from 'react';
import {
  Caption,
  Avatar,
} from 'react-native-paper';
import { ScrollView, FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { View, StyleSheet, Text } from 'react-native';
import StarRating from 'react-native-star-rating';

import { emptyImage } from '../home/FeedView';
import { HomeStackNavProps } from '../../navigation/app/home/HomeParamList';

import { useGetTopPostsQuery } from '../../generated-components/apolloComponents';
import { grayPlaceholder, orange700 } from '../../styled-components/colors';
import { RoundImage } from '../../styled-components/ReusedUI';
import getEnvVars from '../../../environment';
import { Spinner } from '../../utils/Spinner';
import { timeSince } from '../../utils/timeSince';

const { apiUrl } = getEnvVars();
interface DiscoverReviewsProps {}

export const DiscoverReviews: React.FC<
  DiscoverReviewsProps & HomeStackNavProps<'Feed'>
> = ({ navigation }) => {
  const {
    data, loading, error, refetch,
  } = useGetTopPostsQuery();

  if (loading) {
    return <Spinner />;
  }
  if (error || !data) {
    console.log(error);
    return <Caption>Error...</Caption>;
  }

  const goToUserScreen = (item) => {
    navigation.navigate('UserPage', { id: +item?.user.id });
  };

  const goToContentScreen = (item) => {
    switch (item.__typename) {
      case 'AlbumPost':
        navigation.navigate('AlbumPage', {
          id: item.albumId,
          name: item.albumName,
          imageUrl: item.imageUrl,
        });
        break;
      case 'ArtistPost':
        navigation.navigate('ArtistPage', {
          id: item.artistId,
          name: item.artistName,
          imageUrl: item.imageUrl,
        });
        break;
      case 'TrackPost':
        navigation.navigate('TrackPage', {
          id: item.trackId,
          name: item.trackName,
          imageUrl: item.imageUrl,
          artistNames: item.artistNames,
        });

        break;

      default:
        break;
    }
  };

  const goToReviewScreen = (item) => {
    navigation.navigate('CommentPage', {
      postId: +item.id,
      imageUrl: item.imageUrl,
      poll: item.__typename === 'Poll' ? item : null,
      playlistTitle: item.__typename === 'Playlist' ? item.title : '',
      text: item.__typename === 'Playlist'
        ? item.description
        : item.__typename === 'Poll'
          ? item.question
          : item.text,
      postType:
            item.__typename === 'AlbumPost'
              ? 'album'
              : item.__typename === 'TrackPost'
                ? 'track'
                : 'artist',

      contentId:
            item.__typename === 'AlbumPost'
              ? item.albumId
              : item.__typename === 'TrackPost'
                ? item.trackId
                : item.artistId,
      name:
            item.__typename === 'AlbumPost'
              ? item.albumName
              : item.__typename === 'TrackPost'
                ? item.trackName
                : item.artistName,
    });
  };

  return (
    <FlatList
      horizontal
      contentContainerStyle={{
        justifyContent: 'space-around',
        flexDirection: 'row',
      }}
      data={data.getTopPosts}
      keyExtractor={(item, ix) => ix.toString().concat(item.toString())}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <TouchableOpacity
              onPress={() => goToContentScreen(item)}
            >
              <RoundImage
                style={styles.cardImg}
                resizeMode="contain"
                source={{
                  uri: `${item.imageUrl}`,
                }}
              />
            </TouchableOpacity>

            <View style={styles.cardHeaderRight}>
              {item.__typename === 'AlbumPost' && (
                <View style={styles.ratingContainer}>
                  <StarRating
                    disabled
                    maxStars={5}
                    fullStar="star"
                    halfStar="star-half-o"
                    starSize={14}
                    fullStarColor={orange700}
                    emptyStarColor={orange700}
                    rating={item.rating}
                  />
                </View>
              )}

              <Text style={styles.cardTitle}>
                {
                      item.__typename === 'AlbumPost'
                        ? item.albumName
                        : item.__typename === 'TrackPost'
                          ? item.trackName
                          : item.__typename === 'ArtistPost'
                            ? item.artistName
                            : null
                    }
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => goToReviewScreen(item)}
          >
            <Text style={styles.cardDescription}>
              {item.text}
            </Text>
          </TouchableOpacity>

          {item.user && (
            <TouchableOpacity
              style={styles.cardAuthor}
              onPress={() => goToUserScreen(item)}
            >
              <View style={styles.avatarWrap}>
                <Avatar.Image
                  size={24}
                  source={{
                    uri: `${apiUrl}/${
                      item?.user.profilePicture
                        ? item?.user.profilePicture
                        : emptyImage
                    }`,
                  }}
                />
              </View>

              <Text style={styles.cardAuthorName}>
                {item?.user.username}
              </Text>
            </TouchableOpacity>
          )}

        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    backgroundColor: '#17172B',
    marginRight: 15,
    borderRadius: 20,
    width: 250,
    minHeight: 250,
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
  },
  cardHeaderRight: {
    display: 'flex',
    padding: 15,
    paddingTop: 25,
    maxWidth: 150,
  },
  cardTitle: {
    color: '#ffffff',
    fontFamily: 'Montserrat_500Medium',
    fontSize: 17,
  },
  cardDescription: {
    flexGrow: 1,
    padding: 15,
    fontFamily: 'Montserrat_400Regular',
    color: grayPlaceholder,
  },
  cardAuthor: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    paddingBottom: 15,
  },
  cardAuthorName: {
    marginLeft: 12,
    color: '#ffffff',
    fontFamily: 'Montserrat_700Bold',
    fontSize: 16,
  },
  ratingContainer: {
    width: 80,
    marginBottom: 15,
  },
  cardImg: {
    width: 100,
    height: 100,
    borderRadius: 20,
    margin: 1,
  },
  avatarWrap: {},
});

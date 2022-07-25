// Displaying search results for the different content types
import React from 'react';
import { FlatList } from 'react-native';
import {
  Avatar,
  List,
  Title,
} from 'react-native-paper';

import { useSearchPostsQuery } from '../../../generated-components/apolloComponents';
import { HomeStackNavProps } from '../../../navigation/app/home/HomeParamList';
import { StyledColumnView } from '../../../styled-components/ReusedUI';
import { Spinner } from '../../../utils/Spinner';

interface SearchTypeProps {
  searchQuery: string;
}

export const PostSearchType: React.FC<
  SearchTypeProps & HomeStackNavProps<'SearchPage'>
> = ({ searchQuery, navigation, route }) => {
  const { data, loading, error } = useSearchPostsQuery({
    variables: {
      query: searchQuery,
    },
  });

  if (loading) {
    return <Spinner />;
  }
  if (error || !data) {
    return <></>;
  }

  const searchResult = data?.searchPosts;

  return (
    <StyledColumnView>
      <FlatList
        data={searchResult}
        keyExtractor={(item, index) => item!?.id!?.toString() + index}
        renderItem={(results) =>
        // ---------  TRACK POSTS ------------- //

          (results.item.__typename === 'TrackPost' ? (
            <List.Item
              title={results.item?.text}
              description={results.item?.trackName}
              onPress={() => {
                results.item.__typename === 'TrackPost'
                  ? navigation.navigate('TrackPage', {
                    id: results.item.trackId,
                    name: results.item.trackName,
                    artistNames: results.item.artistNames,
                    imageUrl: results.item.imageUrl,
                  })
                  : null;
              }}
              left={(props) => (
                <Avatar.Image
                  size={20}
                  source={{
                    uri: `${results.item?.imageUrl}`,
                  }}
                />
              )}
            />
          ) // ---------  ALBUM POSTS ------------- //

            : results.item.__typename === 'AlbumPost' ? (
              <List.Item
                title={results.item?.text}
                description={results.item?.albumName}
                onPress={() => {
                  results.item.__typename === 'AlbumPost'
                    ? navigation.navigate('AlbumPage', {
                      id: results.item.albumId,
                      name: results.item.albumName,
                      imageUrl: results.item.imageUrl,
                    })
                    : null;
                }}
                left={(props) => (
                  <Avatar.Image
                    size={20}
                    source={{
                      uri: `${results.item?.imageUrl}`,
                    }}
                  />
                )}
              />
            ) // ---------  ARTIST POSTS ------------- //

              : results.item.__typename === 'ArtistPost' ? (
                <List.Item
                  title={results.item?.text}
                  description={results.item?.artistName}
                  onPress={() => {
                    results.item.__typename === 'ArtistPost'
                      ? navigation.navigate('ArtistPage', {
                        id: results.item.artistId,
                        name: results.item.artistName,
                        imageUrl: results.item.imageUrl,
                      })
                      : null;
                  }}
                  left={(props) => (
                    <Avatar.Image
                      size={20}
                      source={{
                        uri: `${results.item?.imageUrl}`,
                      }}
                    />
                  )}
                />
              ) : (
                <></>
              ))}
      />
    </StyledColumnView>
  );
};

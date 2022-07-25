import React from 'react';
import { FlatList, Dimensions, View } from 'react-native';
import {
  Avatar,
  List,
} from 'react-native-paper';

import { TopFiveArrayType } from '../../UserTopFiveView';

import { useSearchSpotifyQuery } from '../../../../../generated-components/apolloComponents';
import { Spinner } from '../../../../../utils/Spinner';

interface TopFiveQueryProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  array: TopFiveArrayType[];
  setArray: React.Dispatch<React.SetStateAction<TopFiveArrayType[]>>;
  arrayIndex: number;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
}
const screenHeight = Dimensions.get('window').height;
export const AlbumTopFiveQuery: React.FC<TopFiveQueryProps> = ({
  searchQuery,
  setSearchQuery,
  arrayIndex,
  array,
  setArray,
  setShowSearch,
  type,
}) => {
  const { data, loading, error } = useSearchSpotifyQuery({
    variables: {
      type,
      query: searchQuery,
    },
  });

  if (loading) {
    return <Spinner />;
  }
  if (error || !data) {
    console.log(error.message);
    return <></>;
  }
  const searchResult = data?.search;

  if (searchResult?.__typename) {
    return (
      <View style={{ height: screenHeight / 2 }}>
        {searchResult?.__typename === 'AlbumSearchResult' ? (
          <FlatList
            data={searchResult.albums?.items}
            keyExtractor={(item, index) => item!?.id!?.toString() + index}
            renderItem={(results) => (
              <List.Item
                onPress={() => {
                  setArray(
                    Object.assign([...array], {
                      [arrayIndex]: {
                        id: results.item?.id,
                        name: results.item?.name,
                        imageUrl: results.item?.images?.map((item, ix) => item?.url)[1],
                        artistNames: results.item?.artists.map((a: any) => a.name),
                      },
                    }),
                  );
                  setSearchQuery('');
                  setShowSearch(false);
                }}
                title={results.item?.name}
                left={(props) => (
                  <Avatar.Image
                    size={20}
                    source={{
                      uri: `${
                        results.item?.images?.map((item, ix) => item?.url)[1]
                      }`,
                    }}
                  />
                )}
              />
            )}
          />
        ) : searchResult?.__typename === 'TrackSearchResult' ? (
          <FlatList
            data={searchResult.tracks?.items}
            keyExtractor={(item, index) => item!?.id!?.toString() + index}
            renderItem={(results) => (
              <List.Item
                onPress={() => {
                  setArray(
                    Object.assign([...array], {
                      [arrayIndex]: {
                        id: results.item?.id,
                        name: results.item?.name,
                        imageUrl: results.item?.album.images?.map(
                          (item, ix) => item?.url,
                        )[1],
                        artistNames: results.item.artists.map((a: any) => a.name),
                      },
                    }),
                  );
                  setSearchQuery('');
                  setShowSearch(false);
                }}
                title={results.item?.name}
                left={(props) => (
                  <Avatar.Image
                    size={20}
                    source={{
                      uri: `${
                        results.item?.album.images?.map((item, ix) => item?.url)[1]
                      }`,
                    }}
                  />
                )}
              />
            )}
          />
        ) : searchResult?.__typename === 'ArtistSearchResult' ? (
          <FlatList
            data={searchResult.artists?.items}
            keyExtractor={(item, index) => item!?.id!?.toString() + index}
            renderItem={(results) => (
              <List.Item
                onPress={() => {
                  setArray(
                    Object.assign([...array], {
                      [arrayIndex]: {
                        id: results.item?.id,
                        name: results.item?.name,
                        imageUrl: results.item?.images?.map((item, ix) => item?.url)[1],
                      },
                    }),
                  );
                  setSearchQuery('');
                  setShowSearch(false);
                }}
                title={results.item?.name}
                left={(props) => (
                  <Avatar.Image
                    size={20}
                    source={{
                      uri: `${
                        results.item?.images?.map((item, ix) => item?.url)[1]
                      }`,
                    }}
                  />
                )}
              />
            )}
          />
        ) : (
          <></>
        )}
      </View>
    );
  }
};

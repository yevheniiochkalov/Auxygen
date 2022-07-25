// Displaying search results for the different content types
import React from 'react';
import { FlatList, Dimensions } from 'react-native';
import {
  Avatar, List, Title,
} from 'react-native-paper';
import { useSearchSpotifyQuery } from '../../../../../generated-components/apolloComponents';
import { StyledColumnView } from '../../../../../styled-components/ReusedUI';
import { Spinner } from '../../../../../utils/Spinner';
import { TopFiveArrayType } from '../TopFiveSwiper';

interface TopFiveQueryProps {
  searchQuery: string;
  array: TopFiveArrayType[];
  setArray: React.Dispatch<React.SetStateAction<TopFiveArrayType[]>>;
}
const screenHeight = Dimensions.get('window').height;

export const TrackTopFiveQuery: React.FC<TopFiveQueryProps> = ({
  searchQuery,
  array,
  setArray,
}) => {
  const { data, loading, error } = useSearchSpotifyQuery({
    variables: {
      type: 'track',
      query: searchQuery,
    },
  });

  if (loading) {
    return <Spinner />;
  }
  if (error || !data) {
    // console.log(error);
    return <></>;
  }
  const searchResult = data?.search;
  if (searchResult?.__typename === 'TrackSearchResult') {
    return (
      <StyledColumnView style={{ height: screenHeight / 4 }}>
        <Title>Track</Title>
        <FlatList
          data={searchResult.tracks?.items}
          keyExtractor={(item, index) => item!?.id!?.toString() + index}
          renderItem={(results) => (
            <List.Item
              onPress={() => {
                setArray((array) => [
                  ...array,
                  {
                    id: results.item?.id,
                    name: results.item?.name,
                    imageUrl: results.item?.album.images?.map((item, ix) => item?.url)[1],
                  },
                ]);
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
      </StyledColumnView>
    );
  }
};

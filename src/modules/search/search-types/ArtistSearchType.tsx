// Displaying search results for the different content types
import React from 'react';
import { FlatList, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  Avatar, List, Title,
} from 'react-native-paper';
import { useSearchSpotifyQuery } from '../../../generated-components/apolloComponents';
import { HomeStackNavProps } from '../../../navigation/app/home/HomeParamList';
import { StyledColumnView } from '../../../styled-components/ReusedUI';
import { Spinner } from '../../../utils/Spinner';
import { styles } from '../styles';

interface SearchTypeProps {
  searchQuery: string;
}

export const ArtistSearchType: React.FC<
  SearchTypeProps & HomeStackNavProps<'SearchPage'>
> = ({ searchQuery, navigation, route }) => {
  const { data, loading, error } = useSearchSpotifyQuery({
    variables: {
      type: 'artist',
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
  if (searchResult?.__typename === 'ArtistSearchResult') {
    return (
      <StyledColumnView>
        <FlatList
          data={searchResult.artists?.items}
          keyExtractor={(item, index) => item!?.id!?.toString() + index}
          renderItem={(results) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ArtistPage', {
                  id: results.item?.id,
                  name: results.item?.name,
                  imageUrl: results.item?.images?.map((item, ix) => item?.url)[1],
                });
              }}
              style={styles.searchItem}
            >
              <Avatar.Image
                size={40}
                style={styles.itemImage}
                source={{
                  uri: `${
                    results.item?.images?.map((item, ix) => item?.url)[1]
                  }`,
                }}
              />
              <Text
                style={styles.searchItemLabel}
              >
                {results.item?.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </StyledColumnView>
    );
  }
};

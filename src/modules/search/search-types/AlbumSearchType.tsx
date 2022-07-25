import React from 'react';
import { FlatList, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  Avatar,
  List,
  Title,
} from 'react-native-paper';

import { useSearchSpotifyQuery } from '../../../generated-components/apolloComponents';
import { HomeStackNavProps } from '../../../navigation/app/home/HomeParamList';
import { StyledColumnView } from '../../../styled-components/ReusedUI';
import { Spinner } from '../../../utils/Spinner';
import { styles } from '../styles';

interface SearchTypeProps {
  searchQuery: string;
}

export const AlbumSearchType: React.FC<
  SearchTypeProps & HomeStackNavProps<'SearchPage'>
> = ({ searchQuery, navigation }) => {
  const { data, loading, error } = useSearchSpotifyQuery({
    variables: {
      type: 'album',
      query: searchQuery,
    },
  });

  const renderItem = (results) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('AlbumPage', {
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
  );

  if (loading) {
    return <Spinner />;
  }
  if (error || !data) {
    return <></>;
  }
  const searchResult = data?.search;
  if (searchResult?.__typename === 'AlbumSearchResult') {
    return (
      <StyledColumnView>
        <FlatList
          data={searchResult.albums?.items}
          keyExtractor={(item, index) => item!?.id!?.toString() + index}
          renderItem={renderItem}
        />
      </StyledColumnView>
    );
  }
};

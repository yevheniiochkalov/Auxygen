// Displaying search results for the different content types
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, View } from 'react-native';
import {
  Caption, Card, Headline, List, Text,
} from 'react-native-paper';
import { SearchSpotifyQuery } from '../../generated-components/apolloComponents';
import { useStoreActions, useStoreState } from '../../state-management/hooks';

interface SearchFlatListsProps {
  data: SearchSpotifyQuery | undefined;
}

export const SearchFlatLists: React.FC<SearchFlatListsProps> = (data) => {
  const content = useStoreState((state) => state.createPost.content);
  const setContent = useStoreActions(
    (actions) => actions.createPost.setContent,
  );
  const clearContent = useStoreActions(
    (actions) => actions.createPost.clearContent,
  );
  const navigation = useNavigation();
  const chooseContent = async (
    id: string,
    name: string,
    imageUrl?: string,
    externalUrl?: string,
    artistNames?: string[],
  ) => {
    // clear all previous values + set new global state
    clearContent();

    setContent({
      id,
      name,
      imageUrl,
      externalUrl,
      artistNames,
    });

    navigation.goBack();
    return;
  };
  const searchResult = data.data?.search;

  if (searchResult?.__typename === 'ArtistSearchResult') {
    return (
      <FlatList
        data={searchResult.artists?.items}
        keyExtractor={(item, index) => item!?.id!?.toString() + index}
        renderItem={(results) => (
          <List.Item
            onPress={() => {
              const id = results.item!?.id!;
              const name = results.item!?.name!;
              const externalUrl = results.item!?.external_urls?.spotify;
              const imageUrl = results.item?.images?.map((item, ix) => item?.url)[1];
              chooseContent(id, name, imageUrl, externalUrl);
            }}
            title={results.item?.name}
          />
        )}
      />
    );
  }

  if (searchResult?.__typename === 'TrackSearchResult') {
    return (
      <FlatList
        data={searchResult.tracks?.items}
        keyExtractor={(item, index) => item!?.id!?.toString() + index}
        renderItem={(results) => (
          <List.Item
            onPress={() => {
              const id = results.item!?.id!;
              const name = results.item!?.name!;
              const externalUrl = results.item!?.external_urls?.spotify;
              const imageUrl = results.item?.album?.images?.map((item, ix) => item?.url)[1];
              const artistNames = results.item?.artists?.map((item, ix) => item?.name);
              chooseContent(id, name, imageUrl, externalUrl, artistNames);
            }}
            title={results.item?.name}
            description={results.item?.artists?.map((element, ix) => (
              <Text key={ix}>- {element?.name} </Text>
            ))}
          />
        )}
      />
    );
  }

  if (searchResult?.__typename === 'AlbumSearchResult') {
    return (
      <FlatList
        data={searchResult.albums?.items}
        keyExtractor={(item, index) => item!?.id!?.toString() + index}
        renderItem={(results) => (
          <List.Item
            onPress={() => {
              const id = results.item!?.id!;
              const name = results.item!?.name!;
              const externalUrl = results.item!?.external_urls?.spotify;
              const imageUrl = results.item?.images?.map((item, ix) => item?.url)[1];
              const artistNames = results.item?.artists?.map((item, ix) => item?.name);
              chooseContent(id, name, imageUrl, externalUrl, artistNames);
            }}
            title={results.item?.name}
            description={results.item?.release_date}
          />
        )}
      />
    );
  }

  // if not any of the options
  return <View />;
};

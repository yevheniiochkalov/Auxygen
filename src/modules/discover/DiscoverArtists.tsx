import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemeContext } from 'styled-components';
import {
  Caption,
  List,
  Avatar,
} from 'react-native-paper';
import { ScrollView, FlatList } from 'react-native-gesture-handler';

import { HomeStackNavProps } from '../../navigation/app/home/HomeParamList';

import { useGetTopArtistsQuery } from '../../generated-components/apolloComponents';
import { cyanB } from '../../styled-components/colors';
import { Spinner } from '../../utils/Spinner';

interface DiscoverArtistsProps {}

export const DiscoverArtists: React.FC<
  DiscoverArtistsProps & HomeStackNavProps<'Feed'>
> = ({ navigation }) => {
  const themeContext = useContext(ThemeContext);
  const {
    data, loading, error, refetch,
  } = useGetTopArtistsQuery();

  if (loading) {
    return <Spinner />;
  }
  if (error || !data) {
    console.log(error);
    return <Caption>Error...</Caption>;
  }

  // onlu unique artists
  const flags = new Set();
  const myUniqueArtists = data.getTopArtists.filter((entry) => {
    if (flags.has(entry.artistId)) {
      return false;
    }
    flags.add(entry.artistId);
    return true;
  });

  return (
    <FlatList
      horizontal
      contentContainerStyle={{
        justifyContent: 'space-around',
        flexDirection: 'row',
      }}
      data={myUniqueArtists}
      keyExtractor={(item, ix) => ix.toString().concat(item.artistName)}
      renderItem={({ item }) => (
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            width: 100,
            marginRight: 20,
          }}
        >
          <Avatar.Image
            size={100}
            source={{
              uri: `${item.imageUrl}`,
            }}
          />
          <List.Item
            title={item.artistName}
            titleStyle={styles.artistName}
            onPress={() => {
              navigation.navigate('ArtistPage', {
                id: item?.artistId,
                name: item?.artistName,
                imageUrl: item.imageUrl,
              });
            }}
          />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  artistName: {
    color: cyanB,
    fontFamily: 'Montserrat_400Regular',
    textAlign: 'center',
    paddingRight: 10,
  },
});

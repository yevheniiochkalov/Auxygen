import React, { useContext } from 'react';
import {
  Caption,
  Text,
} from 'react-native-paper';
import StarRating from 'react-native-star-rating';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { View, Image, StyleSheet } from 'react-native';
import { ThemeContext } from 'styled-components';
import { HomeStackNavProps } from '../../navigation/app/home/HomeParamList';

import { useGetReccomendationsQuery } from '../../generated-components/apolloComponents';
import { RoundImage } from '../../styled-components/ReusedUI';
import { cyanB } from '../../styled-components/colors';
import { Spinner } from '../../utils/Spinner';

interface DiscoverAlbumsProps {}

export const DiscoverAlbums: React.FC<
  DiscoverAlbumsProps & HomeStackNavProps<'Feed'>
> = ({ navigation }) => {
  const themeContext = useContext(ThemeContext);
  const {
    data, loading, error, refetch,
  } = useGetReccomendationsQuery();

  if (loading) {
    return <Spinner />;
  }
  if (error || !data) {
    console.log(error);
    return <Caption>Error...</Caption>;
  }

  return (
    <FlatList
      horizontal
      contentContainerStyle={{
        flexDirection: 'row',
      }}
      data={data.getReccomendations.tracks}
      keyExtractor={(item, ix) => ix.toString().concat(item.name)}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AlbumPage', {
              id: item?.album.id,
              name: item.album.name,
              imageUrl: item?.album.images.map((i) => i.url)[0],
            });
          }}
          style={styles.albumCard}
        >
          <RoundImage
            style={{ width: 150, height: 150, marginLeft: 0 }}
            resizeMode="contain"
            source={{
              uri: `${item.album.images.map((i) => i.url)[0]}`,
            }}
          />

          <View style={styles.albumContent}>
            <Text style={styles.albumTitle}>
              {item.album.name}
            </Text>

            <Text style={styles.albumAuthor}>
              {item.album.artists.map((i, idx, arr) => {
                if (idx === arr.length - 1) return i.name;

                return `${i.name}, `;
              })}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  albumCard: {
    marginRight: 15,
  },
  albumContent: {
    maxWidth: 150,
    marginTop: 15,
    paddingBottom: 10,
  },
  albumTitle: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 16,
    marginBottom: 5,
  },
  albumAuthor: {
    color: cyanB,
    fontSize: 14,
    fontFamily: 'Montserrat_400Regular',
  },
});

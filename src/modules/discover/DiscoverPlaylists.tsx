import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from 'styled-components';
import {
  Caption,
  Avatar,
} from 'react-native-paper';
import {
  FlatList,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import { useFocusEffect } from '@react-navigation/native';
import { HomeStackNavProps } from '../../navigation/app/home/HomeParamList';

import { RoundImage } from '../../styled-components/ReusedUI';
import { useGetTopPlaylistsQuery } from '../../generated-components/apolloComponents';
import getEnvVars from '../../../environment';
import { emptyImage } from '../home/FeedView';
import { Spinner } from '../../utils/Spinner';

const { apiUrl } = getEnvVars();

interface DiscoverPlaylistsProps {}

export const DiscoverPlaylists: React.FC<
  DiscoverPlaylistsProps & HomeStackNavProps<'Feed'>
> = ({ navigation, route }) => {
  const themeContext = useContext(ThemeContext);
  const {
    data, loading, error, refetch,
  } = useGetTopPlaylistsQuery();

  useFocusEffect(() => {
    refetch();
  });
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
        justifyContent: 'space-around',
        flexDirection: 'row',
      }}
      data={data.getTopPlaylists}
      keyExtractor={(item, ix) => ix.toString().concat(item.title)}
      renderItem={({ item }) => (

        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignContent: 'center',
            width: 170,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PlaylistPage', {
                playlist: item,
              });
            }}
          >
            <RoundImage
              style={{ width: 150, height: 150 }}
              resizeMode="contain"
              source={{
                uri: `${item.playlistPicture}`,
              }}
            />
            <Text
              style={{
                color: themeContext.colors.accent,
                textAlign: 'center',
                marginLeft: -35,
                padding: 0,
                marginVertical: 15,
              }}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
          {item.user && (
            <TouchableOpacity
              style={styles.cardAuthor}
              onPress={() => (
                navigation.navigate('UserPage', { id: +item?.user.id })
              )}
            >
              <View>
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
  cardAuthor: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 15,
  },
  cardAuthorName: {
    marginLeft: 12,
    color: '#ffffff',
    fontFamily: 'Montserrat_700Bold',
    fontSize: 11,
  },
});


import React, { useMemo } from 'react';
import { Image, View } from 'react-native';
import {
  Card,
  Caption,
  Text,
} from 'react-native-paper';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import { useGetArtistAlbumsQuery } from '../../../generated-components/apolloComponents';
import { HomeStackNavProps } from '../../../navigation/app/home/HomeParamList';
import { RoundImage } from '../../../styled-components/ReusedUI';
import { width } from '../../../styled-components/theme';
import { Spinner } from '../../../utils/Spinner';

interface ArtistProps {
  id: string;
}

export const ArtistPageAlbums: React.FC<
  ArtistProps & HomeStackNavProps<'ArtistPage'>
> = ({ id, navigation, route }) => {
  const { data, loading, error } = useGetArtistAlbumsQuery({
    variables: {
      id,
    },
  });
  const albums = useMemo(() => {
    const newObj = {};
    let newArr = [];

    data?.getArtistAlbums?.items.forEach((v) => {
      newObj[v.name] = v;
    });
    newArr = Object.keys(newObj).map((id) => newObj[id]);
    return newArr;
  }, [data]);

  if (loading) {
    return <Spinner />;
  }

  if (error || !data) {
    console.log(error);
    return <Text>Error..</Text>;
  }

  if (data.getArtistAlbums.items.length < 1) {
    return (
      <Card>
        <Caption style={{ textAlign: 'center' }}>
          This Artist has no albums
        </Caption>
      </Card>
    );
  }

  return (
    <FlatList
      data={albums}
      numColumns={2}
      renderItem={(item) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AlbumPage', {
              id: item?.item.id,
              name: item?.item.name,
              imageUrl: item?.item.images.map((element) => element.url)[0],
            });
          }}
        >
          <View style={{ padding: 3 }}>
            <RoundImage
              style={{ width: width * 0.46, height: width * 0.46, opacity: 0.7 }}
              resizeMode="contain"
              source={{
                uri: `${item.item.images.map((i) => i.url)[0]}`,
              }}
            />
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                marginLeft: 10,
                marginBottom: 3,
              }}
            >
              <Text
                style={{
                  fontFamily: 'Montserrat_600SemiBold',
                  marginBottom: 5,
                  color: 'white',
                }}
              >
                {item.item.name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item, ix) => ix.toString()}
    />
  );
};

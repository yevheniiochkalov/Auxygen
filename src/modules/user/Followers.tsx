import React, { useEffect } from 'react';
import {
  List,
  Avatar,
  Title,
} from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import { ImageBackground } from 'react-native';

import { emptyImage } from './UserView';

import { StyledColumnView } from '../../styled-components/ReusedUI';
import { HomeStackNavProps } from '../../navigation/app/home/HomeParamList';
import { useGetFollowingorFollowersQuery } from '../../generated-components/apolloComponents';
import { styles } from '../../styled-components/StyleSheet';
import getEnvVars from '../../../environment';
import { Spinner } from '../../utils/Spinner';

const { apiUrl } = getEnvVars();

export const Followers: React.FC<HomeStackNavProps<'FollowersPage'>> = ({
  navigation,
  route,
}) => {
  const { id, request } = route.params;
  const {
    data, loading, error, refetch,
  } = useGetFollowingorFollowersQuery({
    variables: {
      id,
      request,
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  const renderItem = (item) => (
    <List.Item
      onPress={() => {
        navigation.navigate('UserPage', { id: +item.item.id });
      }}
      title={item.item.username}
      left={(props) => (
        <Avatar.Image
          size={20}
          source={{
            uri: `${apiUrl}/${
              item.item.profilePicture
                ? item.item.profilePicture
                : emptyImage
            }`,
          }}
        />
      )}
    />
  );

  if (loading) {
    return <Spinner />;
  }
  if (error || !data) {
    return <></>;
  }

  return (
    <ImageBackground
      style={styles.wavyBackgroundStyle}
      imageStyle={styles.wavyBackgroundImageStyle}
      source={require('../../local-assets/wavy.png')}
    >
      <StyledColumnView>
        <Title>{request!?.toUpperCase()}</Title>
        <FlatList
          data={data.getFollowingorFollowers}
          keyExtractor={(item, index) => item!?.toString() + index}
          renderItem={renderItem}
        />
      </StyledColumnView>
    </ImageBackground>
  );
};

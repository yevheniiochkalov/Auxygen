// Displaying search results for the different content types
import React from 'react';
import { FlatList, Text } from 'react-native';
import {
  Avatar,
  List,
  Title,
  Caption,
  Card,
} from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  useSearchSpotifyQuery,
  useSearchPostsQuery,
  useSearchUserQuery,
} from '../../../generated-components/apolloComponents';
import { HomeStackNavProps } from '../../../navigation/app/home/HomeParamList';
import { StyledColumnView } from '../../../styled-components/ReusedUI';
import { emptyImage } from '../../user/UserView';
import getEnvVars from '../../../../environment';
import { styles } from '../styles';
import { Spinner } from '../../../utils/Spinner';

const { apiUrl } = getEnvVars();
interface SearchTypeProps {
  searchQuery: string;
}

export const UserSearchType: React.FC<
  SearchTypeProps & HomeStackNavProps<'SearchPage'>
> = ({ searchQuery, navigation, route }) => {
  const { data, loading, error } = useSearchUserQuery({
    variables: {
      query: searchQuery,
    },
  });

  if (loading) {
    return <Spinner />;
  }
  if (error || !data) {
    return <></>;
  }

  const searchResult = data?.searchUser;

  return (
    <StyledColumnView>
      <FlatList
        data={searchResult}
        keyExtractor={(item, index) => item!?.id!?.toString() + index}
        renderItem={(results) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('UserPage', { id: +results.item.id });
            }}
            style={styles.searchItem}
          >
            <Avatar.Image
              size={40}
              style={styles.itemImage}
              source={{
                uri: `${apiUrl}/${
                  results.item.profilePicture
                    ? results.item.profilePicture
                    : emptyImage
                }`,
              }}
            />
            <Text
              style={styles.searchItemLabel}
            >
              {results.item?.username}
            </Text>
          </TouchableOpacity>

        )}
      />
    </StyledColumnView>
  );
};

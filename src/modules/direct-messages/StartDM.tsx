import React, { useState } from 'react';
import {
  Searchbar,
  Title,
  List,
  Avatar,
} from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import { StyledColumnView } from '../../styled-components/ReusedUI';
import { UserSearchType } from '../search/search-types/UserSearchType';
import { useSearchUserQuery } from '../../generated-components/apolloComponents';
import { emptyImage } from '../home/FeedView';
import { DMStackNavProps } from '../../navigation/app/direct-messages/DMParamList';
import NiceSearchbar from '../../styled-components/StylishComponents';
import getEnvVars from '../../../environment';
import { useStoreActions, useStoreState } from '../../state-management/hooks';
import { Spinner } from '../../utils/Spinner';

const { apiUrl } = getEnvVars();
interface StartDMProps {}

export const StartDM: React.FC<StartDMProps & DMStackNavProps<'DMFeed'>> = ({
  navigation,
  route,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <StyledColumnView>
      <NiceSearchbar
        placeholder="Search Users"
        onChangeText={(searchQuery) => setSearchQuery(searchQuery)}
        value={searchQuery}
      />
      {searchQuery ? (
        <DMUserSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          navigation={navigation}
          route={route}
        />
      ) : (
        <></>
      )}
    </StyledColumnView>
  );
};

interface DMUserSearchProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const DMUserSearch: React.FC<
  DMUserSearchProps & DMStackNavProps<'DMFeed'>
> = ({
  searchQuery, navigation, route, setSearchQuery,
}) => {
  const { data, loading, error } = useSearchUserQuery({
    variables: {
      query: searchQuery,
    },
  });

  const createNewChat = useStoreActions((actions) => (
    actions.direct.createNewChat
  ));

  // const state = useStoreState((state) => state.direct);

  if (loading) {
    return <Spinner />;
  }
  if (error || !data) {
    return <></>;
  }

  const handlePress = (results) => {
    createNewChat({
      id: results.item.id,
      username: results.item.username,
      profilePicture: results.item.profilePicture,
    });
    setSearchQuery('');
    navigation.navigate('DMChat', {
      partnerID: +results.item.id,
      partnerName: results.item.username,
      partnerPictureURL: `${apiUrl}/${results.item.profilePicture}`,
    });
  };

  const searchResult = data?.searchUser;

  return (
    <StyledColumnView>
      <FlatList
        data={searchResult}
        keyExtractor={(item, index) => item!?.id!?.toString() + index}
        renderItem={(results) => (
          <List.Item
            title={results.item?.username}
            onPress={() => handlePress(results)}
            left={(props) => (
              <Avatar.Image
                size={20}
                source={{
                  uri: `${apiUrl}/${
                    results.item.profilePicture
                      ? results.item.profilePicture
                      : emptyImage
                  }`,
                }}
              />
            )}
          />
        )}
      />
    </StyledColumnView>
  );
};

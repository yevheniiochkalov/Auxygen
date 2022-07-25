import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ImageBackground } from 'react-native';
import {
  Button,
  Searchbar,
  Title,
} from 'react-native-paper';

import { useSearchSpotifyQuery } from '../../generated-components/apolloComponents';
import { useStoreActions, useStoreState } from '../../state-management/hooks';
import { StyledColumnView, Wrapper } from '../../styled-components/ReusedUI';
import { SearchFlatLists } from './SearchFlatLists';
import { styles } from '../../styled-components/StyleSheet';
import { Spinner } from '../../utils/Spinner';

interface AddContentToPostProps { }

export const AddContentToPost: React.FC<AddContentToPostProps> = ({ }) => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const postType = useStoreState((state) => state.createPost.postType);

  const { data, loading, error } = useSearchSpotifyQuery({
    variables: {
      type: postType,
      query: searchQuery,
    },
  });

  const setPostType = useStoreActions(
    (actions) => actions.createPost.setPostType,
  );

  const clearContent = useStoreActions(
    (actions) => actions.createPost.clearContent,
  );

  const cancelPostCreating = () => {
    navigation.goBack();
    clearContent();
    setPostType('thoughts');
  };
  // TODO: dont search if no data
  return (
    <ImageBackground
      style={styles.wavyBackgroundStyle}
      imageStyle={styles.wavyBackgroundImageStyle}
      source={require('../../local-assets/wavy.png')}
    >
      <Wrapper>
        <StyledColumnView>
          <Title>
            SEARCH
            {postType.toUpperCase()}
          </Title>
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />

          {searchQuery && (
            !data ? (
              <Spinner />
            ) : (
              <SearchFlatLists data={data} />
            )
          )}

          <Button onPress={cancelPostCreating}>Dismiss</Button>
        </StyledColumnView>
      </Wrapper>
    </ImageBackground>
  );
};

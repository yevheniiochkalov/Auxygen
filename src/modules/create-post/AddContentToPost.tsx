import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ImageBackground, View } from 'react-native';
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
import { grayPlaceholder } from '../../styled-components/colors';

interface AddContentToPostProps {}

export const AddContentToPost: React.FC<AddContentToPostProps> = ({}) => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const postType = useStoreState((state) => state.createPost.postType);

  const { data } = useSearchSpotifyQuery({
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
      imageStyle={styles.wavyBackgroundImageStyle2}
      source={require('../../local-assets/wavy.png')}
    >
      <Wrapper>
        <View
          style={{
          }}
        >
          <Title>
            SEARCH
            {' '}
            {postType.toUpperCase()}
            S
          </Title>
          <Searchbar
            placeholder="Search"
            placeholderTextColor={grayPlaceholder}
            onChangeText={(searchQuery) => setSearchQuery(searchQuery)}
            value={searchQuery}
          />

          {searchQuery ? (
            !data ? (
              <Spinner />
            ) : (
              <SearchFlatLists data={data} />
            )
          ) : (
            <></>
          )}

          <Button
            labelStyle={{
              color: 'white',
            }}
            onPress={cancelPostCreating}
          >Dismiss
          </Button>
        </View>
      </Wrapper>
    </ImageBackground>
  );
};

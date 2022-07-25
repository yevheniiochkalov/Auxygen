import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  TextInput, ImageBackground, StyleSheet, View, Text,
} from 'react-native';
import {
  Title,
  Searchbar,
  Avatar,
  List,
  IconButton,
} from 'react-native-paper';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

import { StyledColumnView } from '../../../styled-components/ReusedUI';
import { TrackSearchPlaylist } from './TrackSearchPlaylist';
import { UserInfo } from '../UserInfo';
import { CreatePostHeader } from '../CreatePostHeader';

import { styles } from '../../../styled-components/StyleSheet';
import {
  useCreatePlaylistMutation,
  PlaylistTrackInput,
  PlaylistInput,
  GetPostsDocument,
} from '../../../generated-components/apolloComponents';
import { grayPlaceholder } from '../../../styled-components/colors';
import { height } from '../../../styled-components/theme';
import { useStoreActions } from '../../../state-management/hooks';

interface CreatePlaylistProps {}
export type PlaylistItemType = {
  name?: string;
  id?: string;
  artists?: string[];
  externalUrl?: string;
  imageUrl?: string;
};

export const CreatePlaylist: React.FC<CreatePlaylistProps> = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [array, setArray] = useState(Array<PlaylistItemType>().fill({}));
  const [createPlaylist] = useCreatePlaylistMutation();

  const setPostType = useStoreActions(
    (actions) => actions.createPost.setPostType,
  );

  const submitPlaylist = async () => {
    const tracks: PlaylistTrackInput[] = array.map((i) => {
      const trackImageUrl = i.imageUrl;
      delete i.imageUrl;
      return { ...i, trackImageUrl };
    });
    const playlistData: PlaylistInput = {
      title,
      description,
      tracks,
    };
    try {
      const response = await createPlaylist({
        variables: { data: playlistData },
        refetchQueries: [{ query: GetPostsDocument }],
      });
      if (response.data) {
        // let user know
        alert('Success');
        setPostType('thoughts');
        // navigate away
        navigation.navigate('Feed');
      } else {
        alert('Post Unsuccesful ');
      }
    } catch (err) {
      return err;
    } finally {
      // TODO:  need to check for an error... or lool at the behave of this

      setTitle('');
      setDescription('');
      setArray(Array<PlaylistItemType>().fill({}));
      setSearchQuery('');

      // redirect to home page
      // let know post was succesfule
    }
  };

  return (
    <ImageBackground
      style={styles.wavyBackgroundStyle}
      imageStyle={styles.wavyBackgroundImageStyle2}
      source={require('../../../local-assets/wavy.png')}
    >
      <CreatePostHeader title="Create Playlist" navigation={navigation} handleSubmit={submitPlaylist} />
      <ScrollView contentContainerStyle={{
        height: searchQuery ? (height + 250) + (array.length * 68) : height + (array.length * 65),
      }}
      >
        <StyledColumnView style={{ marginLeft: 20, marginRight: 20 }}>
          <UserInfo />
          <TextInput
            placeholder="Playlist Title"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor={grayPlaceholder}
            style={createPlaylistStyles.input}
          />
          <TextInput
            placeholder="Playlist Description"
            value={description}
            onChangeText={setDescription}
            placeholderTextColor={grayPlaceholder}
            style={createPlaylistStyles.input}
            multiline
          />
          <Searchbar
            placeholder="Search"
            placeholderTextColor={grayPlaceholder}
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
          {searchQuery ? (
            <TrackSearchPlaylist
              searchQuery={searchQuery}
              array={array}
              setArray={setArray}
            />
          ) : (
            <></>
          )}
          <View style={createPlaylistStyles.selectedSongs}>
            <Title>Selected Songs: </Title>
            <FlatList
              data={array}
              keyExtractor={(item, index) => item!?.id!?.toString() + index}
              renderItem={(results) => (
                <List.Item
                  title={results.item?.name}
                  description={results.item?.artists?.map((item, ix) => item)}
                  left={(props) => (
                    <Avatar.Image
                      size={20}
                      source={{
                        uri: `${results.item?.imageUrl}`,
                      }}
                    />
                  )}
                  right={() => (
                    <IconButton
                      icon="cancel"
                      onPress={() => {
                        setArray(
                          array.filter((i) => i.name !== results.item.name),
                        );
                      }}
                    />
                  )}
                />
              )}
            />
          </View>
        </StyledColumnView>
      </ScrollView>
    </ImageBackground>
  );
};

const createPlaylistStyles = StyleSheet.create({
  input: {
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 40,
    fontFamily: 'Montserrat_500Medium',
    letterSpacing: 1,
    borderColor: grayPlaceholder,
    marginBottom: 20,
    color: '#ffffff',
    padding: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  selectedSongs: {
    marginTop: 30,
  },
});

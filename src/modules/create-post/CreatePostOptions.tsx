import { useNavigation } from '@react-navigation/native';
import {
  Image, StyleSheet, Text, View,
} from 'react-native';
import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

// import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ArtistIcon from '../../../assets/account-music.png';
import AlbumIcon from '../../../assets/album_icon.png';

import { useStoreActions } from '../../state-management/hooks';

interface CreatePostOptionsProps {}

export const CreatePostOptions: React.FC<CreatePostOptionsProps> = () => {
  const navigation = useNavigation();
  const setPostType = useStoreActions(
    (actions) => actions.createPost.setPostType,
  );

  const themeContext = useContext(ThemeContext);
  const postTypes = ['track', 'artist', 'album', 'poll', 'playlist'];

  const navigateToCreating = (item) => {
    if (item === 'poll') {
      navigation.navigate('CreatePoll');
    } else if (item === 'playlist') {
      navigation.navigate('CreatePlaylist');
    } else {
      setPostType(item);
      navigation.navigate('AddContentToPost');
    }
  };

  return (
    <ScrollView style={styles.optionsList}>
      {postTypes.map((item) => (
        <View
          style={{ flex: 1 }}
          key={item}
        >
          <TouchableOpacity
            style={styles.optionBtn}
            onPress={() => navigateToCreating(item)}
          >
            {item === 'artist' ? (
              <Image
                source={ArtistIcon}
                style={[{
                  height: 23,
                  width: 23,
                  marginRight: 13,
                }, {
                  tintColor: 'white',
                }]}
              />
            ) : item === 'album' ? (
              <Image
                source={AlbumIcon}
                style={[{
                  height: 23,
                  width: 23,
                  marginRight: 13,
                  marginTop: -1,
                }, {
                  tintColor: 'white',
                }]}
              />
            ) : (
              <Icon
                name={
                      item === 'artist' ? 'user-music' : (
                        item === 'track' ? 'music' : (
                          item === 'playlist' ? 'playlist-music' : (
                            'poll-box'
                          )
                        )
                      )
                    }
                size={20}
                color="#fff"
                style={styles.optionIcon}
              />
            )}
            <Text style={[styles.optionLabel, { color: themeContext.colors.simpleWhite }]}>
              {item[0].toUpperCase() + item.slice(1, item.length)}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  optionsList: {
    width: '100%',
  },
  optionBtn: {
    borderTopWidth: 1,
    borderTopColor: '#707285',
    paddingTop: 20,
    paddingBottom: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  optionLabel: {
    fontSize: 18,
    fontFamily: 'Montserrat_500Medium',
  },
  optionIcon: {
    marginRight: 15,
  },
});

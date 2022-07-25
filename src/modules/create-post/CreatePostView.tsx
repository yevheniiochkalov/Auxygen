import React, { useEffect, useState, useContext } from 'react';
import { ImageBackground, Platform, View } from 'react-native';
import { ThemeContext } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import { ScrollView } from 'react-native-gesture-handler';
import { ContentPreview } from './ContentPreview';
import { CreatePostOptions } from './CreatePostOptions';
import { AlbumStars } from './ratings/AlbumStars';
import { TrackVotes } from './ratings/TrackVotes';
import { UserInfo } from './UserInfo';
import { TextArea } from './TextArea';
import { CreatePostHeader } from './CreatePostHeader';
import { CreatePostNavProps } from '../../navigation/app/create-post/CreatePostParamList';

import { useStoreActions, useStoreState } from '../../state-management/hooks';
import { useSubmitContentPost } from './useSubmitContentPost';
import { styles } from '../../styled-components/StyleSheet';

interface CreatePostViewProps {}

export const CreatePostView: React.FC<CreatePostNavProps<
  'CreatePost'
>> = () => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();
  const userState = useStoreState((state) => state.user.user);
  const submitContent = useSubmitContentPost();
  const content = useStoreState((state) => state.createPost.content);
  const postType = useStoreState((state) => state.createPost.postType);
  const [toDisplay, setToDisplay] = useState(0);
  const setContent = useStoreActions(
    (actions) => actions.createPost.setContent,
  );
  const clearContent = useStoreActions(
    (actions) => actions.createPost.clearContent,
  );

  const setPostType = useStoreActions(
    (actions) => actions.createPost.setPostType,
  );

  const [text, setText] = React.useState('');

  const clearDisplay = () => {
    clearContent();
    setPostType('thoughts');
  };

  // make sure text is set before submitting content
  useEffect(() => {
    if (content.text) {
      const actuallySubmit = async () => {
        const response = await submitContent();

        if (response.data) {
          alert('Success');
          setPostType('thoughts');
          clearContent();
          setText('');

          // navigate away
          navigation.navigate('Feed');
        } else {
          alert('Post Unsuccesful ');
        }
        // TODO: handle loading + failure
      };
      actuallySubmit();
    }
  }, [content]);

  const submitCreatePost = async () => {
    setContent({ ...content, text });
    setText('');
  };

  return (
    <ImageBackground
      style={styles.wavyBackgroundStyle}
      imageStyle={styles.wavyBackgroundImageStyle2}
      source={require('../../local-assets/wavy.png')}
    >
      <CreatePostHeader
        navigation={navigation}
        title="Create Post"
        handleSubmit={submitCreatePost}
        disabledSubmit={
          !text || !text.trim() || (postType === 'album' && !content.rating)
        }
      />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: Platform.OS === 'ios' ? 180 : 120,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <UserInfo />

        <View
          style={{
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <TextArea
            value={text}
            setValue={setText}
            placeholder="Your thoughts here…"
            minHeight={150}
          />
        </View>

        {content.name && postType === 'track' ? (
          <TrackVotes />
        ) : content.name && postType === 'album' ? (
          <AlbumStars />
        ) : (
          <></>
        )}
        {content.name ? (
          <ContentPreview
            onPress={(value) => {
              setToDisplay(value);
              clearDisplay();
            }}
          />
        ) : (
          <CreatePostOptions />
        )}

      </ScrollView>
    </ImageBackground>
  );
};

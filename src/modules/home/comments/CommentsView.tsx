import React, {
  useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import {
  Button,
  Caption,
  Card,
} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import {
  View, Image, ImageBackground, Keyboard, Platform, Text, RefreshControl,
} from 'react-native';
import { ThemeContext } from 'styled-components';
import { useFocusEffect } from '@react-navigation/native';
import {
  StyledColumnView,
  Row,
} from '../../../styled-components/ReusedUI';
import { HomeStackNavProps } from '../../../navigation/app/home/HomeParamList';
import { AddComment } from './AddComment';
import { styles } from '../../../styled-components/StyleSheet';
import { useStoreActions, useStoreState } from '../../../state-management/hooks';
import getEnvVars from '../../../../environment';
import { grayPlaceholder } from '../../../styled-components/colors';
import { PollView } from '../PollView';
import { Comment } from './Comment';
import { CommentsList } from './CommentsList';
import { Spinner } from '../../../utils/Spinner';

const { apiUrl } = getEnvVars();

export const CommentsView: React.FC<HomeStackNavProps<'CommentPage'>> = ({
  route,
  navigation,
}) => {
  const themeContext = useContext(ThemeContext);
  const currentUser = useStoreState((state) => state.user.user);
  const {
    fromReplyNotification,
    postId,
    postType,
    postAuthor,
    contentId,
    playlistTitle,
    text,
    name,
    imageUrl,
    question,
    poll,
  } = route.params;
  const user = useStoreState((state) => state.user.user);
  const [loading, setLoading] = useState(false);
  const getCommentsThunk = useStoreActions((actions) => actions.postComments.getPostCommentsThunk);
  const clearComments = useStoreActions((actions) => actions.postComments.clearComments);
  const setCurrentPost = useStoreActions((actions) => actions.postComments.setCurrentPost);
  const commentsFromState = useStoreState((state) => (
    Object.values(state.postComments.commentsObjects)
  ));

  const comments = useMemo(() => (
    commentsFromState.filter((comment) => !comment.replyToId)
  ), [commentsFromState]);

  useFocusEffect(
    React.useCallback(() => {
      setCurrentPost({ postId });
      return () => {
        setCurrentPost({});
      };
    }, []),
  );

  useEffect(() => {
    setLoading(true);
    const apiCall = async () => {
      await getCommentsThunk({
        id: postId,
        postType,
      });
      setLoading(false);
    };

    apiCall();

    return () => {
      clearComments();
    };
  }, []);

  useEffect(() => {
    console.log(fromReplyNotification, 'sdfasdfsdf11');
  }, []);

  const [keyboardShowListener, setKeyboardShowListener] = React.useState(null);
  const [keyboardHideListener, setKeyboardHideListener] = React.useState(null);
  const [isKeyboardShown, setIsKeyboardShown] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [commentCoords, setCommentCoords] = useState({});

  const scrollViewRef = useRef(null);

  useEffect(() => {
    setKeyboardShowListener(Keyboard.addListener('keyboardDidShow', _keyboardDidShow));
    setKeyboardHideListener(Keyboard.addListener('keyboardDidHide', _keyboardDidHide));

    return () => {
      if (keyboardShowListener) keyboardShowListener.remove();
      if (keyboardHideListener) keyboardHideListener.remove();
    };
  }, []);

  const _keyboardDidShow = (e) => {
    setIsKeyboardShown(true);
  };

  const _keyboardDidHide = () => {
    setIsKeyboardShown(false);
  };

  const refreshComments = async () => {
    setRefreshing(true);
    await getCommentsThunk({
      id: postId,
      postType,
    });
    setRefreshing(false);
  };

  const pressReply = (replyTo: any) => {
    setReplyTo(replyTo);
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  };

  const onCommentLayout = (event: any, id: string, text: string) => {
    const { layout } = event.nativeEvent;
    setCommentCoords({
      ...commentCoords,
      [id]: layout.y,
    });

    if (+id === +fromReplyNotification) {
      scrollViewRef.current.scrollTo({ y: layout.y, animated: true });
    }
  };

  if (loading) {
    return (
      <Spinner />
    );
  }

  return (
    <ImageBackground
      style={styles.wavyBackgroundStyle}
      imageStyle={styles.wavyBackgroundImageStyle}
      source={require('../../../local-assets/wavy.png')}
    >
      <ScrollView
        ref={scrollViewRef}
        keyboardShouldPersistTaps="handled"
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshComments}
          />
        )}
        contentContainerStyle={{
          paddingBottom: Platform.OS === 'ios' ? 180 : 120,
        }}
      >
        <StyledColumnView>
          {postType === 'poll' && !isKeyboardShown && (
            <View>
              <PollView
                item={poll}
                navigation={navigation}
                route={route}
                from="comments"
              />
            </View>
          )}
          {postType !== 'poll' && !isKeyboardShown && (
            (
              <ScrollView>
                <Card
                  style={{
                    marginBottom: 10,
                    marginTop: 30,
                  }}
                  theme={{ roundness: 15 }}
                >
                  <Card.Content
                    style={{
                      paddingHorizontal: 0,
                      paddingVertical: 0,
                      paddingLeft: 20,
                    }}
                  >
                    {/** ***********  Content Image ************ */}
                    {postType !== 'thoughts' && (
                      <Row
                        style={{ justifyContent: 'space-around', paddingRight: 10 }}
                      >
                        <View
                          style={{
                            // TODO: modify for android
                            shadowColor: themeContext.colors.primary,
                            shadowOffset: { width: 0.5, height: 5 },
                            shadowOpacity: 0.3,
                          }}
                        >
                          <Image
                            style={{
                              width: 260,
                              height: 260,
                              left: -30,
                              top: -40,
                              borderRadius: 15,
                            }}
                            resizeMode="contain"
                            source={{
                              uri: `${imageUrl}`,
                            }}
                          />
                        </View>
                      </Row>
                    )}
                    {postType === 'playlist' && (
                      <Text
                        style={{
                          fontFamily: 'Montserrat_500Medium',
                          fontSize: 18,
                          color: '#fff',
                          paddingRight: 20,
                          marginBottom: 20,
                        }}
                      >
                        {playlistTitle}
                      </Text>
                    )}
                    <Text style={{
                      fontFamily: 'Montserrat_400Regular',
                      fontSize: 14,
                      color: grayPlaceholder,
                      paddingRight: 20,
                      marginBottom: 20,
                      marginTop: postType === 'thoughts' ? 20 : 0,
                    }}
                    >
                      {text}
                    </Text>
                  </Card.Content>
                </Card>
              </ScrollView>
            )
          )}
          <AddComment
            imageUrl={`${apiUrl}/${currentUser.profilePicture}`}
            navigation={navigation}
            route={route}
            postId={postId}
            replyTo={replyTo}
            setReplyTo={setReplyTo}
          />

          <CommentsList
            comments={comments}
            postType={postType}
            postId={postId}
            pressReply={pressReply}
            userId={user.id}
            onLayout={onCommentLayout}
          />
        </StyledColumnView>
      </ScrollView>
    </ImageBackground>
  );
};

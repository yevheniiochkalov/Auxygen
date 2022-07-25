import React, { useContext, useState } from 'react';
import {
  StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View,
} from 'react-native';
import { Avatar, Button, Text } from 'react-native-paper';
import { ThemeContext } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import { CommentLikeButton } from './CommentLikeButton';

import getEnvVars from '../../../../environment';
import { cyanB } from '../../../styled-components/colors';
import { shortTimeSince } from '../../../utils/timeSince';

const { apiUrl } = getEnvVars();

export const Comment = ({
  item,
  isReply,
  postType,
  postId,
  pressReply,
  userId,
  onLayout,
}) => {
  const navigation = useNavigation();
  const themeContext = useContext(ThemeContext);
  const [showReplies, setShowReplies] = useState(false);

  const toggleShowReplies = () => {
    setShowReplies(!showReplies);
  };

  const goToUserPage = () => {
    navigation.navigate('UserPage', { id: +item.user.id });
  };

  return (
    <>
      <View
        onLayout={(event: any) => onLayout(event, item.id, item.text)}
        style={{
          marginTop: 7,
        }}
      >
        <View style={isReply >= 1 && ({
          marginLeft: 30,
        })}
        >
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingRight: 70,
            position: 'relative',
          }}
          >
            <TouchableOpacity
              onPress={goToUserPage}
            >
              <Avatar.Image
                size={isReply === 0 ? 30 : 23}
                style={{
                  marginRight: 7,
                }}
                source={{
                  uri: `${apiUrl}/${item.user.profilePicture}`,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: themeContext.colors.darkText,
                lineHeight: 20,
              }}
            >
              <TouchableWithoutFeedback onPress={goToUserPage}>
                <Text style={{ color: 'white' }}>{item.user.username} </Text>
              </TouchableWithoutFeedback>
              {item.parentCommentAuthor && (
                <Text style={styles.replyAuthorName}> @{item.parentCommentAuthor}</Text>
              )}
              {item.text}
            </Text>

            <View style={{
              position: 'absolute',
              right: 0,
              top: 10,
            }}
            >
              <CommentLikeButton
                commentId={+item.id}
                postType={postType}
                postId={postId}
                isLiked={item.likedUsers?.includes(+userId)}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                marginLeft: 37,
              }}
            >
              <Text style={[styles.subText, { textTransform: 'lowercase', marginRight: 15 }]}>
                {shortTimeSince((item.timeSubmitted))}
              </Text>
              <Text style={styles.subText}>
                {item.likes} likes
              </Text>
            </View>
            <Button
              onPress={() => pressReply({
                id: item.id,
                author: item.user.username,
              })}
              labelStyle={styles.subText}
            >
              Reply
            </Button>
          </View>
        </View>
      </View>

      {item.replies && (
        isReply === 0 ? (
          <>
            <Button
              onPress={toggleShowReplies}
              icon={showReplies ? 'arrow-up' : 'arrow-down'}
              labelStyle={{
                color: '#ffffff',
                fontFamily: 'Montserrat_400Regular',
                fontSize: 10.5,
              }}
            >
              {showReplies ? 'Hide replies' : 'Show replies'}
            </Button>
            {showReplies && (
              item.replies.map((reply) => (
                <Comment
                  item={reply}
                  key={reply.id}
                  isReply={isReply + 1}
                  postType={postType}
                  postId={postId}
                  pressReply={pressReply}
                  userId={userId}
                  onLayout={onLayout}
                />
              ))
            )}
          </>
        ) : (
          item.replies.map((reply) => (
            <Comment
              item={reply}
              key={reply.id}
              isReply={isReply + 1}
              postType={postType}
              postId={postId}
              pressReply={pressReply}
              userId={userId}
              onLayout={onLayout}
            />
          ))
        )

      )}
    </>
  );
};

const styles = StyleSheet.create({
  replyAuthorName: {
    color: cyanB,
  },
  commentRow: {
    justifyContent: 'space-between',
  },
  subText: {
    color: 'rgba(255,255,255,0.5)',
    fontFamily: 'Montserrat_400Regular',
    fontSize: 13,
    textTransform: 'capitalize',
  },
});

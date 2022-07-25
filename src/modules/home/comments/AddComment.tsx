import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import {
  Keyboard, Text, TextInput, View,
} from 'react-native';
import { IconButton, Avatar } from 'react-native-paper';
import { ThemeContext } from 'styled-components';
import { Row } from '../../../styled-components/ReusedUI';
import { HomeStackNavProps } from '../../../navigation/app/home/HomeParamList';
import {
  useCreateCommentMutation,
  CommentInput,
  GetCommentsDocument,
} from '../../../generated-components/apolloComponents';
import { width } from '../../../styled-components/theme';
import SocketClient from '../../../modules/user/Socket';
import { useStoreActions, useStoreState } from '../../../state-management/hooks';

type replyToType = {
  id: number,
  author: string
}
interface AddCommentProps {
  imageUrl: string;
  postId: number;
  replyTo: replyToType | null;
  setReplyTo: (replyTo: replyToType | null) => void
}

export const AddComment: React.FC<
  AddCommentProps & HomeStackNavProps<'CommentPage'>
> = ({
  navigation, route, imageUrl, postId, replyTo, setReplyTo,
}) => {
  const [isFetching, setIsFetching] = useState(false);
  const themeContext = useContext(ThemeContext);
  const [text, setText] = React.useState('');
  const [createComment] = useCreateCommentMutation();
  const { postId: id, postType, postAuthor } = route.params;
  const user = useStoreState((state) => state.user.user);
  const getPostCommentsThunk = useStoreActions((actions) => (
    actions.postComments.getPostCommentsThunk
  ));

  const inputRef = useRef(null);

  useEffect(() => {
    if (!replyTo) return;

    setText('\n');
    inputRef.current.focus();
  }, [replyTo]);

  const handleChange = (value) => {
    if (text.length > value.length) {
      if (replyTo && text.length === 1) {
        setReplyTo(null);
        setText('');
        return;
      }
    }
    setText(value);
  };

  const submitCreateComment = async () => {
    setIsFetching(true);
    const data: CommentInput = {
      text,
      id,
      postType,
      replyToId: replyTo ? Number(replyTo.id) : null,
    };
    try {
      const response = await createComment({
        variables: { data },
        refetchQueries: [
          {
            query: GetCommentsDocument,
            variables: {
              data: {
                id,
                postType,
              },
            },
          },
        ],
      });

      await getPostCommentsThunk({
        postType,
        id: postId,
      });
      SocketClient.sendSocketComment({
        postType,
        postId: id,
        postAuthor,
        sender: user,
        text: response.data.createComment.text,
      });

      if (replyTo) {
        SocketClient.sendSocketReplyComment({
          postType,
          postId: id,
          replyTo,
          sender: user,
          text: response.data.createComment.text,
        });
      }

      setText('');
      setReplyTo(null);

      Keyboard.dismiss();

      setIsFetching(false);
      return response;
    } catch (err) {
      setText('');
      console.log(err.message);
      setIsFetching(false);
      return err;
    }
  };

  return (
    <Row
      style={{
        justifyContent: 'space-between',
        alignContent: 'center',
        paddingRight: 15,
        paddingLeft: 15,
      }}
    >
      <Avatar.Image
        size={24}
        style={{
          marginTop: 10,
          marginRight: 15,
        }}
        source={{
          uri: `${imageUrl}`,
        }}
      />

      <View style={{
        flexGrow: 1,
        maxWidth: width * 0.65,
        position: 'relative',
      }}
      >
        {replyTo && (
          <View
            style={{
              position: 'absolute',
              backgroundColor: 'purple',
              zIndex: 10,
              top: 13,
              left: 15,
              paddingVertical: 3,
              paddingHorizontal: 10,
              borderRadius: 15,
            }}
          >
            <Text style={{
              color: 'white',
            }}
            >
              Reply to @{replyTo.author}
            </Text>
          </View>
        )}
        <TextInput
          placeholderTextColor={themeContext.colors.darkText}
          value={text}
          onChangeText={handleChange}
          multiline
          ref={inputRef}
          placeholder="Leave your comment..."
          style={{
            borderRadius: 40,
            backgroundColor: '#26274B',
            paddingBottom: 20,
            paddingTop: 20,
            minHeight: 0,
            paddingHorizontal: 15,
            color: 'rgba(255,255,255,0.5)',
            borderColor: replyTo && 'purple',
            borderWidth: replyTo && 1,
          }}
        />
      </View>
      <IconButton
        icon="send"
        onPress={submitCreateComment}
        disabled={
          !text
          || !text.trim()
          || (text.split(' ').filter((l) => l !== '\n' && l !== '').length === 1 && text[0] === '@')
          || isFetching
        }
      />
    </Row>
  );
};

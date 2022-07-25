import React, {
  useEffect, useRef, useContext, useState,
} from 'react';
import { ToggleButton, Colors } from 'react-native-paper';
import { ThemeContext } from 'styled-components';
import {
  useUpdateCommentLikesMutation,
  LikeInput,
  GetCommentsDocument,

  useUpdatePostLikesMutation,
  GetPostsDocument,
  GetUserPostsDocument,
  User,
  GetPostsOfFollowingDocument,
} from '../../generated-components/apolloComponents';
import SocketClient, { LIKE_EVENT } from '../../modules/user/Socket';
import { useStoreState } from '../../state-management/hooks';

interface PostLikeButtonProps {
  postType: string;
  postId: number;
  postAuthor: User;
  isLiked?: boolean;
  refetchFeed: () => void;
}
type Status = 'checked' | 'unchecked';
export const PostLikeButton: React.FC<PostLikeButtonProps> = ({
  postId,
  postType,
  postAuthor,
  isLiked,
  refetchFeed,
}) => {
  const themeContext = useContext(ThemeContext);
  const [setLikeUnlike] = useUpdatePostLikesMutation();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = React.useState('unchecked');
  const user = useStoreState((state) => state.user.user);

  useEffect(() => {
    if (isLiked) setStatus('cheched');
  }, []);

  const onButtonToggle = async (value) => {
    setLoading(true);
    setStatus(status === 'unchecked' ? 'checked' : 'unchecked');
    await submitSetLikeUnlike(status === 'unchecked' ? 'checked' : 'unchecked');
    setTimeout(() => {
      setLoading(false);
    }, 400);
  };

  const submitSetLikeUnlike = async (status) => {
    let value: boolean = true;
    status === 'unchecked' ? (value = false) : value;
    const data: LikeInput = {
      id: postId,
      postType,
      value,
    };

    try {
      const response = await setLikeUnlike({
        variables: { data },
        refetchQueries: [
          {
            query: GetPostsDocument,
          },
          {
            query: GetUserPostsDocument,
          },
          {
            query: GetPostsOfFollowingDocument,
          },
        ],
      });
      if (value) {
        SocketClient.sendSocketLike({
          postType,
          postId,
          postAuthor,
          sender: user,
        });
      }
      await refetchFeed();
      return response;
    } catch (err) {
      return err;
    }
  };

  return (
    <ToggleButton
      disabled={loading}
      icon={!isLiked ? 'heart-outline' : 'heart'}
      color={themeContext.colors.accent}
      value="heart"
      status={status as Status}
      onPress={onButtonToggle}
    />
  );
};

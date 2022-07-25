import React, {
  useEffect, useRef, useContext, useState,
} from 'react';
import { ToggleButton, Colors } from 'react-native-paper';
import { ThemeContext } from 'styled-components';
import {
  useUpdateCommentLikesMutation,
  LikeInput,
} from '../../../generated-components/apolloComponents';
import { useStoreActions, useStoreState } from '../../../state-management/hooks';

interface CommentLikeButtonProps {
  commentId: number;
  postType: string;
  postId: number;
  isLiked: boolean
}
type Status = 'checked' | 'unchecked';
export const CommentLikeButton: React.FC<CommentLikeButtonProps> = ({
  commentId,
  postType,
  postId,
  isLiked,
}) => {
  const themeContext = useContext(ThemeContext);
  const [setLikeUnlike] = useUpdateCommentLikesMutation();
  const [status, setStatus] = React.useState('unchecked');
  const user = useStoreState((state) => state.user.user);
  const setCommentLikeUnlike = useStoreActions((actions) => actions.postComments.setLikeUnlike);
  const firstUpdate = useRef(true);
  const [loading, setLoading] = useState(false);
  const getPostCommentsThunk = useStoreActions((actions) => (
    actions.postComments.getPostCommentsThunk
  ));

  useEffect(() => {
    if (isLiked) setStatus('checked');
  }, []);

  const onButtonToggle = (value) => {
    setLoading(true);
    setStatus(status === 'unchecked' ? 'checked' : 'unchecked');
    submitSetLikeUnlike(status === 'unchecked' ? 'checked' : 'unchecked');
    setTimeout(() => {
      setLoading(false);
    }, 400);
  };

  const submitSetLikeUnlike = async (status) => {
    let value: boolean = true;
    status === 'unchecked' ? (value = false) : value;
    const data: LikeInput = {
      id: commentId,
      value,
    };
    try {
      const response = await setLikeUnlike({
        variables: { data },
      });

      await getPostCommentsThunk({
        postType,
        id: postId,
      });

      // setCommentLikeUnlike({
      //   value,
      //   commentId,
      //   userId: user.id,
      // });
      return response;
    } catch (err) {
      return err;
    }
  };

  return (
    <ToggleButton
      disabled={loading}
      icon={status === 'unchecked' ? 'heart-outline' : 'heart'}
      color={themeContext.colors.accent}
      value="heart"
      status={status as Status}
      onPress={onButtonToggle}
    />
  );
};

import React from 'react';
import { Button, IconButton } from 'react-native-paper';
import {
  MyListInput,
  MyListItem,
  useAddToMyListMutation,
  GetMyListDocument,
  useRemoveFromMyListMutation,
} from '../../generated-components/apolloComponents';

// type AddToMyListButtonProps = MyListItem

export const RemoveFromMyListButton: React.FC<MyListItem> = ({
  postId,
  postType,
}) => {
  const [removeFromMyList, { loading }] = useRemoveFromMyListMutation();

  const submitMyList = async () => {
    const data: MyListInput = {
      postId,
      postType,
    };

    try {
      const response = await removeFromMyList({
        variables: { data },
        refetchQueries: [{ query: GetMyListDocument }],
      });
      return response;
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <IconButton
      disabled={loading}
      icon="playlist-minus"
      onPress={submitMyList}
    />
  );
};

import React, { useContext } from 'react';
import { Platform, ToastAndroid } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { ThemeContext } from 'styled-components';
import {
  MyListInput,
  MyListItem,
  useAddToMyListMutation,
  GetMyListDocument,
} from '../../generated-components/apolloComponents';

// type AddToMyListButtonProps = MyListItem

export const AddToMyListButton: React.FC<MyListItem> = ({
  postId,
  postType,
}) => {
  const themeContext = useContext(ThemeContext);
  const [addToMyList, { loading }] = useAddToMyListMutation();

  const submitAddToMyList = async () => {
    const data: MyListInput = {
      postId,
      postType,
    };
    showToast();
    try {
      const response = await addToMyList({
        variables: { data },
        refetchQueries: [{ query: GetMyListDocument }],
      });
      if (Platform.OS === 'ios') {
        alert('Saved to my list');
      }
      return response;
    } catch (err) {
      return err;
    }
  };
  const showToast = () => {
    ToastAndroid.show('Saved to my list', ToastAndroid.SHORT);
  };

  return (
    <IconButton
      disabled={loading}
      color={themeContext.colors.accent}
      icon="playlist-plus"
      size={30}
      onPress={submitAddToMyList}
    />
  );
};

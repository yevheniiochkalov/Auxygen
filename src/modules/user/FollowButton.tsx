import React, { useEffect } from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';

import { OtherUserData } from './UserView';

import SocketClient from './Socket';
import {
  useFollowOtherUserMutation,
  GetOtherUserDocument,
  GetOtherUserQuery,
  GetPostsOfFollowingDocument,
} from '../../generated-components/apolloComponents';
import { client } from '../../index';
import { deepPurpleB } from '../../styled-components/colors';
import { useStoreState } from '../../state-management/hooks';

interface FollowButtonProps {
  // id of user that is going to be followed
  id: number;
  follow: boolean;
  setOtherUser: (value: React.SetStateAction<OtherUserData>) => void;
  // submitFollowUser: (id: number, follow: boolean) => Promise<any>;
  // setUpdate: (value: React.SetStateAction<boolean>) => void;
}

export const FollowButton: React.FC<FollowButtonProps> = ({
  id,
  follow,
  setOtherUser,
}) => {
  const [followUser, { data: mdata, loading }] = useFollowOtherUserMutation();

  const user = useStoreState((state) => state.user.user);

  useEffect(() => {
    try {
      const { getOtherUser: cacheData } = client.readQuery<GetOtherUserQuery>({
        query: GetOtherUserDocument,
        variables: {
          id,
        },
      });
    } catch (err) {
      console.log('no data yet in follow', err);
    }
  });

  const submitFollowUser = async (id: number, follow: boolean) => {
    try {
      const res = await followUser({
        variables: { id, follow },
        refetchQueries: [
          { query: GetOtherUserDocument, variables: { data: { id } } },
          { query: GetPostsOfFollowingDocument },
        ],
      });
      res.data.followOtherUser
        ? setOtherUser(res.data.followOtherUser)
        : null;

      const { username, id: newId, profilePicture } = res.data.followOtherUser;

      if (follow) {
        SocketClient.sendSocketFollow({
          username,
          id: newId,
          profilePicture,
        }, user);
      }
    } catch (err) {
      return err;
    }
  };

  return (
    <Button
      mode="contained"
      style={styles.button}
      labelStyle={styles.label}
      icon="account-plus-outline"
      disabled={loading}
      onPress={() => submitFollowUser(id, follow)}
    >
      {follow ? 'FOLLOW' : 'UNFOLLOW'}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: deepPurpleB,
    width: 130,
    paddingTop: 5,
    paddingBottom: 5,
  },
  label: {
    fontFamily: 'Montserrat_500Medium',
    letterSpacing: 1,
    fontSize: 13,
  },
});

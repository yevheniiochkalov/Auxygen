import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Avatar } from 'react-native-paper';

import { useStoreState } from '../../state-management/hooks';
import getEnvVars from '../../../environment';

const { apiUrl } = getEnvVars();

interface UserInfoProps {}

export const UserInfo: React.FC<UserInfoProps> = () => {
  const userState = useStoreState((state) => state.user.user);

  return (
    <View style={styles.infoWrap}>
      {userState.profilePicture ? (
        <Avatar.Image
          size={55}
          source={{
            uri: `${apiUrl}/${userState.profilePicture}`,
          }}
        />
      ) : (
        <Avatar.Icon size={55} icon="account" />
      )}
      <Text style={styles.username}>
        {userState.username}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  username: {
    fontSize: 17,
    color: '#ffffff',
    fontFamily: 'Montserrat_500Medium',
    marginLeft: 15,
  },
});

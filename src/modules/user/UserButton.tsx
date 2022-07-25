import React from 'react';
import { Avatar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { useStoreState } from '../../state-management/hooks';
import getEnvVars from '../../../environment';

const { apiUrl } = getEnvVars();
interface UserButtonProps {
  navigation: StackNavigationProp<Record<string, object>, string>;
}

export const UserButton: React.FC<UserButtonProps> = ({ navigation }) => {
  const userState = useStoreState((state) => state.user.user);

  const goToUser = async () => {
    navigation.navigate('UserPage', { id: userState.id });
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={goToUser}
    >
      <Avatar.Image
        size={40}
        source={{
          uri: `${apiUrl}/${userState.profilePicture}`,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // marginLeft: 15,
    // backgroundColor: 'red',
  },
});

import React from 'react';
import { Button } from 'react-native-paper';
import { AsyncStorage, StyleSheet } from 'react-native';

import { deepPurpleB } from '../../../styled-components/colors';
import { useLogoutMutation } from '../../../generated-components/apolloComponents';
import { useLoginHook } from './useLoginHook';
import { useStoreState } from '../../../state-management/hooks';
import { LinearGradientButton } from '../../../styled-components/LinearGradientButton';

interface LogoutButtonProps {}

export const LogoutButton: React.FC<LogoutButtonProps> = () => {
  const [logoutUser] = useLogoutMutation();
  const [_, setLogoutUser] = useLoginHook();
  const userState = useStoreState((state) => state.user.user);

  return (
    // <Button
    //   mode="contained"
    //   style={styles.button}
    //   labelStyle={styles.label}
    //   icon="logout"
    //   onPress={async () => {
    //     await await AsyncStorage.removeItem('token');
    //     await logoutUser();
    //     setLogoutUser();
    //   }}
    // >
    //   Logout
    // </Button>
    <LinearGradientButton
      text="Logout"
      onPress={async () => {
        await await AsyncStorage.removeItem('token');
        await logoutUser();
        setLogoutUser();
      }}
      buttonStyles={{
        width: 150,
      }}
      labelStyles={{
        fontSize: 15,
        fontFamily: 'Montserrat_500Medium',
      }}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: deepPurpleB,
  },
  label: {
    fontFamily: 'Montserrat_500Medium',
    letterSpacing: 1,
    fontSize: 15,
  },
});

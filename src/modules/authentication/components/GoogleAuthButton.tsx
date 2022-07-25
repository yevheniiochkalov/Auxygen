import React, { useContext } from 'react';
import * as Google from 'expo-google-app-auth';
import { Button, useTheme } from 'react-native-paper';
import { Alert } from 'react-native';
import {
  GOOGLE_IOS_CLIENT_ID,
  GOOGLE_ANDROID_CLIENT_ID,
  GOOGLE_WEB_CLIENT_ID,
} from '../../../utils/Keys';
import {
  SsoRegisterInput,
  useGoogleSsoMutation,
} from '../../../generated-components/apolloComponents';
import { useLoginHook } from './useLoginHook';

interface GoogleAuthButtonProps {}

export const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({}) => {
  const { colors } = useTheme();
  const [signOnUser, { loading, error }] = useGoogleSsoMutation();
  const [setLoginUser] = useLoginHook();

  async function submitSignOnUser(data: SsoRegisterInput) {
    try {
      const response = await signOnUser({
        variables: {
          data,
        },
      });
      return response.data.googleSSO.accessToken;
    } catch (err) {
      // TODO  handle server errors at top level
      console.log('server err', err);
    }
  }

  // async function submitSignInWithGoogle() {
  //   await signInWithGoogle();
  //   // setUser("googlelogin");
  // }

  async function signInWithGoogle() {
    try {
      const result = await Google.logInAsync({
        iosClientId: GOOGLE_IOS_CLIENT_ID,
        androidClientId: GOOGLE_ANDROID_CLIENT_ID,
        scopes: ['profile', 'email'],
        // clientId: GOOGLE_WEB_CLIENT_ID,
        // TODO make work for web
      });

      if (result.type === 'success') {
        // Then you can use the Google REST API
        const response = await fetch(
          'https://www.googleapis.com/userinfo/v2/me',
          {
            headers: { Authorization: `Bearer ${result.accessToken}` },
          },
        );

        const userInfo = await response.json();
        const goodUserInfo: SsoRegisterInput = {
          username: userInfo.name,
          email: userInfo.email,
          id: userInfo.id,
          profilePicture: userInfo.picture,
        };
        const token = await submitSignOnUser(goodUserInfo);
        setLoginUser(token);
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
      } else {
        return { cancelled: true };
      }
    } catch (err) {
      console.log('signing in with Google not successful! ', err);
      return { error: true };
    }
  }

  return (
    <Button
      mode="outlined"
      icon="google"
      color={colors.text}
      style={{ borderColor: colors.text }}
      onPress={() => {
        signInWithGoogle();
      }}
    >
      Sign in with Google
    </Button>
  );
};

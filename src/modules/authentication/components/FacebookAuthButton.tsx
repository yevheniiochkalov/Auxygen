import * as Facebook from 'expo-facebook';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Alert, Platform } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SsoRegisterInput,
  useFacebookSsoMutation,
} from '../../../generated-components/apolloComponents';
import { FB_ID } from '../../../utils/Keys';
import { useLoginHook } from './useLoginHook';

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://www.facebook.com/v6.0/dialog/oauth',
  tokenEndpoint: 'https://graph.facebook.com/v6.0/oauth/access_token',
};

const useProxy = Platform.select({ web: false, default: true });

export default function FacebookAuthButton() {
  const { colors } = useTheme();
  const [signOnUser, { loading, error }] = useFacebookSsoMutation();
  const [setLoginUser] = useLoginHook();

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      console.log('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }

  async function submitSignOnUser(data: SsoRegisterInput) {
    try {
      const response = await signOnUser({
        variables: {
          data,
        },
      });
      const { accessToken } = response.data.facebookSSO;
      setLoginUser(accessToken);
      await AsyncStorage.setItem('token', accessToken);

      return accessToken;
    } catch (err) {
      // TODO  handle server errors at top level

    }
  }

  // log in with the facebook app on mobile
  async function fbAppLogIn() {
    try {
      await Facebook.initializeAsync(FB_ID);

      const res = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile, email'],
      });

      if (res.type === 'success') {
        // Get the user's name using Facebook's Graph API

        const response = await fetch(
          `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${res.token}`,
        );

        let expoToken = 'none';
        if (Constants.isDevice) {
          expoToken = await registerForPushNotificationsAsync();
        }

        const userInfo = await response.json();

        const goodUserInfo: SsoRegisterInput = {
          username: userInfo.name,
          email: userInfo.email,
          id: userInfo.id,
          profilePicture: userInfo.picture.data.url,
          expoToken,
        };

        const token = await submitSignOnUser(goodUserInfo);
        setLoginUser(token);
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);

        // sign on the user to ota-server, and get an access code
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      // alert(`Facebook Login Error: ${message}`);

    }
  }

  return (
    <Button
      mode="outlined"
      icon="facebook"
      color={colors.text}
      style={{ borderColor: colors.text }}
      onPress={fbAppLogIn}
    >
      Sign in with Facebook
    </Button>
  );
}

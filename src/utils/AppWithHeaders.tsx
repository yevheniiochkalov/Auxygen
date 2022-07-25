import React, {
  useEffect, useState, useRef,
} from 'react';

import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { AsyncStorage, Platform } from 'react-native';

import {
  useFonts,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_400Regular,
  Montserrat_800ExtraBold,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import { Spinner } from './Spinner';

import { Routes } from '../../src/utils/Routes';
import { Wrapper } from '../styled-components/ReusedUI';
import getEnvVars from '../../environment';
import { useLoginHook } from '../modules/authentication/components/useLoginHook';
import { useStoreState } from '../state-management/hooks';

// @ts-ignore
const { apiUrl } = getEnvVars();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// get a refresh token on each app load
interface Props {}

export const AppWithHeaders: React.FC<Props> = () => {
  const [loading, setLoading] = useState(true);
  const [setLoginUser] = useLoginHook();

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_800ExtraBold,
    Montserrat_700Bold,
  });

  useEffect(() => {
    const fetchData = async () => {
      const storageToken = await AsyncStorage.getItem('token');
      fetch(`${apiUrl}/refresh_token`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          token: storageToken,
        },
      }).then(async (x) => {
        const response = await x.json();
        const { accessToken } = response;
        setLoginUser(accessToken);
        await AsyncStorage.setItem('token', accessToken);
        setLoading(false);
      });
    };

    const fetchAndSet = async () => {
      await fetchData();
      // setCurrentUser();
    };

    fetchAndSet();
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {

    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

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

  if (loading || !fontsLoaded) {
    return (
      <Wrapper>
        <Spinner />
      </Wrapper>
    );
  }

  return <Routes />;
};

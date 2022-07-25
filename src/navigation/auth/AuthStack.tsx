import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import * as Linking from 'expo-linking';

import * as RootNavigation from '../../utils/RootNavigation';
import { sleep } from '../../utils/sleep';
import { LoginView } from '../../modules/authentication/LoginView';
import { RegisterView } from '../../modules/authentication/RegisterView';
import { RegisterSuccess } from '../../modules/authentication/RegisterSuccess';
import { ConfirmInfo } from '../../modules/authentication/ConfirmInfo';
import { AuthParamList } from './AuthParamList';
import { LoginFailed } from '../../modules/authentication/LoginFailed';
import { ForgetPasswordView } from '../../modules/authentication/ForgetPassword';
import { ResetPasswordView } from '../../modules/authentication/ResetPassword';

interface AuthStackProps {}

const Stack = createStackNavigator<AuthParamList>();

export const AuthStack: React.FC<AuthStackProps> = () => {
  React.useEffect(() => {
    const asyncCall = async () => {
      const url = await Linking.parseInitialURLAsync();

      // await sleep(2000);
      if (url.queryParams.token) {
        RootNavigation.navigate('ResetPassword', {
          token: url.queryParams.token,
        });
      }

      if (url.queryParams.confirmation === 'false') {
        try {
          RootNavigation.navigate('ConfirmInfo', {
            confirmation: false,
          });
        } catch (error) {
          console.log(error);
        }
      }
      if (url.queryParams.confirmation === 'true') {
        RootNavigation.navigate('ConfirmInfo', {
          confirmation: true,
        });
      }
    };
    asyncCall();

    Linking.addEventListener('url', _handleRedirect);
  }, []);

  const _handleRedirect = (event) => {
    const data = Linking.parse(event.url);
    if (data.queryParams.token) {
      RootNavigation.navigate('ResetPassword', {
        token: data.queryParams.token,
      });
    }
    if (data.queryParams.confirmation === 'false') {
      setTimeout(() => {
        RootNavigation.navigate('ConfirmInfo', {
          confirmation: false,
        });
      }, 500);
    }
    if (data.queryParams.confirmation === 'true') {
      setTimeout(() => {
        RootNavigation.navigate('ConfirmInfo', {
          confirmation: true,
        });
      }, 500);
    }
  };

  return (
    <Stack.Navigator
      screenOptions={{ header: () => null }}
      initialRouteName="Login"
    >
      {/* TODO: remove these headerTitles */}
      <Stack.Screen name="Login" component={LoginView} />
      <Stack.Screen name="Register" component={RegisterView} />
      <Stack.Screen name="RegisterSuccess" component={RegisterSuccess} />
      <Stack.Screen name="ConfirmInfo" component={ConfirmInfo} />
      <Stack.Screen name="LoginFailed" component={LoginFailed} />
      <Stack.Screen name="ForgetPassword" component={ForgetPasswordView} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordView} />
      {/* <Stack.Screen name="RegisterFailed" component={RegisterView} /> */}
    </Stack.Navigator>
  );
};

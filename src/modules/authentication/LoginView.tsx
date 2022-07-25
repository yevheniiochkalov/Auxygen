import { ErrorMessage, Formik } from 'formik';
import React, { useContext } from 'react';
import {
  Button, HelperText, TextInput, useTheme,
} from 'react-native-paper';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import {
  Alert,
  AsyncStorage,
  Image, ImageBackground, Platform, View,
} from 'react-native';
import {
  LoginMutationVariables,
  useLoginMutation,
} from '../../generated-components/apolloComponents';
import { useLoginHook } from '../../modules/authentication/components/useLoginHook';
import FacebookAuthButton from '../../modules/authentication/components/FacebookAuthButton';
import { AuthNavProps } from '../../navigation/auth/AuthParamList';

import logo from '../../../assets/logo_img2.png';
import {
  LineBreak,
  StyledColumnView,
  Wrapper,
  AuthTextInput,
} from '../../styled-components/ReusedUI';
import { LoginValidationSchema } from '../../utils/FormValidationSchemas';
import { styles } from '../../styled-components/StyleSheet';

import { GradientButton } from '../../styled-components/StylishComponents';
import { height, width } from '../../styled-components/theme';
import { LinearGradientButton } from '../../styled-components/LinearGradientButton';

export const LoginView: React.FC<AuthNavProps<'Login'>> = ({ navigation }) => {
  const [loginUser, { loading, error }] = useLoginMutation();

  const [setLoginUser] = useLoginHook();
  const { colors } = useTheme();

  const goToForgetPassword = () => navigation.navigate('ForgetPassword');

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

  const submitLoginUser = async ({
    email,
    password,
    expoToken = 'none',
  }: LoginMutationVariables) => {
    try {
      const response = await loginUser({ variables: { email, password, expoToken } });
      if (
        response
        && response.data
        && response.data.login
        && response.data.login.accessToken
      ) {
        const { accessToken } = response.data.login;
        setLoginUser(accessToken);
        await AsyncStorage.setItem('token', accessToken);

        // get current user function
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  if (error) {
    navigation.navigate('LoginFailed');
  }

  const loginAndSetUser = async ({ email, password }) => {
    let token = 'n123412341234';
    if (Constants.isDevice) {
      token = await registerForPushNotificationsAsync();
    }
    await submitLoginUser({ email, password, expoToken: token });
    // setCurrentUser();
  };

  return (
    <ImageBackground
      style={styles.wavyBackgroundStyle}
      imageStyle={styles.wavyBackgroundImageStyle}
      source={require('../../local-assets/wavy.png')}
    >
      <Wrapper>
        <View style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <Image
            source={logo}
            style={{
              width: width * 0.7,
              height: height * 0.6,
              marginBottom: -150,
              marginTop: -50,
            }}
          />
        </View>
        <Formik
          initialValues={{ password: '', email: '' }}
          onSubmit={({ email, password }) => {
            email = email.toLowerCase();
            loginAndSetUser({ email, password });
          }}
          validationSchema={LoginValidationSchema}
        >
          {({
            handleChange, handleBlur, handleSubmit, values,
          }) => (
            <StyledColumnView>
              <AuthTextInput
                placeholder="EMAIL"
                placeholderTextColor="white"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email.toLowerCase()}
              />
              <HelperText>
                <ErrorMessage name="email" />
              </HelperText>

              <AuthTextInput
                placeholder="PASSWORD"
                placeholderTextColor="white"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
              />
              <HelperText>
                <ErrorMessage name="password" />
              </HelperText>

              <LineBreak />

              <View style={{
                alignItems: 'center',
                // marginTop: 15,
              }}
              >
                <LinearGradientButton
                  text="Sign In"
                  onPress={handleSubmit}
                  buttonStyles={{
                    width: 200,
                    borderRadius: 25,
                    paddingVertical: 15,
                  }}
                  labelStyles={{
                    fontSize: 16,
                    fontFamily: 'Montserrat_600SemiBold',
                  }}
                />
              </View>
            </StyledColumnView>
          )}
        </Formik>

        <View style={{
          marginBottom: 15,
        }}
        >
          {Platform.OS !== 'ios' && (
            <FacebookAuthButton />
          )}
        </View>

        <Button
          mode="text"
          color={colors.text}
          onPress={goToForgetPassword}
        >
          Forget password?
        </Button>

        <Button
          mode="text"
          color={colors.text}
          onPress={() => {
            navigation.navigate('Register');
          }}
        >
          Don't have an account? Start now!
        </Button>
      </Wrapper>
    </ImageBackground>
  );
};

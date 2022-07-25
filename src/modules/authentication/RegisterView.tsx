import { Formik, ErrorMessage } from 'formik';
import React, { useContext, useState } from 'react';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import {
  Button,
  HelperText,
} from 'react-native-paper';
import {
  AsyncStorage, Image, ImageBackground, Platform, Text, View,
} from 'react-native';
import { ThemeContext } from 'styled-components';
import { ScrollView } from 'react-native-gesture-handler';
import {
  RegisterInput,
  useLoginMutation,
  useRegisterMutation,
} from '../../generated-components/apolloComponents';
import {
  Wrapper,
  StyledColumnView,
  AuthTextInput,
} from '../../styled-components/ReusedUI';
import { AuthNavProps } from '../../navigation/auth/AuthParamList';
import { RegisterValidationSchema } from '../../utils/FormValidationSchemas';
import { styles } from '../../styled-components/StyleSheet';
import { useLoginHook } from './components/useLoginHook';
import logo from '../../../assets/logo_text.png';
import { Spinner } from '../../utils/Spinner';
import { deepPurple300 } from '../../styled-components/colors';
import getEnvVars from '../../../environment';
import { LinearGradientButton } from '../../styled-components/LinearGradientButton';

const { apiUrl } = getEnvVars();

interface RegisterViewProps {}

export const RegisterView: React.FC<AuthNavProps<'Register'>> = ({
  navigation,
}) => {
  const [loginUser, { loading: loginLoading, error: loginError }] = useLoginMutation();
  const [setLoginUser] = useLoginHook();
  const [checked, setChecked] = useState(false);

  const themeContext = useContext(ThemeContext);
  const [registerUser, { loading, error }] = useRegisterMutation();
  if (loading || loginLoading) return <Spinner />;
  if (error || loginError) {
    navigation.navigate('LoginFailed');
  }

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

  async function submitRegisterUser(data: RegisterInput) {
    try {
      const response = await registerUser({
        variables: {
          data: {
            ...data,
            betaTester: checked,
          },
        },
      });

      navigation.navigate('RegisterSuccess');
      return;
      let token = 'null';
      if (Constants.isDevice) {
        token = await registerForPushNotificationsAsync();
      }

      const { email, password } = data;
      const res = await loginUser({ variables: { email, password, expoToken: token } });
      if (
        res
        && res.data
        && res.data.login
        && res.data.login.accessToken
      ) {
        const { accessToken } = res.data.login;
        setLoginUser(accessToken);
        await AsyncStorage.setItem('token', accessToken);
      }
    } catch (err) {
      // TODO  handle server errors at top level
      console.log(err);
    }
    // navigation.navigate('Login');
  }

  const _goToPrivacy = async () => {
    const result = await WebBrowser.openBrowserAsync(`${apiUrl}/docs/privacy`);
  };

  const _goToTerms = async () => {
    const result = await WebBrowser.openBrowserAsync(`${apiUrl}/docs/terms`);
  };

  return (
    <ImageBackground
      style={styles.wavyBackgroundStyle}
      imageStyle={styles.wavyBackgroundImageStyle}
      source={require('../../local-assets/wavy.png')}
    >
      <ScrollView>
        <View
          style={{
            marginTop: 80,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: -30,
            paddingHorizontal: 60,
          }}
        >
          <Image
            source={logo}
            style={{
              height: 52,
              width: 190,
              marginBottom: 15,
            }}
          />
          <Text style={{
            color: 'white',
            fontSize: 20,
            fontFamily: 'Montserrat_600SemiBold',
            textAlign: 'center',
          }}
          >
            Sign up, and let the music speak for you.
          </Text>
        </View>
        <Formik
          initialValues={{
            username: '',
            fullname: '',
            password: '',
            email: '',
            confirmPassword: '',
          }}
          onSubmit={({
            username, password, email, fullname,
          }) => {
            email = email.toLowerCase();
            submitRegisterUser({
              username, password, email, fullname,
            });
          }}
          validationSchema={RegisterValidationSchema}
        >
          {({
            handleChange, handleBlur, handleSubmit, values,
          }) => (
            <Wrapper>
              <StyledColumnView>
                <AuthTextInput
                  placeholder="EMAIL"
                  mode="contained"
                  placeholderTextColor="white"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                <HelperText>
                  <ErrorMessage name="email" />
                </HelperText>
                <AuthTextInput
                  placeholder="FULLNAME"
                  placeholderTextColor="white"
                  onChangeText={handleChange('fullname')}
                  onBlur={handleBlur('fullname')}
                  value={values.fullname}
                />
                <HelperText>
                  <ErrorMessage name="fullname" />
                </HelperText>

                <AuthTextInput
                  placeholder="USERNAME"
                  placeholderTextColor="white"
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                />
                <HelperText>
                  <ErrorMessage name="username" />
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

                <AuthTextInput
                  placeholder="CONFIRM PASSWORD"
                  placeholderTextColor="white"
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  secureTextEntry
                />
                <HelperText>
                  <ErrorMessage name="confirmPassword" />
                </HelperText>

                <View style={{
                  alignItems: 'center',
                  marginTop: 15,
                }}
                >
                  <LinearGradientButton
                    text="Sign In"
                    onPress={handleSubmit as any}
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

              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 20,
                alignSelf: 'center',
              }}
              >
                <Text style={{
                  color: 'white',
                  fontSize: 14,
                  textAlign: 'center',
                  fontFamily: 'Montserrat_400Regular',
                }}
                >
                  By signing up, you agree to our
                  {' '}
                  <Text
                    onPress={_goToTerms}
                    style={{
                      color: deepPurple300,
                    }}
                  >
                    Terms of Use
                  </Text>
                  {' '}
                  and
                  {' '}
                  <Text
                    onPress={_goToPrivacy}
                    style={{
                      color: deepPurple300,
                    }}
                  >
                    Privacy Policy.
                  </Text>
                  {' '}
                  You may receive email updates from us, and you can choose to opt out at any time.
                </Text>
              </View>
              <Button
                mode="text"
                color="white"
                onPress={() => {
                  navigation.navigate('Login');
                }}
              >
                Back to Login Page
              </Button>
            </Wrapper>
          )}
        </Formik>
      </ScrollView>
    </ImageBackground>
  );
};

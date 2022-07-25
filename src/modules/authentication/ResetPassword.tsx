import { ErrorMessage, Formik } from 'formik';
import React, { useState } from 'react';
import {
  Button,
  HelperText,
  useTheme,
} from 'react-native-paper';
import {
  Image,
  ImageBackground,
  Platform,
  Text,
  View,
} from 'react-native';

import { AuthNavProps } from '../../navigation/auth/AuthParamList';

import logo from '../../../assets/logo_text.png';
import {
  LineBreak,
  StyledColumnView,
  Wrapper,
  AuthTextInput,
} from '../../styled-components/ReusedUI';
import { ResetPasswordValidationSchema } from '../../utils/FormValidationSchemas';
import { styles } from '../../styled-components/StyleSheet';
import { LinearGradientButton } from '../../styled-components/LinearGradientButton';
import getEnvVars from '../../../environment';

const { apiUrl } = getEnvVars();

export const ResetPasswordView: React.FC<AuthNavProps<'ResetPassword'>> = ({ navigation, route }) => {
  const { colors } = useTheme();
  const [error, setError] = useState('');
  const [successInfo, setSuccessInfo] = useState('');

  const submitResetPassword = async (data) => {
    if (!route?.params?.token) {
      return setError('Invalid link, try again.');
    }

    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: data.password,
        token: route?.params?.token,
      }),
    };

    const res = await fetch(`${apiUrl}/api/auth/reset-password`, config);
    const result = await res.json();

    if (!result.success) {
      setSuccessInfo('');
      setError(result.message);
      return;
    }

    setSuccessInfo(result.message);
    setError('');
    return true;
  };

  return (
    <ImageBackground
      style={styles.wavyBackgroundStyle}
      imageStyle={styles.wavyBackgroundImageStyle}
      source={require('../../local-assets/wavy.png')}
    >
      <Wrapper>
        <View
          style={{
            marginTop: 80,
            justifyContent: 'center',
            alignItems: 'center',
            // marginBottom: -30,
            paddingHorizontal: 30,
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
            Forget your password?
          </Text>
        </View>
        <Formik
          initialValues={{ password: '', confirmPassword: '' }}
          onSubmit={async (data, actions) => {
            const res = await submitResetPassword(data);

            if (res) actions.resetForm();
          }}
          validationSchema={ResetPasswordValidationSchema}
        >
          {({
            handleChange, handleBlur, handleSubmit, values,
          }) => (
            <StyledColumnView>
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

              <LineBreak />

              <View style={{
                alignItems: 'center',
              }}
              >
                <LinearGradientButton
                  text="Reset password"
                  onPress={handleSubmit}
                  buttonStyles={{
                    width: 250,
                    borderRadius: 25,
                    paddingVertical: 15,
                  }}
                  labelStyles={{
                    fontSize: 16,
                    fontFamily: 'Montserrat_600SemiBold',
                  }}
                />
              </View>

              <Text style={{
                fontSize: 16,
                color: 'red',
                textAlign: 'center',
                marginTop: 10,
              }}
              >
                {error}
              </Text>
              <Text style={{
                fontSize: 16,
                color: 'green',
                textAlign: 'center',
                marginTop: 10,
              }}
              >
                {successInfo}
              </Text>
            </StyledColumnView>
          )}
        </Formik>

        <Button
          mode="text"
          color={colors.text}
          onPress={() => {
            navigation.navigate('Register');
          }}
        >
          Don't have an account? Start now!
        </Button>
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
    </ImageBackground>
  );
};

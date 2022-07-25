import React from 'react';
import { Title, Button } from 'react-native-paper';
import { View } from 'react-native';
import { Wrapper } from '../../styled-components/ReusedUI';
import { AuthNavProps } from '../../navigation/auth/AuthParamList';

interface LoginFailedProps {}

export const LoginFailed: React.FC<AuthNavProps<'LoginFailed'>> = ({
  navigation,
}) => (
  <View style={{
    backgroundColor: '#16182a',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  }}
  >
    <Title style={{ textAlign: 'center' }}>User Not Found or Register Unsuccesful :( </Title>

    <Button
      mode="text"
      onPress={() => {
        navigation.navigate('Login');
      }}
    >
      Back to Login
    </Button>
  </View>
);

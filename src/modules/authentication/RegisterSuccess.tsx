import React from 'react';
import { Image, ImageBackground, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import logo from '../../../assets/logo_text.png';
import { styles } from '../../styled-components/StyleSheet';

export const RegisterSuccess = ({ navigation }) => (
  <ImageBackground
    style={styles.wavyBackgroundStyle}
    imageStyle={styles.wavyBackgroundImageStyle}
    source={require('../../local-assets/wavy.png')}
  >
    <View
      style={{
        marginTop: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: -30,
        paddingHorizontal: 40,
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
        A confirmation link has been sent to your email. Follow this link from the device that has the Auxygn app installed to complete the registration.
      </Text>
      <Text style={{
        color: 'white',
        fontSize: 20,
        marginTop: 15,
        fontFamily: 'Montserrat_600SemiBold',
        textAlign: 'center',
      }}
      >
        The link is valid for two hours, after which you will be prompted to register again
      </Text>
      <Button
        mode="text"
        color="white"
        style={{
          marginTop: 100,
        }}
        onPress={() => {
          navigation.navigate('Login');
        }}
      >
        Back to Login Page
      </Button>
    </View>
  </ImageBackground>
);

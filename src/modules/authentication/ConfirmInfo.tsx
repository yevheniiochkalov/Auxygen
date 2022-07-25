import React from 'react';
import { Image, ImageBackground, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import logo from '../../../assets/logo_text.png';
import { styles } from '../../styled-components/StyleSheet';

export const ConfirmInfo = ({ navigation, route }) => {
  if (route.params.confirmation) {
    return (
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
            Your email has been successfully verified, please sign in to the Auxygn App.
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
            Go to Login Page
          </Button>
        </View>
      </ImageBackground>
    );
  }
  return (
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
          Link has expired, Please re-register on the Auxygn App.
        </Text>
        <Button
          mode="text"
          color="white"
          style={{
            marginTop: 100,
          }}
          onPress={() => {
            navigation.navigate('Register');
          }}
        >
          Sign Up again
        </Button>
      </View>
    </ImageBackground>
  );
};

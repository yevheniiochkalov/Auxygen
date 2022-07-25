import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { grayPlaceholder } from './colors';

export const LinearGradientButton = ({
  text, onPress, buttonStyles, labelStyles,
}): any => (
  <TouchableOpacity onPress={onPress}>
    <LinearGradient
      style={[styles.button, buttonStyles]}
      colors={['#432287', '#802dd1']}
      start={{
        x: 0,
        y: 1,
      }}
      end={{
        x: 1,
        y: 1,
      }}
    >
      <Text style={[styles.buttonLabel, labelStyles]}>
        {text}
      </Text>
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    padding: 10,
    paddingRight: 25,
    paddingLeft: 25,
    borderRadius: 20,
  },
  disabledButton: {
    borderWidth: 1,
    borderColor: grayPlaceholder,
  },
  buttonLabel: {
    textAlign: 'center',
    color: '#ffffff',
    fontFamily: 'Montserrat_400Regular',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 12,
  },
});

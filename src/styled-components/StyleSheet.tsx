import {
  View,
  Image,
  ImageBackground,
  StyleSheet,
  Platform,
} from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { blueA800, deepPurple900 } from './colors';
import { height, width } from './theme';
// const { colors } = useTheme();
export const styles = StyleSheet.create({
  // BACKGROUND IMAGE
  wavyBackgroundStyle: {
    backgroundColor: blueA800,
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    minHeight: Math.round(height),
  },

  wavyBackgroundImageStyle: {
    resizeMode: 'cover',
    height: 600,
    opacity: 0.8,
  },

  wavyBackgroundImageStyle2: {
    resizeMode: 'cover',
    height: 600,
    opacity: 0.3,
  },

  wavyBackgroundImageStyle3: {
    resizeMode: 'cover',
    height: 600,
    opacity: 0.5,
  },

  imageBackdrop: {
    ...Platform.select({
      ios: {
        shadowColor: deepPurple900,
        shadowOffset: { width: 0.5, height: 5 },
        shadowOpacity: 0.1,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});

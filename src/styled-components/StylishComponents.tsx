import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Card, Caption, Subheading, Searchbar,
} from 'react-native-paper';
import { ThemeContext } from 'styled-components';

import { deepPurpleA700 } from './colors';

interface StylishComponentsProps {}

export const GradientButton: React.FC<StylishComponentsProps> = () => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.button}>
      <LinearGradient
        colors={['#7713ff', deepPurpleA700, '#4900ad']}
        start={{ x: 0.8, y: 0 }}
        style={styles.gradient}
      >
        <Text style={styles.text}>hello</Text>
      </LinearGradient>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  button: {
    width: '100%',
    height: '40%',
  },
  text: {
    color: 'white',
    fontSize: 16,
    padding: 50,
    marginBottom: 15,
  },
});

export function UnroundCard(props) {
  return <Card theme={{ roundness: 15 }} {...props} />;
}

export function BoldWhiteCaption(props) {
  const themeContext = useContext(ThemeContext);
  return (
    <Caption
      style={{ color: themeContext.colors.text, fontWeight: 'bold' }}
      {...props}
    />
  );
}

export function BoldWhiteHeading(props) {
  const themeContext = useContext(ThemeContext);
  return (
    <Subheading
      style={{
        color: themeContext.colors.text,
        // fontWeight: 'bold',
        fontSize: 19,
        marginBottom: 30,
        fontFamily: 'Montserrat_500Medium',
      }}
      {...props}
    />
  );
}

export default function NiceSearchbar(props) {
  const themeContext = useContext(ThemeContext);
  return (
    <Searchbar
      style={{
        backgroundColor: themeContext.colors.backgroundContrast,
      }}
      iconColor={themeContext.colors.accentTwo}
      {...props}
    />
  );
}

import React from 'react';
import {
  SafeAreaView, View, Platform, StyleSheet, Text,
} from 'react-native';
import Constants from 'expo-constants';
import { StackNavigationProp } from '@react-navigation/stack';

import { IconButton } from 'react-native-paper';
import { blueA800, white } from '../../../styled-components/colors';

interface SettingsHeaderProps {
  navigation: StackNavigationProp<Record<string, object>, string>;
  title: string
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = ({ navigation, title }) => {
  const goBack = () => navigation.goBack();

  return (
    <SafeAreaView
      style={styles.headerWrap}
    >
      <View
        style={styles.container}
      >
        <IconButton
          icon="chevron-left"
          size={20}
          color={white}
          style={styles.backButton}
          onPress={goBack}
        />
        <Text style={styles.title}> {title} </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerWrap: {
    backgroundColor: blueA800,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingVertical: 15,
    position: 'relative',
    marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
  },
  title: {
    color: '#ffffff',
    fontSize: 23,
    letterSpacing: 0.6,
    fontFamily: 'Montserrat_600SemiBold',
  },
  backButton: {
    borderWidth: 2,
    borderColor: white,
    position: 'absolute',
    top: 9,
    left: 12,
  },
});

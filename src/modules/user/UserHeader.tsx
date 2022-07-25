import React from 'react';
import {
  Platform, SafeAreaView, StyleSheet, View,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import Constants from 'expo-constants';

import { NavigationProp } from '@react-navigation/native';
import { cyanB } from '../../styled-components/colors';

interface UserHeaderProps {
  navigation: NavigationProp<Record<string, object>>;
}

export const UserHeader: React.FC<UserHeaderProps> = ({ navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };

  const goToSettings = () => navigation.navigate('SettingsPage');

  return (
    <SafeAreaView>
      <View
        style={styles.container}
      >
        <IconButton
          icon="chevron-left"
          size={20}
          color={cyanB}
          style={styles.backButton}
          onPress={goBack}
        />
        <IconButton
          icon="pencil-outline"
          size={20}
          color={cyanB}
          style={styles.editButton}
          onPress={goToSettings}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    marginRight: 15,
    marginLeft: 15,
    marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
  },
  headerTitle: {
    color: '#ffffff',
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 20,
  },
  backButton: {
    borderWidth: 2,
    borderColor: cyanB,
  },
  editButton: {
    borderWidth: 2,
    borderColor: cyanB,
  },

});

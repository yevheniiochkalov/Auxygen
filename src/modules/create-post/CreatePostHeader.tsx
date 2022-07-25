import React from 'react';
import {
  Platform, StyleSheet, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconButton, Title } from 'react-native-paper';
import { StackHeaderTitleProps } from '@react-navigation/stack';
import Constants from 'expo-constants';

import { NavigationProp } from '@react-navigation/native';
import { cyanB, grayPlaceholder } from '../../styled-components/colors';
import { PublishButton } from './PublishButton';

interface CreatePostHeaderProps {
  navigation: NavigationProp<Record<string, object>>;
  title: string | ((props: StackHeaderTitleProps) => React.ReactNode);
  handleSubmit: () => void
  disabledSubmit: boolean
}

export const CreatePostHeader: React.FC<CreatePostHeaderProps> = ({
  navigation, title, handleSubmit, disabledSubmit,
}) => {
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <View
        style={styles.container}
      >
        <View style={styles.leftWrap}>
          <IconButton
            icon="chevron-left"
            size={20}
            color={cyanB}
            style={{
              borderWidth: 2,
              borderColor: cyanB,
            }}
            onPress={goBack}
          />
          <Title style={styles.headerTitle}> {title} </Title>
        </View>

        <PublishButton onSubmit={handleSubmit} disabled={disabledSubmit} />
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
    borderBottomColor: grayPlaceholder,
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingTop: 10,
    marginRight: 15,
    marginLeft: 15,
    // marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
  },
  leftWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#ffffff',
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 20,
  },

});

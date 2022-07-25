import React, { useContext } from 'react';
import { IconButton } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';

import { cyanB, orange700 } from '../../styled-components/colors';

interface NotificationsButtonProps {
  navigation: StackNavigationProp<Record<string, object>, string>;
  notificationAmount
}

export const NotificationsButton: React.FC<NotificationsButtonProps> = ({
  navigation,
  notificationAmount,
}) => {
  const goToNotifications = async () => {
    navigation.navigate('NotificationsPage');
  };

  return (
    <View style={styles.buttonContainer}>
      {notificationAmount ? (
        <View
          style={styles.buttonBubble}
        >
          <Text
            style={styles.bubbleText}
          >
            {notificationAmount}
          </Text>
        </View>
      ) : (
        <></>
      )}
      <IconButton
        icon="bell-outline"
        size={30}
        color={cyanB}
        onPress={goToNotifications}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'relative',
    marginRight: -10,
  },

  buttonBubble: {
    position: 'absolute',
    top: 10,
    right: 8,
    zIndex: 10,
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: orange700,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bubbleText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Montserrat_600SemiBold',
  },
});

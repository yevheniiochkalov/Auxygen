import React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';

import { deepPurpleB } from '../../styled-components/colors';

interface MessageButtonProps {
  onPress: () => void
}

const none = '';
export const MessageButton: React.FC<MessageButtonProps> = ({ onPress }) => (
  <Button
    contentStyle={styles.button}
    icon="message-text-outline"
    labelStyle={styles.label}
    onPress={onPress}
  >
    {none}
  </Button>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: deepPurpleB,
    textAlign: 'center',
    marginLeft: 10,
    width: 50,
    borderRadius: 50,
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5,
  },
  label: {
    fontFamily: 'Montserrat_500Medium',
    color: 'white',
    letterSpacing: 1,
    fontSize: 17,
    textAlign: 'center',
  },
});

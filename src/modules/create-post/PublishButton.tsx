import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { grayPlaceholder } from '../../styled-components/colors';

interface PublishButtonProps {
  onSubmit: () => void
  disabled: boolean
}

export const PublishButton: React.FC<PublishButtonProps> = ({ onSubmit, disabled }) => (
  disabled ? (
    <TouchableWithoutFeedback
      style={[styles.button, styles.disabledButton]}
    >
      <Text style={[styles.buttotnTitle, {
        color: grayPlaceholder,
      }]}
      >
        Publish
      </Text>
    </TouchableWithoutFeedback>
  ) : (
    <TouchableOpacity
      onPress={onSubmit}
    >
      <LinearGradient
        style={styles.button}
        colors={['#422287', '#812fd3']}
        start={{
          x: 0,
          y: 1,
        }}
        end={{
          x: 1,
          y: 1,
        }}
      >
        <Text style={styles.buttotnTitle}>
          Publish
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  )
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
  buttotnTitle: {
    color: '#ffffff',
    fontFamily: 'Montserrat_400Regular',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 12,
  },
});

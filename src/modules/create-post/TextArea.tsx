import { StyleSheet, TextInput, Platform } from 'react-native';
import React from 'react';

import { grayPlaceholder } from '../../styled-components/colors';

interface TextAreaProps {
  value: string,
  setValue: (text: string) => void,
  placeholder: string,
  minHeight: number
}

export const TextArea: React.FC<TextAreaProps> = ({
  value, setValue, placeholder, minHeight,
}) => {
  const handleChange = (text) => {
    setValue(text);
  };
  return (
    <TextInput
      placeholderTextColor={grayPlaceholder}
      placeholder={placeholder}
      style={[styles.input, { minHeight }]}
      numberOfLines={minHeight ? 5 : 1}
      multiline={!!minHeight}
      onChangeText={handleChange}
      value={value}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 26,
    color: grayPlaceholder,
    fontFamily: 'Montserrat_500Medium',
    textAlignVertical: Platform.OS === 'ios' ? 'auto' : 'top',
    marginBottom: 40,
  },
});

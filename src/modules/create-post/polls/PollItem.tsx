import {
  TextInput, StyleSheet, Text, View,
} from 'react-native';
import React from 'react';

import { IconButton } from 'react-native-paper';

import { PollItemType } from './CreatePoll';
import { cyanB, grayPlaceholder } from '../../../styled-components/colors';

interface PollItemProps {
  index: number,
  item: PollItemType,
  array: Array<any>,
  setArray: (PollItemType) => void
}

export const PollItem: React.FC<PollItemProps> = ({
  item, index, array, setArray,
}) => (
  item.enabled ? (
    <View
      style={styles.container}
    >
      <TextInput
        style={[styles.optionInput, styles.activeInput]}
        placeholder="ENTER THE ANSWER"
        placeholderTextColor={grayPlaceholder}
        value={item.text}
        autoCapitalize="characters"
        editable
        onChangeText={(text) => setArray(
          Object.assign([...array], {
            [index]: { ...item, text },
          }),
        )}
      />
      <IconButton
        style={[styles.iconBtn, styles.activeIconBtn]}
        icon="minus"
        size={25}
        onPress={() => {
          setArray(
            Object.assign([...array], {
              [index]: { ...item, enabled: false, text: '' },
            }),
          );
        }}
      />
    </View>
  ) : (
    <View
      style={styles.container}
    >
      <TextInput
        style={[styles.optionInput]}
        value={item.text}
        placeholder="ADD OPTION"
        placeholderTextColor={grayPlaceholder}
        editable={false}
      />
      <IconButton
        style={[styles.iconBtn, styles.inactiveIconBtn]}
        color={grayPlaceholder}
        icon="plus"
        size={50}
        onPress={() => {
          setArray(
            Object.assign([...array], {
              [index]: { ...item, enabled: true },
            }),
          );
        }}
      />
    </View>
  )
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    position: 'relative',
    paddingRight: 55,
  },
  optionInput: {
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 40,
    padding: 0,
    fontFamily: 'Montserrat_400Regular',
    paddingRight: 20,
    paddingLeft: 20,
    textAlign: 'center',
    letterSpacing: 1,
    borderColor: grayPlaceholder,
    minHeight: 60,
  },
  activeInput: {
    color: '#ffffff',
    borderColor: cyanB,
    textTransform: 'uppercase',
  },
  iconBtn: {
    position: 'absolute',
    right: 0,
  },
  activeIconBtn: {
    backgroundColor: cyanB,
  },
  inactiveIconBtn: {
    right: -18,
  },
});

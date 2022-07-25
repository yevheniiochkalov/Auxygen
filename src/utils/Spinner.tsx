import React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { cyanB } from '../styled-components/colors';
import { height, width } from '../styled-components/theme';

export const Spinner = () => (
  <ActivityIndicator
    animating
    color={cyanB}
    size="large"
    style={{
      backgroundColor: '#16182a',
      width,
      height,
    }}
  />
);

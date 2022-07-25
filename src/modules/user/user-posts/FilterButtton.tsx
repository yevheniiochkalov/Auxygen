import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { styles } from './styles';

interface FilterButtonProps {
  label: string
  isActive: boolean
  onPress: () => void
}

export const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  isActive,
  onPress,
}) => (
  <TouchableOpacity
    style={isActive ? styles.activeToggleButton : styles.toggleButton}
    onPress={onPress}
  >
    <Text
      style={isActive ? styles.activeLabel : styles.label}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

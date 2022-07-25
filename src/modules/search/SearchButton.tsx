import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { IconButton } from 'react-native-paper';

import { StackNavigationProp } from '@react-navigation/stack';

interface SearchButtonProps {
  navigation: StackNavigationProp<Record<string, object>, string>;
}

export const SearchButton: React.FC<SearchButtonProps> = ({ navigation }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <IconButton
      icon="magnify"
      size={30}
      color={themeContext.colors.accentTwo}
      onPress={async () => {
        navigation.navigate('SearchPage');
      }}
    >
      Search
    </IconButton>
  );
};

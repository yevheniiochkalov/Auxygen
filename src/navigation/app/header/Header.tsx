import React from 'react';
import {
  SafeAreaView, View, Platform, Image,
} from 'react-native';
import Constants from 'expo-constants';
import { Title } from 'react-native-paper';
import {
  StackNavigationProp,
  StackHeaderTitleProps,
} from '@react-navigation/stack';

import { UserButton } from '../../../modules/user/UserButton';
import { SearchButton } from '../../../modules/search/SearchButton';
import { blueA800 } from '../../../styled-components/colors';
import logo from '../../../../assets/logo_text.png';

interface HeaderProps {
  navigation: StackNavigationProp<Record<string, object>, string>;
  title: string | ((props: StackHeaderTitleProps) => React.ReactNode);
}

export const Header: React.FC<HeaderProps> = ({ navigation, title }) => (
  <SafeAreaView
    style={{
      backgroundColor: blueA800,
    }}
  >
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
      }}
    >
      <Image
        source={logo}
        style={{
          height: 30,
          width: 110,
          marginTop: 5,
        }}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <UserButton navigation={navigation} />
        <SearchButton navigation={navigation} />
      </View>

      {/* <LogoutButton /> */}
    </View>
    {/* </ImageBackground> */}
  </SafeAreaView>
);

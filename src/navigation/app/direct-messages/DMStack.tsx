import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { DMFeed } from '../../../modules/direct-messages/DMFeed';
import { DMParamList, DMStackNavProps } from './DMParamList';
import { DMChat, DMessageInput } from '../../../modules/direct-messages/DMChat';
import { HomeStackNavProps } from '../home/HomeParamList';

interface DMStackProps {}

const Stack = createStackNavigator<DMParamList>();

export const DMStack: React.FC<DMStackProps> = () => (
  <Stack.Navigator
    screenOptions={{ header: () => null }}
    initialRouteName="DMFeed"
  >
    <Stack.Screen name="DMFeed" component={DMFeed} />
    <Stack.Screen
      name="DMChat"
      children={(props) => (
        <DMChat {...props} />
      )}
    />
  </Stack.Navigator>
);


import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppTabs } from './AppTabs';
import { AddContentToPost } from '../../modules/create-post/AddContentToPost';

interface RootStackProps {}

export type RootParamList = {
  AddContentToPost: undefined;
  AppTabs: undefined;
};

const Root = createStackNavigator<RootParamList>();
export const RootStack: React.FC<RootStackProps> = ({}) => (
  <Root.Navigator mode="modal">
    <Root.Screen
      name="AppTabs"
      component={AppTabs}
      options={{ headerShown: false }}
    />
    {/* this is a modal */}
    <Root.Screen name="AddContentToPost" component={AddContentToPost} />
  </Root.Navigator>
);

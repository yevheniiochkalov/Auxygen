import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { CreatePostView } from '../../../modules/create-post/CreatePostView';
import { CreatePostParamList } from './CreatePostParamList';
import { AddContentToPost } from '../../../modules/create-post/AddContentToPost';
import { CreatePoll } from '../../../modules/create-post/polls/CreatePoll';
import { CreatePlaylist } from '../../../modules/create-post/playlists/CreatePlaylist';
import { HomeStackNavProps } from '../home/HomeParamList';
import { Header } from '../header/Header';

interface CreatePostStackProps {}

const Stack = createStackNavigator<CreatePostParamList>();

export const CreatePostStack: React.FC<
  CreatePostStackProps & HomeStackNavProps<'Feed'>
> = ({ navigation }) => (
  <Stack.Navigator
    headerMode="screen"
    initialRouteName="CreatePost"
  >
    <Stack.Screen
      name="CreatePost"
      component={CreatePostView}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="AddContentToPost"
      component={AddContentToPost}
      options={{
        header: ({ scene, previous, navigation }) => {
          const { options } = scene.descriptor;
          const title = options.headerTitle || options.title || scene.route.name;

          return <Header navigation={navigation} title={title} />;
        },
      }}
    />
    <Stack.Screen
      name="CreatePoll"
      component={CreatePoll}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="CreatePlaylist"
      component={CreatePlaylist}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

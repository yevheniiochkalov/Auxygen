import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type CreatePostParamList = {
  CreatePost: undefined;
  AddContentToPost: undefined;
  CreatePoll: undefined;
  CreatePlaylist: undefined;
};

export type CreatePostNavProps<T extends keyof CreatePostParamList> = {
  navigation: StackNavigationProp<CreatePostParamList, T>;
  route: RouteProp<CreatePostParamList, T>;
};

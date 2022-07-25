import { createStore } from 'easy-peasy'; // 👈 import
import AsyncStorage from '@react-native-async-storage/async-storage';
import createPostModel, { CreatePostInterface } from './model/createPostModel';
import dmModel, { DmModelInterface } from './model/dmModel';
import userModel, { UserInterface } from './model/userModel';
import notificationsModel, { NotificationsModelInterface } from './model/notificationsModel';
import postCommentsModel, { PostCommentsModelInterface } from './model/postCommentsModel';

const asyncStorageEngine = {
  async getItem(key) {
    return JSON.parse(await AsyncStorage.getItem(key));
  },
  setItem(key, data) {
    AsyncStorage.setItem(key, JSON.stringify(data));
  },
  removeItem(key) {
    AsyncStorage.removeItem(key);
  },
};

export interface StoreInterface {
  createPost: CreatePostInterface;
  user: UserInterface;
  direct: DmModelInterface;
  notifications: NotificationsModelInterface
  postComments: PostCommentsModelInterface
}

export const storeModel: StoreInterface = {
  createPost: createPostModel,
  user: userModel,
  direct: dmModel,
  notifications: notificationsModel,
  postComments: postCommentsModel,
};

const store = createStore(storeModel);

export default store;

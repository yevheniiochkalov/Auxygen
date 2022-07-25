import {
  Action, action, Computed, computed, Thunk, thunk,
} from 'easy-peasy';
import { TopFive } from '../../generated-components/apolloComponents';
import { Socket } from '../../types/declaration';

// TODO: define interfaces by post type?
export interface UserTypeInterface {
  id?: number;
  username?: string;
  email?: string;
  firstLogin?: boolean;
  facebookId?: string;
  googleId?: string;
  profilePicture?: string;
  accessToken?: string;
  followers?: number[];
  topArtists?: TopFive[];
  topAlbums?: TopFive[];
  topTracks?: TopFive[];
}

export interface UserInterface {
  user: UserTypeInterface;
  socketRef?: Socket;
  setUser: Action<UserInterface, UserTypeInterface>;
  clearUser: Action<UserInterface>;
  setSocketRef: Action<UserInterface, Socket>;
  removeSocketRef: Action<UserInterface>
}

const userModel: UserInterface = {
  user: {},
  setUser: action((state, payload) => {
    state.user = payload;
  }),
  clearUser: action((state) => {
    state.user = {};
  }),
  setSocketRef: action((state, payload) => {
    state.socketRef = payload;
  }),
  removeSocketRef: action((state) => {
    state.socketRef = null;
  }),
  socketRef: null,
};

export default userModel;

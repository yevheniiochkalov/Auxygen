import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { PostParamList } from '../shared/PostParamList';
import {
  GetOtherUserQuery,
  Playlist,
  Poll,
  User,
} from '../../../generated-components/apolloComponents';

export type HomeParamList = {
  Feed: undefined;
  ArtistPage: {
    id: string;
    name: string;
    imageUrl?: string;
    backgroundImage?: string;
  };
  ArtistPosts: { id: string; name: string };
  AlbumPage: { id: string; name: string; imageUrl?: string };
  TrackPage: {
    id: string;
    name: string;
    artistNames?: string[];
    imageUrl?: string;
  };
  UserPage: { id: number };
  SearchPage: undefined;
  NotificationsPage: undefined;
  SettingsPage: undefined;
  EditTopFivePage: undefined;
  CommentPage: {
    fromReplyNotification: number | null,
    post: any;
    postId: number;
    postType: string;
    postAuthor: User;
    contentId?: string;
    name?: string;
    imageUrl?: string | null;
    question?: string;
    text: string | null;
    playlistTitle: string;
    poll: Poll | null;
  };
  FollowersPage: { id: number; request: 'following' | 'followers' };
  UserOnBoarding: undefined;
  PickGenres: undefined;
  PlaylistPage: { playlist: Playlist };
} & PostParamList;

export type HomeStackNavProps<T extends keyof HomeParamList> = {
  navigation: StackNavigationProp<HomeParamList, T>;
  route: RouteProp<HomeParamList, T>;
};

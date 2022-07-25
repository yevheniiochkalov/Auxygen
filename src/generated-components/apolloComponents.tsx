import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  getPosts?: Maybe<Array<Maybe<GetPostsResult>>>;
  getUserPosts?: Maybe<Array<Maybe<GetPostsResult>>>;
  getPostsOfFollowing?: Maybe<Array<Maybe<GetPostsResult>>>;
  getArtistPosts?: Maybe<Array<Maybe<ArtistPost>>>;
  getAlbumPosts?: Maybe<Array<Maybe<AlbumPost>>>;
  getTrackPosts?: Maybe<Array<Maybe<TrackPost>>>;
  getMyList?: Maybe<Array<Maybe<GetPostsResult>>>;
  getAlbumTracks?: Maybe<AlbumTracks>;
  getArtistAlbums?: Maybe<ArtistAlbums>;
  getArtistTopTracks?: Maybe<ArtistTopTracks>;
  search?: Maybe<SearchResult>;
  getCurrentUser?: Maybe<User>;
  hello?: Maybe<Scalars['String']>;
  getComments?: Maybe<Array<Maybe<Comment>>>;
  searchPosts?: Maybe<Array<Maybe<GetPostsResult>>>;
  getOtherUser?: Maybe<User>;
  searchUser?: Maybe<Array<Maybe<User>>>;
  getFollowers?: Maybe<Array<Maybe<User>>>;
  getFollowingorFollowers?: Maybe<Array<Maybe<User>>>;
  getGenres?: Maybe<GenreList>;
  getTopPosts?: Maybe<Array<Maybe<GetContentPostsResult>>>;
  getTopPlaylists?: Maybe<Array<Maybe<Playlist>>>;
  getTopArtists?: Maybe<Array<Maybe<ArtistPost>>>;
  getReccomendations?: Maybe<Reccomendation>;
  getMyDMs?: Maybe<Array<Maybe<DirectMessage>>>;
  getMyDMChat?: Maybe<Array<Maybe<DirectMessage>>>;
};

export type QueryGetUserPostsArgs = {
  id?: Maybe<Scalars['Float']>;
};

export type QueryGetArtistPostsArgs = {
  id?: Maybe<Scalars['String']>;
};

export type QueryGetAlbumPostsArgs = {
  id?: Maybe<Scalars['String']>;
};

export type QueryGetTrackPostsArgs = {
  id?: Maybe<Scalars['String']>;
};

export type QueryGetAlbumTracksArgs = {
  id?: Maybe<Scalars['String']>;
};

export type QueryGetArtistAlbumsArgs = {
  id?: Maybe<Scalars['String']>;
};

export type QueryGetArtistTopTracksArgs = {
  id?: Maybe<Scalars['String']>;
};

export type QuerySearchArgs = {
  type?: Maybe<Scalars['String']>;
  query?: Maybe<Scalars['String']>;
};

export type QueryGetCommentsArgs = {
  data?: Maybe<CommentInput>;
};

export type QuerySearchPostsArgs = {
  query?: Maybe<Scalars['String']>;
};

export type QueryGetOtherUserArgs = {
  id?: Maybe<Scalars['Float']>;
};

export type QuerySearchUserArgs = {
  query?: Maybe<Scalars['String']>;
};

export type QueryGetFollowersArgs = {
  id?: Maybe<Scalars['Float']>;
};

export type QueryGetFollowingorFollowersArgs = {
  request?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Float']>;
};

export type QueryGetMyDmChatArgs = {
  data?: Maybe<DirectMessageInput>;
};

export type GetPostsResult = AlbumPost | ArtistPost | TrackPost | Poll | Playlist;

export type AlbumPost = {
  __typename?: 'AlbumPost';
  id?: Maybe<Scalars['ID']>;
  timeSubmitted?: Maybe<Scalars['DateTime']>;
  text?: Maybe<Scalars['String']>;
  externalUrl?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  likes?: Maybe<Scalars['Float']>;
  likedUsers?: LikedUsers;
  numComments?: Maybe<Scalars['Float']>;
  albumId?: Maybe<Scalars['String']>;
  rating?: Maybe<Scalars['Float']>;
  artistNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  albumName?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['ID']>;
  username?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  profilePicture?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  facebookId?: Maybe<Scalars['String']>;
  googleId?: Maybe<Scalars['String']>;
  firstLogin?: Maybe<Scalars['Boolean']>;
  genres?: Maybe<Array<Maybe<Scalars['String']>>>;
  followers?: Maybe<Array<Maybe<Scalars['Float']>>>;
  following?: Maybe<Array<Maybe<Scalars['Float']>>>;
  topArtists?: Maybe<Array<Maybe<TopFive>>>;
  topAlbums?: Maybe<Array<Maybe<TopFive>>>;
  topTracks?: Maybe<Array<Maybe<TopFive>>>;
  myList?: Maybe<Array<Maybe<MyListItem>>>;
};

export type TopFive = {
  __typename?: 'TopFive';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  artistNames?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type MyListItem = {
  __typename?: 'MyListItem';
  postId?: Maybe<Scalars['Float']>;
  postType?: Maybe<Scalars['String']>;
};

export type ArtistPost = {
  __typename?: 'ArtistPost';
  id?: Maybe<Scalars['ID']>;
  timeSubmitted?: Maybe<Scalars['DateTime']>;
  text?: Maybe<Scalars['String']>;
  externalUrl?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  likes?: Maybe<Scalars['Float']>;
  likedUsers?: LikedUsers;
  numComments?: Maybe<Scalars['Float']>;
  artistId?: Maybe<Scalars['String']>;
  artistName?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type LikedUsers = {
  [userId: string]: boolean
}

export type TrackPost = {
  __typename?: 'TrackPost';
  id?: Maybe<Scalars['ID']>;
  timeSubmitted?: Maybe<Scalars['DateTime']>;
  text?: Maybe<Scalars['String']>;
  externalUrl?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  likes?: Maybe<Scalars['Float']>;
  likedUsers?: LikedUsers;
  numComments?: Maybe<Scalars['Float']>;
  trackId?: Maybe<Scalars['String']>;
  vote?: Maybe<Scalars['Float']>;
  artistNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  trackName?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type ThoughtsPost = {
  __typename?: 'ThoughtsPost';
  id?: Maybe<Scalars['ID']>;
  text?: Maybe<Scalars['String']>;
  timeSubmitted?: Maybe<Scalars['DateTime']>;
  externalUrl?: Maybe<Scalars['String']>;
  likes?: Maybe<Scalars['Float']>;
  likedUsers?: LikedUsers;
  numComments?: Maybe<Scalars['Float']>;
  user?: Maybe<User>;
};

export type Poll = {
  __typename?: 'Poll';
  id?: Maybe<Scalars['ID']>;
  question?: Maybe<Scalars['String']>;
  length?: Maybe<Scalars['Float']>;
  options?: Maybe<Array<Maybe<PollOption>>>;
  timeSubmitted?: Maybe<Scalars['DateTime']>;
  likes?: Maybe<Scalars['Float']>;
  likedUsers?: LikedUsers;
  user?: Maybe<User>;
  numComments?: Maybe<Scalars['Float']>;
};

export type PollOption = {
  __typename?: 'PollOption';
  option?: Maybe<Scalars['String']>;
  votes?: Maybe<Scalars['Float']>;
};

export type Playlist = {
  __typename?: 'Playlist';
  id?: Maybe<Scalars['ID']>;
  playlistPicture?: Maybe<Scalars['String']>;
  tracks?: Maybe<Array<Maybe<PlaylistTrack>>>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  timeSubmitted?: Maybe<Scalars['DateTime']>;
  likes?: Maybe<Scalars['Float']>;
  likedUsers?: LikedUsers;
  user?: Maybe<User>;
  numComments?: Maybe<Scalars['Float']>;
};

export type PlaylistTrack = {
  __typename?: 'PlaylistTrack';
  trackImageUrl?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  artists?: Maybe<Array<Maybe<Scalars['String']>>>;
  externalUrl?: Maybe<Scalars['String']>;
};

export type AlbumTracks = {
  __typename?: 'AlbumTracks';
  items?: Maybe<Array<Maybe<AlbumTrackItem>>>;
};

export type AlbumTrackItem = {
  __typename?: 'AlbumTrackItem';
  id?: Maybe<Scalars['String']>;
  uri?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<Image>>>;
  external_urls?: Maybe<ExternalUrl>;
  album?: Maybe<Album>;
  artists?: Maybe<Array<Maybe<Artist>>>;
  track_number?: Maybe<Scalars['Float']>;
  preview_url?: Maybe<Scalars['String']>;
};

export type Image = {
  __typename?: 'Image';
  url?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Float']>;
  width?: Maybe<Scalars['Float']>;
};

export type ExternalUrl = {
  __typename?: 'ExternalUrl';
  spotify?: Maybe<Scalars['String']>;
};

export type Album = {
  __typename?: 'Album';
  id?: Maybe<Scalars['String']>;
  uri?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  rating?: Maybe<Scalars['Float']>;
  images?: Maybe<Array<Maybe<Image>>>;
  external_urls?: Maybe<ExternalUrl>;
  release_date?: Maybe<Scalars['String']>;
  album_type?: Maybe<Scalars['String']>;
  artists?: Maybe<Array<Maybe<Artist>>>;
};

export type Artist = {
  __typename?: 'Artist';
  id?: Maybe<Scalars['String']>;
  uri?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<Image>>>;
  external_urls?: Maybe<ExternalUrl>;
};

export type ArtistAlbums = {
  __typename?: 'ArtistAlbums';
  items?: Maybe<Array<Maybe<Album>>>;
};

export type ArtistTopTracks = {
  __typename?: 'ArtistTopTracks';
  tracks?: Maybe<Array<Maybe<ArtistTopTrackItem>>>;
};

export type ArtistTopTrackItem = {
  __typename?: 'ArtistTopTrackItem';
  id?: Maybe<Scalars['String']>;
  uri?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<Image>>>;
  external_urls?: Maybe<ExternalUrl>;
  album?: Maybe<Album>;
  artists?: Maybe<Array<Maybe<Artist>>>;
  track_number?: Maybe<Scalars['Float']>;
  is_playable?: Maybe<Scalars['Boolean']>;
  preview_url?: Maybe<Scalars['String']>;
};

export type SearchResult = TrackSearchResult | ArtistSearchResult | AlbumSearchResult;

export type TrackSearchResult = {
  __typename?: 'TrackSearchResult';
  tracks?: Maybe<TrackItems>;
};

export type TrackItems = {
  __typename?: 'TrackItems';
  items?: Maybe<Array<Maybe<Track>>>;
};

export type Track = {
  __typename?: 'Track';
  id?: Maybe<Scalars['String']>;
  uri?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<Image>>>;
  external_urls?: Maybe<ExternalUrl>;
  album?: Maybe<Album>;
  artists?: Maybe<Array<Maybe<Artist>>>;
  track_number?: Maybe<Scalars['Float']>;
};

export type ArtistSearchResult = {
  __typename?: 'ArtistSearchResult';
  artists?: Maybe<ArtistItems>;
};

export type ArtistItems = {
  __typename?: 'ArtistItems';
  items?: Maybe<Array<Maybe<Artist>>>;
};

export type AlbumSearchResult = {
  __typename?: 'AlbumSearchResult';
  albums?: Maybe<AlbumItems>;
};

export type AlbumItems = {
  __typename?: 'AlbumItems';
  items?: Maybe<Array<Maybe<Album>>>;
};

export type Comment = {
  __typename?: 'Comment';
  id?: Maybe<Scalars['ID']>;
  timeSubmitted?: Maybe<Scalars['DateTime']>;
  text?: Maybe<Scalars['String']>;
  replyToId?: Maybe<Scalars['Int']>;
  likes?: Maybe<Scalars['Float']>;
  likedUsers?: LikedUsers;
  user?: Maybe<User>;
  trackPost?: Maybe<TrackPost>;
  artistPost?: Maybe<ArtistPost>;
  albumPost?: Maybe<AlbumPost>;
  poll?: Maybe<AlbumPost>;
};

export type CommentInput = {
  text?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Float']>;
  postType?: Maybe<Scalars['String']>;
  replyToId?: Maybe<Scalars['Int']>
};

export type GenreList = {
  __typename?: 'GenreList';
  genres?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type GetContentPostsResult = AlbumPost | ArtistPost | TrackPost;

export type Reccomendation = {
  __typename?: 'Reccomendation';
  tracks?: Maybe<Array<Maybe<Track>>>;
};

export type DirectMessage = {
  __typename?: 'DirectMessage';
  id?: Maybe<Scalars['ID']>;
  sender?: Maybe<User>;
  recipient?: Maybe<User>;
  timeSubmitted?: Maybe<Scalars['DateTime']>;
  text?: Maybe<Scalars['String']>;
  conversationID?: Maybe<Scalars['String']>;
};

export type DirectMessageInput = {
  recipientID?: Maybe<Scalars['Float']>;
  text?: Maybe<Scalars['String']>;
  partnerID?: Maybe<Scalars['Float']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  updateUserTopFive?: Maybe<User>;
  addToMyList?: Maybe<User>;
  removeFromMyList?: Maybe<User>;
  createAlbumPost?: Maybe<AlbumPost>;
  createArtistPost?: Maybe<ArtistPost>;
  createTrackPost?: Maybe<TrackPost>;
  login?: Maybe<LoginResponse>;
  logout?: Maybe<Scalars['Boolean']>;
  register?: Maybe<Scalars['Boolean']>;
  facebookSSO?: Maybe<LoginResponse>;
  googleSSO?: Maybe<LoginResponse>;
  createComment?: Maybe<Comment>;
  updatePostLikes?: Maybe<Array<Maybe<GetPostsResult>>>;
  updateCommentLikes?: Maybe<Comment>;
  followOtherUser?: Maybe<User>;
  uploadImage?: Maybe<User>;
  editUserNames?: Maybe<Scalars['Boolean']>;
  editUserGenres?: Maybe<Scalars['Boolean']>;
  editFirstLogin?: Maybe<Scalars['Boolean']>;
  createPoll?: Maybe<Poll>;
  updatePoll?: Maybe<Poll>;
  createPlaylist?: Maybe<Playlist>;
  sendNewDM?: Maybe<DirectMessage>;
};

export type MutationUpdateUserTopFiveArgs = {
  data?: Maybe<TopFiveArrayInput>;
};

export type MutationAddToMyListArgs = {
  data?: Maybe<MyListInput>;
};

export type MutationRemoveFromMyListArgs = {
  data?: Maybe<MyListInput>;
};

export type MutationCreateAlbumPostArgs = {
  data?: Maybe<AlbumPostInput>;
};

export type MutationCreateArtistPostArgs = {
  data?: Maybe<ArtistPostInput>;
};

export type MutationCreateTrackPostArgs = {
  data?: Maybe<TrackPostInput>;
};

export type MutationLoginArgs = {
  password?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type MutationRegisterArgs = {
  data?: Maybe<RegisterInput>;
};

export type MutationFacebookSsoArgs = {
  data?: Maybe<SsoRegisterInput>;
};

export type MutationGoogleSsoArgs = {
  data?: Maybe<SsoRegisterInput>;
};

export type MutationCreateCommentArgs = {
  data?: Maybe<CommentInput>;
};

export type MutationUpdatePostLikesArgs = {
  data?: Maybe<LikeInput>;
};

export type MutationUpdateCommentLikesArgs = {
  data?: Maybe<LikeInput>;
};

export type MutationFollowOtherUserArgs = {
  follow?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['Float']>;
};

export type MutationEditUserNamesArgs = {
  data?: Maybe<EditUserInput>;
};

export type MutationEditUserGenresArgs = {
  data?: Maybe<EditUserInput>;
};

export type MutationCreatePollArgs = {
  data?: Maybe<PollInput>;
};

export type MutationUpdatePollArgs = {
  data?: Maybe<PollInput>;
};

export type MutationCreatePlaylistArgs = {
  data?: Maybe<PlaylistInput>;
};

export type MutationSendNewDmArgs = {
  data?: Maybe<DirectMessageInput>;
};

export type TopFiveArrayInput = {
  dataArray?: Maybe<Array<Maybe<TopFiveInput>>>;
  type?: Maybe<Scalars['String']>;
};

export type TopFiveInput = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  artistNames?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type MyListInput = {
  postId?: Maybe<Scalars['Float']>;
  postType?: Maybe<Scalars['String']>;
};

export type AlbumPostInput = {
  text?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  externalUrl?: Maybe<Scalars['String']>;
  albumId?: Maybe<Scalars['String']>;
  rating?: Maybe<Scalars['Float']>;
  albumName?: Maybe<Scalars['String']>;
  artistNames?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ArtistPostInput = {
  text?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  externalUrl?: Maybe<Scalars['String']>;
  artistId?: Maybe<Scalars['String']>;
  artistName?: Maybe<Scalars['String']>;
};

export type TrackPostInput = {
  text?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  externalUrl?: Maybe<Scalars['String']>;
  trackId?: Maybe<Scalars['String']>;
  vote?: Maybe<Scalars['Float']>;
  trackName?: Maybe<Scalars['String']>;
  artistNames?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ThoughtsPostInput = {
  text?: Maybe<Scalars['String']>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type RegisterInput = {
  password?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  fullname?: Maybe<Scalars['String']>;
  betaTester?: Maybe<Scalars['Boolean']>;
};

export type SsoRegisterInput = {
  id?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  profilePicture?: Maybe<Scalars['String']>;
  expoToken: Maybe<Scalars['String']>;
};

export type LikeInput = {
  postType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Boolean']>;
};

export type EditUserInput = {
  name?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  genres?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type PollInput = {
  question?: Maybe<Scalars['String']>;
  length?: Maybe<Scalars['Float']>;
  options?: Maybe<Array<Maybe<PollOptionInput>>>;
  id?: Maybe<Scalars['Float']>;
};

export type PollOptionInput = {
  option?: Maybe<Scalars['String']>;
  votes?: Maybe<Scalars['Float']>;
};

export type PlaylistInput = {
  tracks?: Maybe<Array<Maybe<PlaylistTrackInput>>>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type PlaylistTrackInput = {
  trackImageUrl?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  artists?: Maybe<Array<Maybe<Scalars['String']>>>;
  externalUrl?: Maybe<Scalars['String']>;
};

export type CreateCommentMutationVariables = Exact<{
  data?: Maybe<CommentInput>;
}>;

export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment?: Maybe<(
    { __typename?: 'Comment' }
    & Pick<Comment, 'likes'| 'likedUsers' | 'timeSubmitted' | 'text' | 'replyToId'>
    & { trackPost?: Maybe<(
      { __typename?: 'TrackPost' }
      & Pick<TrackPost, 'trackName'>
    )>, artistPost?: Maybe<(
      { __typename?: 'ArtistPost' }
      & Pick<ArtistPost, 'artistName'>
    )>, albumPost?: Maybe<(
      { __typename?: 'AlbumPost' }
      & Pick<AlbumPost, 'albumName'>
    )>, thoughtsPost?: Maybe<(
      { __typename?: 'ThoughtsPost' }
      & Pick<ThoughtsPost, 'id'>
    )> }
  )> }
);

export type UpdateCommentLikesMutationVariables = Exact<{
  data?: Maybe<LikeInput>;
}>;

export type UpdateCommentLikesMutation = (
  { __typename?: 'Mutation' }
  & { updateCommentLikes?: Maybe<(
    { __typename?: 'Comment' }
    & Pick<Comment, 'likes' | 'likedUsers'>
  )> }
);

export type GetCommentsQueryVariables = Exact<{
  data?: Maybe<CommentInput>;
}>;

export type GetCommentsQuery = (
  { __typename?: 'Query' }
  & { getComments?: Maybe<Array<Maybe<(
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'text' | 'timeSubmitted' | 'likes' | 'likedUsers' | 'replyToId'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id' | 'profilePicture'>
    )> }
  )>>> }
);

export type SendNewDmMutationVariables = Exact<{
  data?: Maybe<DirectMessageInput>;
}>;

export type SendNewDmMutation = (
  { __typename?: 'Mutation' }
  & { sendNewDM?: Maybe<(
    { __typename?: 'DirectMessage' }
    & Pick<DirectMessage, 'id' | 'text' | 'timeSubmitted'>
    & { sender?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id' | 'profilePicture'>
    )>, recipient?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'profilePicture'>
    )> }
  )> }
);

export type GetMyDmChatQueryVariables = Exact<{
  data?: Maybe<DirectMessageInput>;
}>;

export type GetMyDmChatQuery = (
  { __typename?: 'Query' }
  & { getMyDMChat?: Maybe<Array<Maybe<(
    { __typename?: 'DirectMessage' }
    & Pick<DirectMessage, 'id' | 'text' | 'timeSubmitted'>
    & { sender?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id' | 'profilePicture'>
    )>, recipient?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'profilePicture'>
    )> }
  )>>> }
);

export type GetMyDMsQueryVariables = Exact<{ [key: string]: never; }>;

export type GetMyDMsQuery = (
  { __typename?: 'Query' }
  & { getMyDMs?: Maybe<Array<Maybe<(
    { __typename?: 'DirectMessage' }
    & Pick<DirectMessage, 'id' | 'text' | 'timeSubmitted'>
    & { sender?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id' | 'profilePicture'>
    )>, recipient?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'profilePicture'>
    )> }
  )>>> }
);

export type GetReccomendationsQueryVariables = Exact<{ [key: string]: never; }>;

export type GetReccomendationsQuery = (
  { __typename?: 'Query' }
  & { getReccomendations?: Maybe<(
    { __typename?: 'Reccomendation' }
    & { tracks?: Maybe<Array<Maybe<(
      { __typename?: 'Track' }
      & Pick<Track, 'name'>
      & { album?: Maybe<(
        { __typename?: 'Album' }
        & Pick<Album, 'name' | 'id' | 'rating'>
        & { images?: Maybe<Array<Maybe<(
          { __typename?: 'Image' }
          & Pick<Image, 'url'>
        )>>>, artists?: Maybe<Array<Maybe<(
          { __typename?: 'Artist' }
          & Pick<Artist, 'name'>
        )>>> }
      )> }
    )>>> }
  )> }
);

export type GetTopArtistsQueryVariables = Exact<{ [key: string]: never; }>;

export type GetTopArtistsQuery = (
  { __typename?: 'Query' }
  & { getTopArtists?: Maybe<Array<Maybe<(
    { __typename?: 'ArtistPost' }
    & Pick<ArtistPost, 'id' | 'text' | 'likes' | 'likedUsers' | 'imageUrl' | 'externalUrl' | 'timeSubmitted' | 'artistId' | 'artistName'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id' | 'profilePicture'>
    )> }
  )>>> }
);

export type GetTopPlaylistsQueryVariables = Exact<{ [key: string]: never; }>;

export type GetTopPlaylistsQuery = (
  { __typename?: 'Query' }
  & { getTopPlaylists?: Maybe<Array<Maybe<(
    { __typename?: 'Playlist' }
    & Pick<Playlist, 'id' | 'title' | 'description' | 'playlistPicture' | 'timeSubmitted'>
    & { tracks?: Maybe<Array<Maybe<(
      { __typename?: 'PlaylistTrack' }
      & Pick<PlaylistTrack, 'id' | 'artists' | 'name' | 'trackImageUrl' | 'externalUrl'>
    )>>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id' | 'profilePicture'>
    )> }
  )>>> }
);

export type GetTopPostsQueryVariables = Exact<{ [key: string]: never; }>;

export type GetTopPostsQuery = (
  { __typename?: 'Query' }
  & { getTopPosts?: Maybe<Array<Maybe<(
    { __typename?: 'AlbumPost' }
    & Pick<AlbumPost, 'id' | 'text' | 'likes' | 'likedUsers' | 'externalUrl' | 'artistNames' | 'rating' | 'imageUrl' | 'timeSubmitted' | 'albumId' | 'albumName'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id' | 'profilePicture'>
    )> }
  ) | (
    { __typename?: 'ArtistPost' }
    & Pick<ArtistPost, 'id' | 'text' | 'likes' | 'likedUsers' | 'imageUrl' | 'externalUrl' | 'timeSubmitted' | 'artistId' | 'artistName'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id' | 'profilePicture'>
    )> }
  ) | (
    { __typename?: 'TrackPost' }
    & Pick<TrackPost, 'id' | 'text' | 'likes' | 'likedUsers' | 'artistNames' | 'externalUrl' | 'vote' | 'imageUrl' | 'timeSubmitted' | 'trackId' | 'trackName'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id' | 'profilePicture'>
    )> }
  )>>> }
);

export type AddToMyListMutationVariables = Exact<{
  data: MyListInput;
}>;

export type AddToMyListMutation = (
  { __typename?: 'Mutation' }
  & { addToMyList?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username' | 'id'>
    & { myList?: Maybe<Array<Maybe<(
      { __typename?: 'MyListItem' }
      & Pick<MyListItem, 'postId' | 'postType'>
    )>>> }
  )> }
);

export type RemoveFromMyListMutationVariables = Exact<{
  data: MyListInput;
}>;

export type RemoveFromMyListMutation = (
  { __typename?: 'Mutation' }
  & { removeFromMyList?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username' | 'id'>
    & { myList?: Maybe<Array<Maybe<(
      { __typename?: 'MyListItem' }
      & Pick<MyListItem, 'postId' | 'postType'>
    )>>> }
  )> }
);

export type GetMyListQueryVariables = Exact<{ [key: string]: never; }>;

export type GetMyListQuery = (
  { __typename?: 'Query' }
  & { getMyList?: Maybe<Array<Maybe<(
    { __typename?: 'AlbumPost' }
    & Pick<AlbumPost, 'id' | 'text' | 'likes' | 'likedUsers' | 'externalUrl' | 'artistNames' | 'rating' | 'imageUrl' | 'timeSubmitted' | 'albumId' | 'albumName'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id' | 'profilePicture'>
    )> }
  ) | (
    { __typename?: 'ArtistPost' }
    & Pick<ArtistPost, 'id' | 'text' | 'likes' | 'likedUsers' | 'imageUrl' | 'externalUrl' | 'timeSubmitted' | 'artistId' | 'artistName'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id' | 'profilePicture'>
    )> }
  ) | (
    { __typename?: 'TrackPost' }
    & Pick<TrackPost, 'id' | 'text' | 'likes' | 'likedUsers' | 'artistNames' | 'externalUrl' | 'vote' | 'imageUrl' | 'timeSubmitted' | 'trackId' | 'trackName'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id' | 'profilePicture'>
    )> }
  ) | { __typename?: 'Poll' } | (
    { __typename?: 'Playlist' }
    & Pick<Playlist, 'id' | 'playlistPicture' | 'title' | 'description' | 'likes' | 'likedUsers' | 'timeSubmitted'>
    & { tracks?: Maybe<Array<Maybe<(
      { __typename?: 'PlaylistTrack' }
      & Pick<PlaylistTrack, 'id' | 'artists' | 'name' | 'trackImageUrl' | 'externalUrl'>
    )>>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id' | 'profilePicture'>
    )> }
  )>>> }
);

export type CreateAlbumPostMutationVariables = Exact<{
  data: AlbumPostInput;
}>;

export type CreateAlbumPostMutation = (
  { __typename?: 'Mutation' }
  & { createAlbumPost?: Maybe<(
    { __typename?: 'AlbumPost' }
    & Pick<AlbumPost, 'id'>
  )> }
);

export type CreateArtistPostMutationVariables = Exact<{
  data: ArtistPostInput;
}>;

export type CreateArtistPostMutation = (
  { __typename?: 'Mutation' }
  & { createArtistPost?: Maybe<(
    { __typename?: 'ArtistPost' }
    & Pick<ArtistPost, 'id'>
  )> }
);

export type CreatePlaylistMutationVariables = Exact<{
  data: PlaylistInput;
}>;

export type CreatePlaylistMutation = (
  { __typename?: 'Mutation' }
  & { createPlaylist?: Maybe<(
    { __typename?: 'Playlist' }
    & Pick<Playlist, 'id'>
  )> }
);

export type CreatePollMutationVariables = Exact<{
  data: PollInput;
}>;

export type CreatePollMutation = (
  { __typename?: 'Mutation' }
  & { createPoll?: Maybe<(
    { __typename?: 'Poll' }
    & Pick<Poll, 'id'>
  )> }
);

export type CreateTrackPostMutationVariables = Exact<{
  data: TrackPostInput;
}>;

export type CreateThoughtsPostMutationVariables = Exact<{
  data: ThoughtsPostInput;
}>;

export type CreateTrackPostMutation = (
  { __typename?: 'Mutation' }
  & { createTrackPost?: Maybe<(
    { __typename?: 'TrackPost' }
    & Pick<TrackPost, 'id'>
  )> }
);

export type CreateThoughtsPostMutation = (
  { __typename?: 'Mutation' }
  & { createThoughtPost?: Maybe<(
    { __typename?: 'ThoughtsPost' }
    & Pick<ThoughtsPost, 'id'>
  )> }
);

export type UpdatePollMutationVariables = Exact<{
  data: PollInput;
}>;

export type UpdatePollMutation = (
  { __typename?: 'Mutation' }
  & { updatePoll?: Maybe<(
    { __typename?: 'Poll' }
    & Pick<Poll, 'id'>
  )> }
);

export type UpdatePostLikesMutationVariables = Exact<{
  data?: Maybe<LikeInput>;
}>;

export type UpdatePostLikesMutation = (
  { __typename?: 'Mutation' }
  & { updatePostLikes?: Maybe<Array<Maybe<(
    { __typename?: 'AlbumPost' }
    & Pick<AlbumPost, 'likes' | 'likedUsers'>
  ) | (
    { __typename?: 'ArtistPost' }
    & Pick<ArtistPost, 'likes' | 'likedUsers'>
  ) | (
    { __typename?: 'TrackPost' }
    & Pick<TrackPost, 'likes' | 'likedUsers'>
  ) | (
    { __typename?: 'Poll' }
    & Pick<Poll, 'likes' | 'likedUsers'>
  ) | (
    { __typename?: 'Playlist' }
    & Pick<Playlist, 'likes' | 'likedUsers'>
  ) | (
    { __typename?: 'ThoughtsPost' }
    & Pick<ThoughtsPost, 'likes' | 'likedUsers'>
  )>>> }
);

export type GetAlbumPostsQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type GetAlbumPostsQuery = (
  { __typename?: 'Query' }
  & { getAlbumPosts?: Maybe<Array<Maybe<(
    { __typename?: 'AlbumPost' }
    & Pick<AlbumPost, 'albumName' | 'externalUrl' | 'artistNames' | 'text' | 'rating' | 'timeSubmitted'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'profilePicture' | 'id'>
    )> }
  )>>> }
);

export type GetArtistPostsQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type GetArtistPostsQuery = (
  { __typename?: 'Query' }
  & { getArtistPosts?: Maybe<Array<Maybe<(
    { __typename?: 'ArtistPost' }
    & Pick<ArtistPost, 'id' | 'artistName' | 'externalUrl' | 'text' | 'timeSubmitted'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'profilePicture' | 'id'>
    )> }
  )>>> }
);

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;

export type GetPostsQuery = (
  { __typename?: 'Query' }
  & { getPosts?: Maybe<Array<Maybe<(
    { __typename?: 'AlbumPost' }
    & Pick<AlbumPost, 'id' | 'text' | 'likes' | 'likedUsers' | 'externalUrl' | 'artistNames' | 'rating' | 'imageUrl' | 'timeSubmitted' | 'albumId' | 'albumName'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id' | 'profilePicture'>
    )> }
  ) | (
    { __typename?: 'ArtistPost' }
    & Pick<ArtistPost, 'id' | 'text' | 'likes' | 'likedUsers' | 'imageUrl' | 'externalUrl' | 'timeSubmitted' | 'artistId' | 'artistName'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id' | 'profilePicture'>
    )> }
  ) | (
    { __typename?: 'TrackPost' }
    & Pick<TrackPost, 'id' | 'text' | 'likes' | 'likedUsers' | 'artistNames' | 'externalUrl' | 'vote' | 'imageUrl' | 'timeSubmitted' | 'trackId' | 'trackName'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id' | 'profilePicture'>
    )> }
  ) | (
    { __typename?: 'ThoughtsPost' }
    & Pick<TrackPost, 'id' | 'text' | 'externalUrl' | 'timeSubmitted' | 'likes' | 'likedUsers'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username'>
    )> }
  ) | (
    { __typename?: 'Poll' }
    & Pick<Poll, 'id' | 'question' | 'timeSubmitted' | 'length' | 'likes' | 'likedUsers'>
    & { options?: Maybe<Array<Maybe<(
      { __typename?: 'PollOption' }
      & Pick<PollOption, 'option' | 'votes'>
    )>>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id' | 'profilePicture'>
    )> }
  ) | (
    { __typename?: 'Playlist' }
    & Pick<Playlist, 'id' | 'playlistPicture' | 'title' | 'description' | 'likes' | 'likedUsers' | 'timeSubmitted'>
    & { tracks?: Maybe<Array<Maybe<(
      { __typename?: 'PlaylistTrack' }
      & Pick<PlaylistTrack, 'id' | 'artists' | 'name' | 'trackImageUrl' | 'externalUrl'>
    )>>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id' | 'profilePicture'>
    )> }
  )>>> }
);

export type GetPostsOfFollowingQueryVariables = Exact<{ [key: string]: never; }>;

export type GetPostsOfFollowingQuery = (
  { __typename?: 'Query' }
  & { getPostsOfFollowing?: Maybe<Array<Maybe<(
    { __typename?: 'AlbumPost' }
    & Pick<AlbumPost, 'id' | 'text' | 'numComments' | 'likes' | 'likedUsers' | 'externalUrl' | 'artistNames' | 'rating' | 'imageUrl' | 'timeSubmitted' | 'albumId' | 'albumName'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id' | 'profilePicture'>
    )> }
  ) | (
    { __typename?: 'ArtistPost' }
    & Pick<ArtistPost, 'id' | 'text' | 'likes' | 'likedUsers' | 'imageUrl' | 'numComments' | 'externalUrl' | 'timeSubmitted' | 'artistId' | 'artistName'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id' | 'profilePicture'>
    )> }
  ) | (
    { __typename?: 'TrackPost' }
    & Pick<TrackPost, 'id' | 'text' | 'likes' | 'likedUsers' | 'numComments' | 'artistNames' | 'externalUrl' | 'vote' | 'imageUrl' | 'timeSubmitted' | 'trackId' | 'trackName'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id' | 'profilePicture'>
    )> }
  ) | (
    { __typename?: 'ThoughtsPost' }
    & Pick<TrackPost, 'id' | 'text' | 'externalUrl' | 'timeSubmitted' | 'likes' | 'likedUsers'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username'>
    )> }
  ) | (
    { __typename?: 'Poll' }
    & Pick<Poll, 'id' | 'question' | 'timeSubmitted' | 'numComments' | 'length' | 'likes' | 'likedUsers'>
    & { options?: Maybe<Array<Maybe<(
      { __typename?: 'PollOption' }
      & Pick<PollOption, 'option' | 'votes'>
    )>>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id' | 'profilePicture'>
    )> }
  ) | (
    { __typename?: 'Playlist' }
    & Pick<Playlist, 'id' | 'playlistPicture' | 'title' | 'description' | 'numComments' | 'likes' | 'likedUsers'| 'timeSubmitted'>
    & { tracks?: Maybe<Array<Maybe<(
      { __typename?: 'PlaylistTrack' }
      & Pick<PlaylistTrack, 'id' | 'artists' | 'name' | 'trackImageUrl' | 'externalUrl'>
    )>>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id' | 'profilePicture'>
    )> }
  )>>> }
);

export type GetTrackPostsQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type GetTrackPostsQuery = (
  { __typename?: 'Query' }
  & { getTrackPosts?: Maybe<Array<Maybe<(
    { __typename?: 'TrackPost' }
    & Pick<TrackPost, 'trackName' | 'externalUrl' | 'text' | 'vote' | 'timeSubmitted'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'profilePicture' | 'id'>
    )> }
  )>>> }
);

export type GetUserPostsQueryVariables = Exact<{
  id?: Maybe<Scalars['Float']>;
}>;

export type GetUserPostsQuery = (
  { __typename?: 'Query' }
  & { getUserPosts?: Maybe<Array<Maybe<(
    { __typename?: 'AlbumPost' }
    & Pick<AlbumPost, 'id' | 'text' | 'externalUrl' | 'artistNames' | 'rating' | 'imageUrl' | 'timeSubmitted' | 'albumId' | 'albumName' | 'likes' | 'likedUsers'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username'>
    )> }
  ) | (
    { __typename?: 'ArtistPost' }
    & Pick<ArtistPost, 'id' | 'text' | 'imageUrl' | 'externalUrl' | 'timeSubmitted' | 'artistId' | 'artistName' | 'likes' | 'likedUsers'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username'>
    )> }
  ) | (
    { __typename?: 'TrackPost' }
    & Pick<TrackPost, 'id' | 'text' | 'artistNames' | 'externalUrl' | 'vote' | 'imageUrl' | 'timeSubmitted' | 'trackId' | 'trackName' | 'likes' | 'likedUsers' >
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username'>
    )> }
  ) | (
    { __typename?: 'ThoughtsPost' }
    & Pick<TrackPost, 'id' | 'text' | 'externalUrl' | 'timeSubmitted' | 'likes' | 'likedUsers'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username'>
    )> }
  ) | (
    { __typename?: 'Poll' }
    & Pick<Poll, 'id' | 'question' | 'timeSubmitted' | 'length' | 'likes' | 'likedUsers'>
    & { options?: Maybe<Array<Maybe<(
      { __typename?: 'PollOption' }
      & Pick<PollOption, 'option' | 'votes'>
    )>>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id' | 'profilePicture'>
    )> }
  ) | (
    { __typename?: 'Playlist' }
    & Pick<Playlist, 'id' | 'playlistPicture' | 'title' | 'description' | 'likes' | 'likedUsers'| 'timeSubmitted'>
    & { tracks?: Maybe<Array<Maybe<(
      { __typename?: 'PlaylistTrack' }
      & Pick<PlaylistTrack, 'id' | 'artists' | 'name' | 'trackImageUrl' | 'externalUrl'>
    )>>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id' | 'profilePicture'>
    )> }
  )>>> }
);

export type SearchPostsQueryVariables = Exact<{
  query?: Maybe<Scalars['String']>;
}>;

export type SearchPostsQuery = (
  { __typename?: 'Query' }
  & { searchPosts?: Maybe<Array<Maybe<(
    { __typename?: 'AlbumPost' }
    & Pick<AlbumPost, 'text' | 'id' | 'externalUrl' | 'artistNames' | 'albumName' | 'rating' | 'imageUrl' | 'timeSubmitted' | 'albumId'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username'>
    )> }
  ) | (
    { __typename?: 'ArtistPost' }
    & Pick<ArtistPost, 'text' | 'id' | 'imageUrl' | 'artistName' | 'timeSubmitted' | 'artistId'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username'>
    )> }
  ) | (
    { __typename?: 'TrackPost' }
    & Pick<TrackPost, 'text' | 'id' | 'artistNames' | 'externalUrl' | 'trackName' | 'vote' | 'imageUrl' | 'timeSubmitted' | 'trackId'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username'>
    )> }
  ) | { __typename?: 'Poll' } | { __typename?: 'Playlist' }>>> }
);

export type GetAlbumTracksQueryVariables = Exact<{
  id?: Maybe<Scalars['String']>;
}>;

export type GetAlbumTracksQuery = (
  { __typename?: 'Query' }
  & { getAlbumTracks?: Maybe<(
    { __typename?: 'AlbumTracks' }
    & { items?: Maybe<Array<Maybe<(
      { __typename?: 'AlbumTrackItem' }
      & Pick<AlbumTrackItem, 'id' | 'name' | 'preview_url' | 'track_number' | 'external_urls'>
      & { artists?: Maybe<Array<Maybe<(
        { __typename?: 'Artist' }
        & Pick<Artist, 'name'>
      )>>> }
    )>>> }
  )> }
);

export type GetArtistAlbumsQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type GetArtistAlbumsQuery = (
  { __typename?: 'Query' }
  & { getArtistAlbums?: Maybe<(
    { __typename?: 'ArtistAlbums' }
    & { items?: Maybe<Array<Maybe<(
      { __typename?: 'Album' }
      & Pick<Album, 'id' | 'name' | 'type'>
      & { images?: Maybe<Array<Maybe<(
        { __typename?: 'Image' }
        & Pick<Image, 'url'>
      )>>> }
    )>>> }
  )> }
);

export type GetArtistTopTracksQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type GetArtistTopTracksQuery = (
  { __typename?: 'Query' }
  & { getArtistTopTracks?: Maybe<(
    { __typename?: 'ArtistTopTracks' }
    & { tracks?: Maybe<Array<Maybe<(
      { __typename?: 'ArtistTopTrackItem' }
      & Pick<ArtistTopTrackItem, 'id' | 'name' | 'preview_url'>
      & { artists?: Maybe<Array<Maybe<(
        { __typename?: 'Artist' }
        & Pick<Artist, 'name'>
      )>>>, album?: Maybe<(
        { __typename?: 'Album' }
        & { images?: Maybe<Array<Maybe<(
          { __typename?: 'Image' }
          & Pick<Image, 'url'>
        )>>> }
      )> }
    )>>> }
  )> }
);

export type GetGenresQueryVariables = Exact<{ [key: string]: never; }>;

export type GetGenresQuery = (
  { __typename?: 'Query' }
  & { getGenres?: Maybe<(
    { __typename?: 'GenreList' }
    & Pick<GenreList, 'genres'>
  )> }
);

export type SearchSpotifyQueryVariables = Exact<{
  type: Scalars['String'];
  query: Scalars['String'];
}>;

export type SearchSpotifyQuery = (
  { __typename?: 'Query' }
  & { search?: Maybe<(
    { __typename?: 'TrackSearchResult' }
    & { tracks?: Maybe<(
      { __typename?: 'TrackItems' }
      & { items?: Maybe<Array<Maybe<(
        { __typename?: 'Track' }
        & Pick<Track, 'id' | 'name' | 'type'>
        & { album?: Maybe<(
          { __typename?: 'Album' }
          & Pick<Album, 'name'>
          & { images?: Maybe<Array<Maybe<(
            { __typename?: 'Image' }
            & Pick<Image, 'url'>
          )>>> }
        )>, artists?: Maybe<Array<Maybe<(
          { __typename?: 'Artist' }
          & Pick<Artist, 'name'>
        )>>>, external_urls?: Maybe<(
          { __typename?: 'ExternalUrl' }
          & Pick<ExternalUrl, 'spotify'>
        )> }
      )>>> }
    )> }
  ) | (
    { __typename?: 'ArtistSearchResult' }
    & { artists?: Maybe<(
      { __typename?: 'ArtistItems' }
      & { items?: Maybe<Array<Maybe<(
        { __typename?: 'Artist' }
        & Pick<Artist, 'id' | 'type' | 'name'>
        & { images?: Maybe<Array<Maybe<(
          { __typename?: 'Image' }
          & Pick<Image, 'url'>
        )>>>, external_urls?: Maybe<(
          { __typename?: 'ExternalUrl' }
          & Pick<ExternalUrl, 'spotify'>
        )> }
      )>>> }
    )> }
  ) | (
    { __typename?: 'AlbumSearchResult' }
    & { albums?: Maybe<(
      { __typename?: 'AlbumItems' }
      & { items?: Maybe<Array<Maybe<(
        { __typename?: 'Album' }
        & Pick<Album, 'id' | 'name' | 'type' | 'release_date'>
        & { artists?: Maybe<Array<Maybe<(
          { __typename?: 'Artist' }
          & Pick<Artist, 'name'>
        )>>>, images?: Maybe<Array<Maybe<(
          { __typename?: 'Image' }
          & Pick<Image, 'url'>
        )>>>, external_urls?: Maybe<(
          { __typename?: 'ExternalUrl' }
          & Pick<ExternalUrl, 'spotify'>
        )> }
      )>>> }
    )> }
  )> }
);

export type EditFirstLoginMutationVariables = Exact<{ [key: string]: never; }>;

export type EditFirstLoginMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'editFirstLogin'>
);

export type EditUserGenresMutationVariables = Exact<{
  data: EditUserInput;
}>;

export type EditUserGenresMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'editUserGenres'>
);

export type EditUserNamesMutationVariables = Exact<{
  data: EditUserInput;
}>;

export type EditUserNamesMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'editUserNames'>
);

export type FacebookSsoMutationVariables = Exact<{
  data: SsoRegisterInput;
}>;

export type FacebookSsoMutation = (
  { __typename?: 'Mutation' }
  & { facebookSSO?: Maybe<(
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
  )> }
);

export type FollowOtherUserMutationVariables = Exact<{
  id?: Maybe<Scalars['Float']>;
  follow?: Maybe<Scalars['Boolean']>;
}>;

export type FollowOtherUserMutation = (
  { __typename?: 'Mutation' }
  & { followOtherUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email' | 'profilePicture' | 'followers' | 'following'>
    & { topAlbums?: Maybe<Array<Maybe<(
      { __typename?: 'TopFive' }
      & Pick<TopFive, 'name' | 'imageUrl' | 'id' | 'artistNames'>
    )>>>, topArtists?: Maybe<Array<Maybe<(
      { __typename?: 'TopFive' }
      & Pick<TopFive, 'name' | 'imageUrl' | 'id'>
    )>>>, topTracks?: Maybe<Array<Maybe<(
      { __typename?: 'TopFive' }
      & Pick<TopFive, 'name' | 'imageUrl' | 'id' | 'artistNames'>
    )>>> }
  )> }
);

export type GoogleSsoMutationVariables = Exact<{
  data: SsoRegisterInput;
}>;

export type GoogleSsoMutation = (
  { __typename?: 'Mutation' }
  & { googleSSO?: Maybe<(
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
  )> }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  expoToken: Scalars['String'];
}>;

export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
  )> }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;

export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;

export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'register'>
);

export type UpdateUserTopFiveMutationVariables = Exact<{
  data?: Maybe<TopFiveArrayInput>;
}>;

export type UpdateUserTopFiveMutation = (
  { __typename?: 'Mutation' }
  & { updateUserTopFive?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email'>
    & { topAlbums?: Maybe<Array<Maybe<(
      { __typename?: 'TopFive' }
      & Pick<TopFive, 'name' | 'imageUrl' | 'id' | 'artistNames'>
    )>>>, topArtists?: Maybe<Array<Maybe<(
      { __typename?: 'TopFive' }
      & Pick<TopFive, 'name' | 'imageUrl' | 'id'>
    )>>>, topTracks?: Maybe<Array<Maybe<(
      { __typename?: 'TopFive' }
      & Pick<TopFive, 'name' | 'imageUrl' | 'id' | 'artistNames'>
    )>>> }
  )> }
);

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;

export type GetCurrentUserQuery = (
  { __typename?: 'Query' }
  & { getCurrentUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'username' | 'googleId' | 'facebookId' | 'email' | 'profilePicture' | 'followers' | 'following' | 'genres' | 'firstLogin'>
    & { topAlbums?: Maybe<Array<Maybe<(
      { __typename?: 'TopFive' }
      & Pick<TopFive, 'name' | 'imageUrl' | 'id' | 'artistNames'>
    )>>>, topArtists?: Maybe<Array<Maybe<(
      { __typename?: 'TopFive' }
      & Pick<TopFive, 'name' | 'imageUrl' | 'id'>
    )>>>, topTracks?: Maybe<Array<Maybe<(
      { __typename?: 'TopFive' }
      & Pick<TopFive, 'name' | 'imageUrl' | 'id' | 'artistNames'>
    )>>> }
  )> }
);

export type GetFollowingorFollowersQueryVariables = Exact<{
  id?: Maybe<Scalars['Float']>;
  request?: Maybe<Scalars['String']>;
}>;

export type GetFollowingorFollowersQuery = (
  { __typename?: 'Query' }
  & { getFollowingorFollowers?: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email' | 'profilePicture'>
  )>>> }
);

export type GetOtherUserQueryVariables = Exact<{
  id?: Maybe<Scalars['Float']>;
}>;

export type GetOtherUserQuery = (
  { __typename?: 'Query' }
  & { getOtherUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'email' | 'profilePicture' | 'followers' | 'following' | 'posts'>
    & { topAlbums?: Maybe<Array<Maybe<(
      { __typename?: 'TopFive' }
      & Pick<TopFive, 'name' | 'imageUrl' | 'id' | 'artistNames'>
    )>>>, topArtists?: Maybe<Array<Maybe<(
      { __typename?: 'TopFive' }
      & Pick<TopFive, 'name' | 'imageUrl' | 'id'>
    )>>>, topTracks?: Maybe<Array<Maybe<(
      { __typename?: 'TopFive' }
      & Pick<TopFive, 'name' | 'imageUrl' | 'id' | 'artistNames'>
    )>>>, posts?: Maybe<Array<Maybe<(
      { __typename?: 'AlbumPost' }
      & Pick<AlbumPost, 'id' | 'text' | 'numComments' | 'likes' | 'likedUsers' | 'externalUrl' | 'artistNames' | 'rating' | 'imageUrl' | 'timeSubmitted' | 'albumId' | 'albumName'>
    )>>> }

  )> }
);

export type SearchUserQueryVariables = Exact<{
  query?: Maybe<Scalars['String']>;
}>;

export type SearchUserQuery = (
  { __typename?: 'Query' }
  & { searchUser?: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username' | 'id' | 'profilePicture'>
  )>>> }
);

export const CreateCommentDocument = gql`
    mutation CreateComment($data: CommentInput) {
  createComment(data: $data) {
    likes
    likedUsers
    timeSubmitted
    text
    replyToId
    trackPost {
      trackName
    }
    artistPost {
      artistName
    }
    albumPost {
      albumName
    }
    thoughtsPost {
      id
    }
  }
}
    `;
export type CreateCommentMutationFn = ApolloReactCommon.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
  return ApolloReactHooks.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, baseOptions);
}
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = ApolloReactCommon.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const UpdateCommentLikesDocument = gql`
    mutation updateCommentLikes($data: LikeInput) {
  updateCommentLikes(data: $data) {
    likes
    likedUsers
  }
}
    `;
export type UpdateCommentLikesMutationFn = ApolloReactCommon.MutationFunction<UpdateCommentLikesMutation, UpdateCommentLikesMutationVariables>;

/**
 * __useUpdateCommentLikesMutation__
 *
 * To run a mutation, you first call `useUpdateCommentLikesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentLikesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentLikesMutation, { data, loading, error }] = useUpdateCommentLikesMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateCommentLikesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateCommentLikesMutation, UpdateCommentLikesMutationVariables>) {
  return ApolloReactHooks.useMutation<UpdateCommentLikesMutation, UpdateCommentLikesMutationVariables>(UpdateCommentLikesDocument, baseOptions);
}
export type UpdateCommentLikesMutationHookResult = ReturnType<typeof useUpdateCommentLikesMutation>;
export type UpdateCommentLikesMutationResult = ApolloReactCommon.MutationResult<UpdateCommentLikesMutation>;
export type UpdateCommentLikesMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateCommentLikesMutation, UpdateCommentLikesMutationVariables>;
export const GetCommentsDocument = gql`
    query getComments($data: CommentInput) {
  getComments(data: $data) {
    id
    text
    timeSubmitted
    likes
    likedUsers
    replyToId
    user {
      username
      id
      profilePicture
    }
  }
}
    `;

/**
 * __useGetCommentsQuery__
 *
 * To run a query within a React component, call `useGetCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetCommentsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables>) {
  return ApolloReactHooks.useQuery<GetCommentsQuery, GetCommentsQueryVariables>(GetCommentsDocument, baseOptions);
}
export function useGetCommentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<GetCommentsQuery, GetCommentsQueryVariables>(GetCommentsDocument, baseOptions);
}
export type GetCommentsQueryHookResult = ReturnType<typeof useGetCommentsQuery>;
export type GetCommentsLazyQueryHookResult = ReturnType<typeof useGetCommentsLazyQuery>;
export type GetCommentsQueryResult = ApolloReactCommon.QueryResult<GetCommentsQuery, GetCommentsQueryVariables>;
export const SendNewDmDocument = gql`
    mutation sendNewDM($data: DirectMessageInput) {
  sendNewDM(data: $data) {
    id
    text
    timeSubmitted
    sender {
      username
      id
      profilePicture
    }
    recipient {
      id
      username
      profilePicture
    }
  }
}
    `;
export type SendNewDmMutationFn = ApolloReactCommon.MutationFunction<SendNewDmMutation, SendNewDmMutationVariables>;

/**
 * __useSendNewDmMutation__
 *
 * To run a mutation, you first call `useSendNewDmMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendNewDmMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendNewDmMutation, { data, loading, error }] = useSendNewDmMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSendNewDmMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SendNewDmMutation, SendNewDmMutationVariables>) {
  return ApolloReactHooks.useMutation<SendNewDmMutation, SendNewDmMutationVariables>(SendNewDmDocument, baseOptions);
}
export type SendNewDmMutationHookResult = ReturnType<typeof useSendNewDmMutation>;
export type SendNewDmMutationResult = ApolloReactCommon.MutationResult<SendNewDmMutation>;
export type SendNewDmMutationOptions = ApolloReactCommon.BaseMutationOptions<SendNewDmMutation, SendNewDmMutationVariables>;
export const GetMyDmChatDocument = gql`
    query getMyDMChat($data: DirectMessageInput) {
  getMyDMChat(data: $data) {
    id
    text
    timeSubmitted
    sender {
      username
      id
      profilePicture
    }
    recipient {
      id
      username
      profilePicture
    }
  }
}
    `;

/**
 * __useGetMyDmChatQuery__
 *
 * To run a query within a React component, call `useGetMyDmChatQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyDmChatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyDmChatQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetMyDmChatQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMyDmChatQuery, GetMyDmChatQueryVariables>) {
  return ApolloReactHooks.useQuery<GetMyDmChatQuery, GetMyDmChatQueryVariables>(GetMyDmChatDocument, baseOptions);
}
export function useGetMyDmChatLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMyDmChatQuery, GetMyDmChatQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<GetMyDmChatQuery, GetMyDmChatQueryVariables>(GetMyDmChatDocument, baseOptions);
}
export type GetMyDmChatQueryHookResult = ReturnType<typeof useGetMyDmChatQuery>;
export type GetMyDmChatLazyQueryHookResult = ReturnType<typeof useGetMyDmChatLazyQuery>;
export type GetMyDmChatQueryResult = ApolloReactCommon.QueryResult<GetMyDmChatQuery, GetMyDmChatQueryVariables>;
export const GetMyDMsDocument = gql`
    query getMyDMs {
  getMyDMs {
    id
    text
    timeSubmitted
    sender {
      username
      id
      profilePicture
    }
    recipient {
      id
      username
      profilePicture
    }
  }
}
    `;

/**
 * __useGetMyDMsQuery__
 *
 * To run a query within a React component, call `useGetMyDMsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyDMsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyDMsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyDMsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMyDMsQuery, GetMyDMsQueryVariables>) {
  return ApolloReactHooks.useQuery<GetMyDMsQuery, GetMyDMsQueryVariables>(GetMyDMsDocument, baseOptions);
}
export function useGetMyDMsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMyDMsQuery, GetMyDMsQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<GetMyDMsQuery, GetMyDMsQueryVariables>(GetMyDMsDocument, baseOptions);
}
export type GetMyDMsQueryHookResult = ReturnType<typeof useGetMyDMsQuery>;
export type GetMyDMsLazyQueryHookResult = ReturnType<typeof useGetMyDMsLazyQuery>;
export type GetMyDMsQueryResult = ApolloReactCommon.QueryResult<GetMyDMsQuery, GetMyDMsQueryVariables>;
export const GetReccomendationsDocument = gql`
    query getReccomendations {
  getReccomendations {
    tracks {
      name
      album {
        name
        id
        images {
          url
        }
        artists {
          name
        }
      }
    }
  }
}
    `;

/**
 * __useGetReccomendationsQuery__
 *
 * To run a query within a React component, call `useGetReccomendationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReccomendationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReccomendationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetReccomendationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetReccomendationsQuery, GetReccomendationsQueryVariables>) {
  return ApolloReactHooks.useQuery<GetReccomendationsQuery, GetReccomendationsQueryVariables>(GetReccomendationsDocument, baseOptions);
}
export function useGetReccomendationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetReccomendationsQuery, GetReccomendationsQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<GetReccomendationsQuery, GetReccomendationsQueryVariables>(GetReccomendationsDocument, baseOptions);
}
export type GetReccomendationsQueryHookResult = ReturnType<typeof useGetReccomendationsQuery>;
export type GetReccomendationsLazyQueryHookResult = ReturnType<typeof useGetReccomendationsLazyQuery>;
export type GetReccomendationsQueryResult = ApolloReactCommon.QueryResult<GetReccomendationsQuery, GetReccomendationsQueryVariables>;
export const GetTopArtistsDocument = gql`
    query getTopArtists {
  getTopArtists {
    id
    text
    likes
    likedUsers
    imageUrl
    externalUrl
    timeSubmitted
    artistId
    artistName
    user {
      username
      id
      profilePicture
    }
  }
}
    `;

/**
 * __useGetTopArtistsQuery__
 *
 * To run a query within a React component, call `useGetTopArtistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopArtistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopArtistsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTopArtistsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetTopArtistsQuery, GetTopArtistsQueryVariables>) {
  return ApolloReactHooks.useQuery<GetTopArtistsQuery, GetTopArtistsQueryVariables>(GetTopArtistsDocument, baseOptions);
}
export function useGetTopArtistsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTopArtistsQuery, GetTopArtistsQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<GetTopArtistsQuery, GetTopArtistsQueryVariables>(GetTopArtistsDocument, baseOptions);
}
export type GetTopArtistsQueryHookResult = ReturnType<typeof useGetTopArtistsQuery>;
export type GetTopArtistsLazyQueryHookResult = ReturnType<typeof useGetTopArtistsLazyQuery>;
export type GetTopArtistsQueryResult = ApolloReactCommon.QueryResult<GetTopArtistsQuery, GetTopArtistsQueryVariables>;
export const GetTopPlaylistsDocument = gql`
    query getTopPlaylists {
  getTopPlaylists {
    id
    title
    description
    playlistPicture
    tracks {
      id
      artists
      name
      trackImageUrl
      externalUrl
    }
    timeSubmitted
    user {
      username
      id
      profilePicture
    }
  }
}
    `;

/**
 * __useGetTopPlaylistsQuery__
 *
 * To run a query within a React component, call `useGetTopPlaylistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopPlaylistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopPlaylistsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTopPlaylistsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetTopPlaylistsQuery, GetTopPlaylistsQueryVariables>) {
  return ApolloReactHooks.useQuery<GetTopPlaylistsQuery, GetTopPlaylistsQueryVariables>(GetTopPlaylistsDocument, baseOptions);
}
export function useGetTopPlaylistsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTopPlaylistsQuery, GetTopPlaylistsQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<GetTopPlaylistsQuery, GetTopPlaylistsQueryVariables>(GetTopPlaylistsDocument, baseOptions);
}
export type GetTopPlaylistsQueryHookResult = ReturnType<typeof useGetTopPlaylistsQuery>;
export type GetTopPlaylistsLazyQueryHookResult = ReturnType<typeof useGetTopPlaylistsLazyQuery>;
export type GetTopPlaylistsQueryResult = ApolloReactCommon.QueryResult<GetTopPlaylistsQuery, GetTopPlaylistsQueryVariables>;
export const GetTopPostsDocument = gql`
    query getTopPosts {
  getTopPosts {
    ... on AlbumPost {
      id
      text
      likes
      likedUsers
      externalUrl
      artistNames
      rating
      imageUrl
      timeSubmitted
      albumId
      albumName
      user {
        username
        id
        profilePicture
      }
    }
    ... on TrackPost {
      id
      text
      likes
      likedUsers
      artistNames
      externalUrl
      vote
      imageUrl
      timeSubmitted
      trackId
      trackName
      user {
        username
        id
        profilePicture
      }
    }
    ... on ArtistPost {
      id
      text
      likes
      likedUsers
      imageUrl
      externalUrl
      timeSubmitted
      artistId
      artistName
      user {
        username
        id
        profilePicture
      }
    }
  }
}
    `;

/**
 * __useGetTopPostsQuery__
 *
 * To run a query within a React component, call `useGetTopPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTopPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetTopPostsQuery, GetTopPostsQueryVariables>) {
  return ApolloReactHooks.useQuery<GetTopPostsQuery, GetTopPostsQueryVariables>(GetTopPostsDocument, baseOptions);
}
export function useGetTopPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTopPostsQuery, GetTopPostsQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<GetTopPostsQuery, GetTopPostsQueryVariables>(GetTopPostsDocument, baseOptions);
}
export type GetTopPostsQueryHookResult = ReturnType<typeof useGetTopPostsQuery>;
export type GetTopPostsLazyQueryHookResult = ReturnType<typeof useGetTopPostsLazyQuery>;
export type GetTopPostsQueryResult = ApolloReactCommon.QueryResult<GetTopPostsQuery, GetTopPostsQueryVariables>;
export const AddToMyListDocument = gql`
    mutation addToMyList($data: MyListInput!) {
  addToMyList(data: $data) {
    username
    id
    myList {
      postId
      postType
    }
  }
}
    `;
export type AddToMyListMutationFn = ApolloReactCommon.MutationFunction<AddToMyListMutation, AddToMyListMutationVariables>;

/**
 * __useAddToMyListMutation__
 *
 * To run a mutation, you first call `useAddToMyListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToMyListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToMyListMutation, { data, loading, error }] = useAddToMyListMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddToMyListMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddToMyListMutation, AddToMyListMutationVariables>) {
  return ApolloReactHooks.useMutation<AddToMyListMutation, AddToMyListMutationVariables>(AddToMyListDocument, baseOptions);
}
export type AddToMyListMutationHookResult = ReturnType<typeof useAddToMyListMutation>;
export type AddToMyListMutationResult = ApolloReactCommon.MutationResult<AddToMyListMutation>;
export type AddToMyListMutationOptions = ApolloReactCommon.BaseMutationOptions<AddToMyListMutation, AddToMyListMutationVariables>;
export const RemoveFromMyListDocument = gql`
    mutation removeFromMyList($data: MyListInput!) {
  removeFromMyList(data: $data) {
    username
    id
    myList {
      postId
      postType
    }
  }
}
    `;
export type RemoveFromMyListMutationFn = ApolloReactCommon.MutationFunction<RemoveFromMyListMutation, RemoveFromMyListMutationVariables>;

/**
 * __useRemoveFromMyListMutation__
 *
 * To run a mutation, you first call `useRemoveFromMyListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFromMyListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFromMyListMutation, { data, loading, error }] = useRemoveFromMyListMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRemoveFromMyListMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveFromMyListMutation, RemoveFromMyListMutationVariables>) {
  return ApolloReactHooks.useMutation<RemoveFromMyListMutation, RemoveFromMyListMutationVariables>(RemoveFromMyListDocument, baseOptions);
}
export type RemoveFromMyListMutationHookResult = ReturnType<typeof useRemoveFromMyListMutation>;
export type RemoveFromMyListMutationResult = ApolloReactCommon.MutationResult<RemoveFromMyListMutation>;
export type RemoveFromMyListMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveFromMyListMutation, RemoveFromMyListMutationVariables>;
export const GetMyListDocument = gql`
    query getMyList {
  getMyList {
    ... on Playlist {
      id
      playlistPicture
      title
      description
      likes
      likedUsers
      tracks {
        id
        artists
        name
        trackImageUrl
        externalUrl
      }
      timeSubmitted
      user {
        username
        id
        profilePicture
      }
    }
    ... on AlbumPost {
      id
      text
      likes
      likedUsers
      externalUrl
      artistNames
      rating
      imageUrl
      timeSubmitted
      albumId
      albumName
      user {
        username
        id
        profilePicture
      }
    }
    ... on TrackPost {
      id
      text
      likes
      likedUsers
      artistNames
      externalUrl
      vote
      imageUrl
      timeSubmitted
      trackId
      trackName
      user {
        username
        id
        profilePicture
      }
    }
    ... on ArtistPost {
      id
      text
      likes
      likedUsers
      imageUrl
      externalUrl
      timeSubmitted
      artistId
      artistName
      user {
        username
        id
        profilePicture
      }
    }
  }
}
    `;

/**
 * __useGetMyListQuery__
 *
 * To run a query within a React component, call `useGetMyListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMyListQuery, GetMyListQueryVariables>) {
  return ApolloReactHooks.useQuery<GetMyListQuery, GetMyListQueryVariables>(GetMyListDocument, baseOptions);
}
export function useGetMyListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMyListQuery, GetMyListQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<GetMyListQuery, GetMyListQueryVariables>(GetMyListDocument, baseOptions);
}
export type GetMyListQueryHookResult = ReturnType<typeof useGetMyListQuery>;
export type GetMyListLazyQueryHookResult = ReturnType<typeof useGetMyListLazyQuery>;
export type GetMyListQueryResult = ApolloReactCommon.QueryResult<GetMyListQuery, GetMyListQueryVariables>;
export const CreateAlbumPostDocument = gql`
    mutation CreateAlbumPost($data: AlbumPostInput!) {
  createAlbumPost(data: $data) {
    id
  }
}
    `;
export type CreateAlbumPostMutationFn = ApolloReactCommon.MutationFunction<CreateAlbumPostMutation, CreateAlbumPostMutationVariables>;

/**
 * __useCreateAlbumPostMutation__
 *
 * To run a mutation, you first call `useCreateAlbumPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAlbumPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAlbumPostMutation, { data, loading, error }] = useCreateAlbumPostMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateAlbumPostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateAlbumPostMutation, CreateAlbumPostMutationVariables>) {
  return ApolloReactHooks.useMutation<CreateAlbumPostMutation, CreateAlbumPostMutationVariables>(CreateAlbumPostDocument, baseOptions);
}
export type CreateAlbumPostMutationHookResult = ReturnType<typeof useCreateAlbumPostMutation>;
export type CreateAlbumPostMutationResult = ApolloReactCommon.MutationResult<CreateAlbumPostMutation>;
export type CreateAlbumPostMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateAlbumPostMutation, CreateAlbumPostMutationVariables>;
export const CreateArtistPostDocument = gql`
    mutation CreateArtistPost($data: ArtistPostInput!) {
  createArtistPost(data: $data) {
    id
  }
}
    `;
export type CreateArtistPostMutationFn = ApolloReactCommon.MutationFunction<CreateArtistPostMutation, CreateArtistPostMutationVariables>;

/**
 * __useCreateArtistPostMutation__
 *
 * To run a mutation, you first call `useCreateArtistPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateArtistPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createArtistPostMutation, { data, loading, error }] = useCreateArtistPostMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateArtistPostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateArtistPostMutation, CreateArtistPostMutationVariables>) {
  return ApolloReactHooks.useMutation<CreateArtistPostMutation, CreateArtistPostMutationVariables>(CreateArtistPostDocument, baseOptions);
}
export type CreateArtistPostMutationHookResult = ReturnType<typeof useCreateArtistPostMutation>;
export type CreateArtistPostMutationResult = ApolloReactCommon.MutationResult<CreateArtistPostMutation>;
export type CreateArtistPostMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateArtistPostMutation, CreateArtistPostMutationVariables>;
export const CreatePlaylistDocument = gql`
    mutation createPlaylist($data: PlaylistInput!) {
  createPlaylist(data: $data) {
    id
  }
}
    `;
export type CreatePlaylistMutationFn = ApolloReactCommon.MutationFunction<CreatePlaylistMutation, CreatePlaylistMutationVariables>;

/**
 * __useCreatePlaylistMutation__
 *
 * To run a mutation, you first call `useCreatePlaylistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlaylistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlaylistMutation, { data, loading, error }] = useCreatePlaylistMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePlaylistMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePlaylistMutation, CreatePlaylistMutationVariables>) {
  return ApolloReactHooks.useMutation<CreatePlaylistMutation, CreatePlaylistMutationVariables>(CreatePlaylistDocument, baseOptions);
}
export type CreatePlaylistMutationHookResult = ReturnType<typeof useCreatePlaylistMutation>;
export type CreatePlaylistMutationResult = ApolloReactCommon.MutationResult<CreatePlaylistMutation>;
export type CreatePlaylistMutationOptions = ApolloReactCommon.BaseMutationOptions<CreatePlaylistMutation, CreatePlaylistMutationVariables>;
export const CreatePollDocument = gql`
    mutation createPoll($data: PollInput!) {
  createPoll(data: $data) {
    id
  }
}
    `;
export type CreatePollMutationFn = ApolloReactCommon.MutationFunction<CreatePollMutation, CreatePollMutationVariables>;

/**
 * __useCreatePollMutation__
 *
 * To run a mutation, you first call `useCreatePollMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePollMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPollMutation, { data, loading, error }] = useCreatePollMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePollMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePollMutation, CreatePollMutationVariables>) {
  return ApolloReactHooks.useMutation<CreatePollMutation, CreatePollMutationVariables>(CreatePollDocument, baseOptions);
}
export type CreatePollMutationHookResult = ReturnType<typeof useCreatePollMutation>;
export type CreatePollMutationResult = ApolloReactCommon.MutationResult<CreatePollMutation>;
export type CreatePollMutationOptions = ApolloReactCommon.BaseMutationOptions<CreatePollMutation, CreatePollMutationVariables>;
export const CreateTrackPostDocument = gql`
    mutation CreateTrackPost($data: TrackPostInput!) {
  createTrackPost(data: $data) {
    id
  }
}
    `;

export const CreateThoughtsPostDocument = gql`
mutation createThoughtPost($data: PostInput) {
  createThoughtPost(data: $data) {
  	  id
  }
}

    `;
export type CreateTrackPostMutationFn = ApolloReactCommon.MutationFunction<CreateTrackPostMutation, CreateTrackPostMutationVariables>;

/**
 * __useCreateTrackPostMutation__
 *
 * To run a mutation, you first call `useCreateTrackPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTrackPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTrackPostMutation, { data, loading, error }] = useCreateTrackPostMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateThoughtsPostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateThoughtsPostMutation, CreateThoughtsPostMutationVariables>) {
  return ApolloReactHooks.useMutation<CreateThoughtsPostMutation, CreateThoughtsPostMutationVariables>(CreateThoughtsPostDocument, baseOptions);
}

export function useCreateTrackPostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTrackPostMutation, CreateTrackPostMutationVariables>) {
  return ApolloReactHooks.useMutation<CreateTrackPostMutation, CreateTrackPostMutationVariables>(CreateTrackPostDocument, baseOptions);
}
export type CreateTrackPostMutationHookResult = ReturnType<typeof useCreateTrackPostMutation>;
export type CreateTrackPostMutationResult = ApolloReactCommon.MutationResult<CreateTrackPostMutation>;
export type CreateTrackPostMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTrackPostMutation, CreateTrackPostMutationVariables>;
export const UpdatePollDocument = gql`
    mutation updatePoll($data: PollInput!) {
  updatePoll(data: $data) {
    id
  }
}
    `;
export type UpdatePollMutationFn = ApolloReactCommon.MutationFunction<UpdatePollMutation, UpdatePollMutationVariables>;

/**
 * __useUpdatePollMutation__
 *
 * To run a mutation, you first call `useUpdatePollMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePollMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePollMutation, { data, loading, error }] = useUpdatePollMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdatePollMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdatePollMutation, UpdatePollMutationVariables>) {
  return ApolloReactHooks.useMutation<UpdatePollMutation, UpdatePollMutationVariables>(UpdatePollDocument, baseOptions);
}
export type UpdatePollMutationHookResult = ReturnType<typeof useUpdatePollMutation>;
export type UpdatePollMutationResult = ApolloReactCommon.MutationResult<UpdatePollMutation>;
export type UpdatePollMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdatePollMutation, UpdatePollMutationVariables>;
export const UpdatePostLikesDocument = gql`
    mutation updatePostLikes($data: LikeInput) {
  updatePostLikes(data: $data) {
    ... on AlbumPost {
      likes
      likedUsers
    }
    ... on TrackPost {
      likes
      likedUsers
    }
    ... on ArtistPost {
      likes
      likedUsers
    }
    ... on Poll {
      likes
      likedUsers
    }
    ... on Playlist {
      likes
      likedUsers
    }
    ... on ThoughtsPost {
      likes
      likedUsers
    }
  }
}
    `;
export type UpdatePostLikesMutationFn = ApolloReactCommon.MutationFunction<UpdatePostLikesMutation, UpdatePostLikesMutationVariables>;

/**
 * __useUpdatePostLikesMutation__
 *
 * To run a mutation, you first call `useUpdatePostLikesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostLikesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostLikesMutation, { data, loading, error }] = useUpdatePostLikesMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdatePostLikesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdatePostLikesMutation, UpdatePostLikesMutationVariables>) {
  return ApolloReactHooks.useMutation<UpdatePostLikesMutation, UpdatePostLikesMutationVariables>(UpdatePostLikesDocument, baseOptions);
}
export type UpdatePostLikesMutationHookResult = ReturnType<typeof useUpdatePostLikesMutation>;
export type UpdatePostLikesMutationResult = ApolloReactCommon.MutationResult<UpdatePostLikesMutation>;
export type UpdatePostLikesMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdatePostLikesMutation, UpdatePostLikesMutationVariables>;
export const GetAlbumPostsDocument = gql`
    query getAlbumPosts($id: String!) {
  getAlbumPosts(id: $id) {
    albumName
    externalUrl
    artistNames
    text
    rating
    timeSubmitted
    user {
      username
      profilePicture
      id
    }
  }
}
    `;

/**
 * __useGetAlbumPostsQuery__
 *
 * To run a query within a React component, call `useGetAlbumPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAlbumPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAlbumPostsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAlbumPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAlbumPostsQuery, GetAlbumPostsQueryVariables>) {
  return ApolloReactHooks.useQuery<GetAlbumPostsQuery, GetAlbumPostsQueryVariables>(GetAlbumPostsDocument, baseOptions);
}
export function useGetAlbumPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAlbumPostsQuery, GetAlbumPostsQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<GetAlbumPostsQuery, GetAlbumPostsQueryVariables>(GetAlbumPostsDocument, baseOptions);
}
export type GetAlbumPostsQueryHookResult = ReturnType<typeof useGetAlbumPostsQuery>;
export type GetAlbumPostsLazyQueryHookResult = ReturnType<typeof useGetAlbumPostsLazyQuery>;
export type GetAlbumPostsQueryResult = ApolloReactCommon.QueryResult<GetAlbumPostsQuery, GetAlbumPostsQueryVariables>;
export const GetArtistPostsDocument = gql`
    query getArtistPosts($id: String!) {
  getArtistPosts(id: $id) {
    id
    artistName
    externalUrl
    text
    timeSubmitted
    user {
      username
      profilePicture
      id
    }
  }
}
    `;

/**
 * __useGetArtistPostsQuery__
 *
 * To run a query within a React component, call `useGetArtistPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArtistPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArtistPostsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetArtistPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetArtistPostsQuery, GetArtistPostsQueryVariables>) {
  return ApolloReactHooks.useQuery<GetArtistPostsQuery, GetArtistPostsQueryVariables>(GetArtistPostsDocument, baseOptions);
}
export function useGetArtistPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetArtistPostsQuery, GetArtistPostsQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<GetArtistPostsQuery, GetArtistPostsQueryVariables>(GetArtistPostsDocument, baseOptions);
}
export type GetArtistPostsQueryHookResult = ReturnType<typeof useGetArtistPostsQuery>;
export type GetArtistPostsLazyQueryHookResult = ReturnType<typeof useGetArtistPostsLazyQuery>;
export type GetArtistPostsQueryResult = ApolloReactCommon.QueryResult<GetArtistPostsQuery, GetArtistPostsQueryVariables>;
export const GetPostsDocument = gql`
    query GetPosts {
  getPosts {
    ... on Playlist {
      id
      playlistPicture
      title
      description
      likes
      likedUsers
      tracks {
        id
        artists
        name
        trackImageUrl
        externalUrl
      }
      timeSubmitted
      user {
        username
        id
        profilePicture
      }
    }
    ... on Poll {
      id
      question
      timeSubmitted
      length
      likes
      likedUsers
      options {
        option
        votes
      }
      user {
        username
        id
        profilePicture
      }
    }
    ... on AlbumPost {
      id
      text
      likes
      likedUsers
      externalUrl
      artistNames
      rating
      imageUrl
      timeSubmitted
      albumId
      albumName
      user {
        username
        id
        profilePicture
      }
    }
    ... on TrackPost {
      id
      text
      likes
      likedUsers
      artistNames
      externalUrl
      vote
      imageUrl
      timeSubmitted
      trackId
      trackName
      user {
        username
        id
        profilePicture
      }
    }
    ... on ThoughtsPost {
      id
      text
      likes
      likedUsers
      imageUrl
      timeSubmitted
      user {
        username
        id
        profilePicture
      }
    }
    ... on ArtistPost {
      id
      text
      likes
      likedUsers
      imageUrl
      externalUrl
      timeSubmitted
      artistId
      artistName
      user {
        username
        id
        profilePicture
      }
    }
  }
}
    `;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
  return ApolloReactHooks.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, baseOptions);
}
export function useGetPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, baseOptions);
}
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsQueryResult = ApolloReactCommon.QueryResult<GetPostsQuery, GetPostsQueryVariables>;
export const GetPostsOfFollowingDocument = gql`
    query getPostsOfFollowing {
  getPostsOfFollowing {
    ... on Playlist {
      id
      playlistPicture
      title
      description
      numComments
      likes
      likedUsers
      tracks {
        id
        artists
        name
        trackImageUrl
        externalUrl
      }
      timeSubmitted
      user {
        username
        id
        profilePicture
      }
    }
    ... on Poll {
      id
      question
      timeSubmitted
      numComments
      length
      likes
      likedUsers
      options {
        option
        votes
      }
      user {
        username
        id
        profilePicture
      }
    }
    ... on AlbumPost {
      id
      text
      numComments
      likes
      likedUsers
      externalUrl
      artistNames
      rating
      imageUrl
      timeSubmitted
      albumId
      albumName
      user {
        username
        id
        profilePicture
      }
    }
    ... on TrackPost {
      id
      text
      likes
      likedUsers
      numComments
      artistNames
      externalUrl
      vote
      imageUrl
      timeSubmitted
      trackId
      trackName
      user {
        username
        id
        profilePicture
      }
    }
    ... on ThoughtsPost {
      id
      text
      likes
      likedUsers
      numComments
      imageUrl
      timeSubmitted
      user {
        username
        id
        profilePicture
      }
    }
    ... on ArtistPost {
      id
      text
      likes
      likedUsers
      imageUrl
      numComments
      externalUrl
      timeSubmitted
      artistId
      artistName
      user {
        username
        id
        profilePicture
      }
    }
  }
}
    `;

/**
 * __useGetPostsOfFollowingQuery__
 *
 * To run a query within a React component, call `useGetPostsOfFollowingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsOfFollowingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsOfFollowingQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPostsOfFollowingQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPostsOfFollowingQuery, GetPostsOfFollowingQueryVariables>) {
  return ApolloReactHooks.useQuery<GetPostsOfFollowingQuery, GetPostsOfFollowingQueryVariables>(GetPostsOfFollowingDocument, baseOptions);
}
export function useGetPostsOfFollowingLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPostsOfFollowingQuery, GetPostsOfFollowingQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<GetPostsOfFollowingQuery, GetPostsOfFollowingQueryVariables>(GetPostsOfFollowingDocument, baseOptions);
}
export type GetPostsOfFollowingQueryHookResult = ReturnType<typeof useGetPostsOfFollowingQuery>;
export type GetPostsOfFollowingLazyQueryHookResult = ReturnType<typeof useGetPostsOfFollowingLazyQuery>;
export type GetPostsOfFollowingQueryResult = ApolloReactCommon.QueryResult<GetPostsOfFollowingQuery, GetPostsOfFollowingQueryVariables>;
export const GetTrackPostsDocument = gql`
    query getTrackPosts($id: String!) {
  getTrackPosts(id: $id) {
    trackName
    externalUrl
    text
    vote
    timeSubmitted
    user {
      username
      profilePicture
      id
    }
  }
}
    `;

/**
 * __useGetTrackPostsQuery__
 *
 * To run a query within a React component, call `useGetTrackPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTrackPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTrackPostsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTrackPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetTrackPostsQuery, GetTrackPostsQueryVariables>) {
  return ApolloReactHooks.useQuery<GetTrackPostsQuery, GetTrackPostsQueryVariables>(GetTrackPostsDocument, baseOptions);
}
export function useGetTrackPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTrackPostsQuery, GetTrackPostsQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<GetTrackPostsQuery, GetTrackPostsQueryVariables>(GetTrackPostsDocument, baseOptions);
}
export type GetTrackPostsQueryHookResult = ReturnType<typeof useGetTrackPostsQuery>;
export type GetTrackPostsLazyQueryHookResult = ReturnType<typeof useGetTrackPostsLazyQuery>;
export type GetTrackPostsQueryResult = ApolloReactCommon.QueryResult<GetTrackPostsQuery, GetTrackPostsQueryVariables>;
export const GetUserPostsDocument = gql`
    query GetUserPosts($id: Float) {
  getUserPosts(id: $id) {
    ... on Playlist {
      id
      playlistPicture
      title
      description
      likes
      likedUsers
      tracks {
        id
        artists
        name
        trackImageUrl
        externalUrl
      }
      timeSubmitted
      user {
        username
        id
        profilePicture
      }
    }
    ... on Poll {
      id
      question
      timeSubmitted
      length
      likes
      likedUsers
      options {
        option
        votes
      }
      user {
        username
        id
        profilePicture
      }
    }
    ... on AlbumPost {
      id
      text
      externalUrl
      artistNames
      rating
      likes
      likedUsers
      imageUrl
      timeSubmitted
      albumId
      albumName
      user {
        username
        id
        profilePicture
      }
    }
    ... on TrackPost {
      id
      text
      artistNames
      externalUrl
      vote
      likes
      likedUsers
      imageUrl
      timeSubmitted
      trackId
      trackName
      user {
        username
        id
        profilePicture
      }
    }
    ... on ThoughtsPost {
      id
      text
      likes
      likedUsers
      imageUrl
      timeSubmitted
      user {
        username
        id
        profilePicture
      }
    }
    ... on ArtistPost {
      id
      text
      imageUrl
      externalUrl
      timeSubmitted
      artistId
      likes
      likedUsers
      artistName
      user {
        username
        id
        profilePicture
      }
    }
  }
}
    `;

/**
 * __useGetUserPostsQuery__
 *
 * To run a query within a React component, call `useGetUserPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserPostsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserPostsQuery, GetUserPostsQueryVariables>) {
  return ApolloReactHooks.useQuery<GetUserPostsQuery, GetUserPostsQueryVariables>(GetUserPostsDocument, baseOptions);
}
export function useGetUserPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserPostsQuery, GetUserPostsQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<GetUserPostsQuery, GetUserPostsQueryVariables>(GetUserPostsDocument, baseOptions);
}
export type GetUserPostsQueryHookResult = ReturnType<typeof useGetUserPostsQuery>;
export type GetUserPostsLazyQueryHookResult = ReturnType<typeof useGetUserPostsLazyQuery>;
export type GetUserPostsQueryResult = ApolloReactCommon.QueryResult<GetUserPostsQuery, GetUserPostsQueryVariables>;
export const SearchPostsDocument = gql`
    query searchPosts($query: String) {
  searchPosts(query: $query) {
    ... on AlbumPost {
      text
      id
      externalUrl
      artistNames
      albumName
      rating
      imageUrl
      timeSubmitted
      albumId
      user {
        username
      }
    }
    ... on TrackPost {
      text
      id
      artistNames
      externalUrl
      trackName
      vote
      imageUrl
      timeSubmitted
      trackId
      user {
        username
      }
    }
    ... on ArtistPost {
      text
      id
      imageUrl
      artistName
      timeSubmitted
      artistId
      user {
        username
      }
    }
  }
}
    `;

/**
 * __useSearchPostsQuery__
 *
 * To run a query within a React component, call `useSearchPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchPostsQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchPostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SearchPostsQuery, SearchPostsQueryVariables>) {
  return ApolloReactHooks.useQuery<SearchPostsQuery, SearchPostsQueryVariables>(SearchPostsDocument, baseOptions);
}
export function useSearchPostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchPostsQuery, SearchPostsQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<SearchPostsQuery, SearchPostsQueryVariables>(SearchPostsDocument, baseOptions);
}
export type SearchPostsQueryHookResult = ReturnType<typeof useSearchPostsQuery>;
export type SearchPostsLazyQueryHookResult = ReturnType<typeof useSearchPostsLazyQuery>;
export type SearchPostsQueryResult = ApolloReactCommon.QueryResult<SearchPostsQuery, SearchPostsQueryVariables>;
export const GetAlbumTracksDocument = gql`
    query getAlbumTracks($id: String) {
  getAlbumTracks(id: $id) {
    items {
      name
      id
      preview_url
      track_number
      artists {
        name
      }
      external_urls {
        spotify
      }
    }
  }
}
    `;

/**
 * __useGetAlbumTracksQuery__
 *
 * To run a query within a React component, call `useGetAlbumTracksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAlbumTracksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAlbumTracksQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAlbumTracksQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetAlbumTracksQuery, GetAlbumTracksQueryVariables>) {
  return ApolloReactHooks.useQuery<GetAlbumTracksQuery, GetAlbumTracksQueryVariables>(GetAlbumTracksDocument, baseOptions);
}
export function useGetAlbumTracksLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAlbumTracksQuery, GetAlbumTracksQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<GetAlbumTracksQuery, GetAlbumTracksQueryVariables>(GetAlbumTracksDocument, baseOptions);
}
export type GetAlbumTracksQueryHookResult = ReturnType<typeof useGetAlbumTracksQuery>;
export type GetAlbumTracksLazyQueryHookResult = ReturnType<typeof useGetAlbumTracksLazyQuery>;
export type GetAlbumTracksQueryResult = ApolloReactCommon.QueryResult<GetAlbumTracksQuery, GetAlbumTracksQueryVariables>;
export const GetArtistAlbumsDocument = gql`
    query getArtistAlbums($id: String!) {
  getArtistAlbums(id: $id) {
    items {
      id
      name
      type
      images {
        url
      }
    }
  }
}
    `;

/**
 * __useGetArtistAlbumsQuery__
 *
 * To run a query within a React component, call `useGetArtistAlbumsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArtistAlbumsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArtistAlbumsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetArtistAlbumsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetArtistAlbumsQuery, GetArtistAlbumsQueryVariables>) {
  return ApolloReactHooks.useQuery<GetArtistAlbumsQuery, GetArtistAlbumsQueryVariables>(GetArtistAlbumsDocument, baseOptions);
}
export function useGetArtistAlbumsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetArtistAlbumsQuery, GetArtistAlbumsQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<GetArtistAlbumsQuery, GetArtistAlbumsQueryVariables>(GetArtistAlbumsDocument, baseOptions);
}
export type GetArtistAlbumsQueryHookResult = ReturnType<typeof useGetArtistAlbumsQuery>;
export type GetArtistAlbumsLazyQueryHookResult = ReturnType<typeof useGetArtistAlbumsLazyQuery>;
export type GetArtistAlbumsQueryResult = ApolloReactCommon.QueryResult<GetArtistAlbumsQuery, GetArtistAlbumsQueryVariables>;
export const GetArtistTopTracksDocument = gql`
    query getArtistTopTracks($id: String!) {
  getArtistTopTracks(id: $id) {
    tracks {
      id
      name
      artists {
        name
      }
      preview_url
      album {
        images {
          url
        }
      }
    }
  }
}
    `;

/**
 * __useGetArtistTopTracksQuery__
 *
 * To run a query within a React component, call `useGetArtistTopTracksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArtistTopTracksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArtistTopTracksQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetArtistTopTracksQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetArtistTopTracksQuery, GetArtistTopTracksQueryVariables>) {
  return ApolloReactHooks.useQuery<GetArtistTopTracksQuery, GetArtistTopTracksQueryVariables>(GetArtistTopTracksDocument, baseOptions);
}
export function useGetArtistTopTracksLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetArtistTopTracksQuery, GetArtistTopTracksQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<GetArtistTopTracksQuery, GetArtistTopTracksQueryVariables>(GetArtistTopTracksDocument, baseOptions);
}
export type GetArtistTopTracksQueryHookResult = ReturnType<typeof useGetArtistTopTracksQuery>;
export type GetArtistTopTracksLazyQueryHookResult = ReturnType<typeof useGetArtistTopTracksLazyQuery>;
export type GetArtistTopTracksQueryResult = ApolloReactCommon.QueryResult<GetArtistTopTracksQuery, GetArtistTopTracksQueryVariables>;
export const GetGenresDocument = gql`
    query getGenres {
  getGenres {
    genres
  }
}
    `;

/**
 * __useGetGenresQuery__
 *
 * To run a query within a React component, call `useGetGenresQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGenresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGenresQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetGenresQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetGenresQuery, GetGenresQueryVariables>) {
  return ApolloReactHooks.useQuery<GetGenresQuery, GetGenresQueryVariables>(GetGenresDocument, baseOptions);
}
export function useGetGenresLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetGenresQuery, GetGenresQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<GetGenresQuery, GetGenresQueryVariables>(GetGenresDocument, baseOptions);
}
export type GetGenresQueryHookResult = ReturnType<typeof useGetGenresQuery>;
export type GetGenresLazyQueryHookResult = ReturnType<typeof useGetGenresLazyQuery>;
export type GetGenresQueryResult = ApolloReactCommon.QueryResult<GetGenresQuery, GetGenresQueryVariables>;
export const SearchSpotifyDocument = gql`
    query searchSpotify($type: String!, $query: String!) {
  search(type: $type, query: $query) {
    ... on AlbumSearchResult {
      albums {
        items {
          id
          name
          type
          release_date
          artists {
            name
          }
          images {
            url
          }
          external_urls {
            spotify
          }
        }
      }
    }
    ... on ArtistSearchResult {
      artists {
        items {
          id
          type
          name
          images {
            url
          }
          external_urls {
            spotify
          }
        }
      }
    }
    ... on TrackSearchResult {
      tracks {
        items {
          id
          name
          type
          album {
            name
            images {
              url
            }
          }
          artists {
            name
          }
          external_urls {
            spotify
          }
        }
      }
    }
  }
}
    `;

/**
 * __useSearchSpotifyQuery__
 *
 * To run a query within a React component, call `useSearchSpotifyQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchSpotifyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchSpotifyQuery({
 *   variables: {
 *      type: // value for 'type'
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchSpotifyQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SearchSpotifyQuery, SearchSpotifyQueryVariables>) {
  return ApolloReactHooks.useQuery<SearchSpotifyQuery, SearchSpotifyQueryVariables>(SearchSpotifyDocument, baseOptions);
}
export function useSearchSpotifyLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchSpotifyQuery, SearchSpotifyQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<SearchSpotifyQuery, SearchSpotifyQueryVariables>(SearchSpotifyDocument, baseOptions);
}
export type SearchSpotifyQueryHookResult = ReturnType<typeof useSearchSpotifyQuery>;
export type SearchSpotifyLazyQueryHookResult = ReturnType<typeof useSearchSpotifyLazyQuery>;
export type SearchSpotifyQueryResult = ApolloReactCommon.QueryResult<SearchSpotifyQuery, SearchSpotifyQueryVariables>;
export const EditFirstLoginDocument = gql`
    mutation editFirstLogin {
  editFirstLogin
}
    `;
export type EditFirstLoginMutationFn = ApolloReactCommon.MutationFunction<EditFirstLoginMutation, EditFirstLoginMutationVariables>;

/**
 * __useEditFirstLoginMutation__
 *
 * To run a mutation, you first call `useEditFirstLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditFirstLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editFirstLoginMutation, { data, loading, error }] = useEditFirstLoginMutation({
 *   variables: {
 *   },
 * });
 */
export function useEditFirstLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditFirstLoginMutation, EditFirstLoginMutationVariables>) {
  return ApolloReactHooks.useMutation<EditFirstLoginMutation, EditFirstLoginMutationVariables>(EditFirstLoginDocument, baseOptions);
}
export type EditFirstLoginMutationHookResult = ReturnType<typeof useEditFirstLoginMutation>;
export type EditFirstLoginMutationResult = ApolloReactCommon.MutationResult<EditFirstLoginMutation>;
export type EditFirstLoginMutationOptions = ApolloReactCommon.BaseMutationOptions<EditFirstLoginMutation, EditFirstLoginMutationVariables>;
export const EditUserGenresDocument = gql`
    mutation editUserGenres($data: EditUserInput!) {
  editUserGenres(data: $data)
}
    `;
export type EditUserGenresMutationFn = ApolloReactCommon.MutationFunction<EditUserGenresMutation, EditUserGenresMutationVariables>;

/**
 * __useEditUserGenresMutation__
 *
 * To run a mutation, you first call `useEditUserGenresMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUserGenresMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUserGenresMutation, { data, loading, error }] = useEditUserGenresMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEditUserGenresMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditUserGenresMutation, EditUserGenresMutationVariables>) {
  return ApolloReactHooks.useMutation<EditUserGenresMutation, EditUserGenresMutationVariables>(EditUserGenresDocument, baseOptions);
}
export type EditUserGenresMutationHookResult = ReturnType<typeof useEditUserGenresMutation>;
export type EditUserGenresMutationResult = ApolloReactCommon.MutationResult<EditUserGenresMutation>;
export type EditUserGenresMutationOptions = ApolloReactCommon.BaseMutationOptions<EditUserGenresMutation, EditUserGenresMutationVariables>;
export const EditUserNamesDocument = gql`
    mutation editUserNames($data: EditUserInput!) {
  editUserNames(data: $data)
}
    `;
export type EditUserNamesMutationFn = ApolloReactCommon.MutationFunction<EditUserNamesMutation, EditUserNamesMutationVariables>;

/**
 * __useEditUserNamesMutation__
 *
 * To run a mutation, you first call `useEditUserNamesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUserNamesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUserNamesMutation, { data, loading, error }] = useEditUserNamesMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useEditUserNamesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EditUserNamesMutation, EditUserNamesMutationVariables>) {
  return ApolloReactHooks.useMutation<EditUserNamesMutation, EditUserNamesMutationVariables>(EditUserNamesDocument, baseOptions);
}
export type EditUserNamesMutationHookResult = ReturnType<typeof useEditUserNamesMutation>;
export type EditUserNamesMutationResult = ApolloReactCommon.MutationResult<EditUserNamesMutation>;
export type EditUserNamesMutationOptions = ApolloReactCommon.BaseMutationOptions<EditUserNamesMutation, EditUserNamesMutationVariables>;
export const FacebookSsoDocument = gql`
    mutation FacebookSSO($data: SSORegisterInput!) {
  facebookSSO(data: $data) {
    accessToken
  }
}
    `;
export type FacebookSsoMutationFn = ApolloReactCommon.MutationFunction<FacebookSsoMutation, FacebookSsoMutationVariables>;

/**
 * __useFacebookSsoMutation__
 *
 * To run a mutation, you first call `useFacebookSsoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFacebookSsoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [facebookSsoMutation, { data, loading, error }] = useFacebookSsoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useFacebookSsoMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<FacebookSsoMutation, FacebookSsoMutationVariables>) {
  return ApolloReactHooks.useMutation<FacebookSsoMutation, FacebookSsoMutationVariables>(FacebookSsoDocument, baseOptions);
}
export type FacebookSsoMutationHookResult = ReturnType<typeof useFacebookSsoMutation>;
export type FacebookSsoMutationResult = ApolloReactCommon.MutationResult<FacebookSsoMutation>;
export type FacebookSsoMutationOptions = ApolloReactCommon.BaseMutationOptions<FacebookSsoMutation, FacebookSsoMutationVariables>;
export const FollowOtherUserDocument = gql`
    mutation followOtherUser($id: Float, $follow: Boolean) {
  followOtherUser(id: $id, follow: $follow) {
    id
    username
    email
    profilePicture
    followers
    following
    topAlbums {
      name
      imageUrl
      id
      artistNames
    }
    topArtists {
      name
      imageUrl
      id
    }
    topTracks {
      name
      imageUrl
      id
      artistNames
    }
  }
}
    `;
export type FollowOtherUserMutationFn = ApolloReactCommon.MutationFunction<FollowOtherUserMutation, FollowOtherUserMutationVariables>;

/**
 * __useFollowOtherUserMutation__
 *
 * To run a mutation, you first call `useFollowOtherUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowOtherUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followOtherUserMutation, { data, loading, error }] = useFollowOtherUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      follow: // value for 'follow'
 *   },
 * });
 */
export function useFollowOtherUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<FollowOtherUserMutation, FollowOtherUserMutationVariables>) {
  return ApolloReactHooks.useMutation<FollowOtherUserMutation, FollowOtherUserMutationVariables>(FollowOtherUserDocument, baseOptions);
}
export type FollowOtherUserMutationHookResult = ReturnType<typeof useFollowOtherUserMutation>;
export type FollowOtherUserMutationResult = ApolloReactCommon.MutationResult<FollowOtherUserMutation>;
export type FollowOtherUserMutationOptions = ApolloReactCommon.BaseMutationOptions<FollowOtherUserMutation, FollowOtherUserMutationVariables>;
export const GoogleSsoDocument = gql`
    mutation GoogleSSO($data: SSORegisterInput!) {
  googleSSO(data: $data) {
    accessToken
  }
}
    `;
export type GoogleSsoMutationFn = ApolloReactCommon.MutationFunction<GoogleSsoMutation, GoogleSsoMutationVariables>;

/**
 * __useGoogleSsoMutation__
 *
 * To run a mutation, you first call `useGoogleSsoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGoogleSsoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [googleSsoMutation, { data, loading, error }] = useGoogleSsoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGoogleSsoMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GoogleSsoMutation, GoogleSsoMutationVariables>) {
  return ApolloReactHooks.useMutation<GoogleSsoMutation, GoogleSsoMutationVariables>(GoogleSsoDocument, baseOptions);
}
export type GoogleSsoMutationHookResult = ReturnType<typeof useGoogleSsoMutation>;
export type GoogleSsoMutationResult = ApolloReactCommon.MutationResult<GoogleSsoMutation>;
export type GoogleSsoMutationOptions = ApolloReactCommon.BaseMutationOptions<GoogleSsoMutation, GoogleSsoMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!, $expoToken: String!) {
  login(email: $email, password: $password, expoToken: $expoToken) {
    accessToken
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
  return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
  return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($data: RegisterInput!) {
  register(data: $data)
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
  return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdateUserTopFiveDocument = gql`
    mutation updateUserTopFive($data: TopFiveArrayInput) {
  updateUserTopFive(data: $data) {
    id
    username
    email
    topAlbums {
      name
      imageUrl
      id
      artistNames
    }
    topArtists {
      name
      imageUrl
      id
    }
    topTracks {
      name
      imageUrl
      id
      artistNames
    }
  }
}
    `;
export type UpdateUserTopFiveMutationFn = ApolloReactCommon.MutationFunction<UpdateUserTopFiveMutation, UpdateUserTopFiveMutationVariables>;

/**
 * __useUpdateUserTopFiveMutation__
 *
 * To run a mutation, you first call `useUpdateUserTopFiveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserTopFiveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserTopFiveMutation, { data, loading, error }] = useUpdateUserTopFiveMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserTopFiveMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserTopFiveMutation, UpdateUserTopFiveMutationVariables>) {
  return ApolloReactHooks.useMutation<UpdateUserTopFiveMutation, UpdateUserTopFiveMutationVariables>(UpdateUserTopFiveDocument, baseOptions);
}
export type UpdateUserTopFiveMutationHookResult = ReturnType<typeof useUpdateUserTopFiveMutation>;
export type UpdateUserTopFiveMutationResult = ApolloReactCommon.MutationResult<UpdateUserTopFiveMutation>;
export type UpdateUserTopFiveMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserTopFiveMutation, UpdateUserTopFiveMutationVariables>;
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  getCurrentUser {
    id
    name
    username
    googleId
    facebookId
    email
    profilePicture
    followers
    following
    genres
    firstLogin
    topAlbums {
      name
      imageUrl
      id
      artistNames
    }
    topArtists {
      name
      imageUrl
      id
    }
    topTracks {
      name
      imageUrl
      id
      artistNames
    }
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
  return ApolloReactHooks.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, baseOptions);
}
export function useGetCurrentUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, baseOptions);
}
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = ApolloReactCommon.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetFollowingorFollowersDocument = gql`
    query getFollowingorFollowers($id: Float, $request: String) {
  getFollowingorFollowers(id: $id, request: $request) {
    id
    username
    email
    profilePicture
  }
}
    `;

/**
 * __useGetFollowingorFollowersQuery__
 *
 * To run a query within a React component, call `useGetFollowingorFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFollowingorFollowersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFollowingorFollowersQuery({
 *   variables: {
 *      id: // value for 'id'
 *      request: // value for 'request'
 *   },
 * });
 */
export function useGetFollowingorFollowersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetFollowingorFollowersQuery, GetFollowingorFollowersQueryVariables>) {
  return ApolloReactHooks.useQuery<GetFollowingorFollowersQuery, GetFollowingorFollowersQueryVariables>(GetFollowingorFollowersDocument, baseOptions);
}
export function useGetFollowingorFollowersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetFollowingorFollowersQuery, GetFollowingorFollowersQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<GetFollowingorFollowersQuery, GetFollowingorFollowersQueryVariables>(GetFollowingorFollowersDocument, baseOptions);
}
export type GetFollowingorFollowersQueryHookResult = ReturnType<typeof useGetFollowingorFollowersQuery>;
export type GetFollowingorFollowersLazyQueryHookResult = ReturnType<typeof useGetFollowingorFollowersLazyQuery>;
export type GetFollowingorFollowersQueryResult = ApolloReactCommon.QueryResult<GetFollowingorFollowersQuery, GetFollowingorFollowersQueryVariables>;
export const GetOtherUserDocument = gql`
    query getOtherUser($id: Float) {
  getOtherUser(id: $id) {
    id
    username
    email
    profilePicture
    followers
    following
    topAlbums {
      name
      imageUrl
      id
      artistNames
    }
    topArtists {
      name
      imageUrl
      id
    }
    topTracks {
      name
      imageUrl
      id
      artistNames
    }
  }
}
    `;

/**
 * __useGetOtherUserQuery__
 *
 * To run a query within a React component, call `useGetOtherUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOtherUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOtherUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOtherUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetOtherUserQuery, GetOtherUserQueryVariables>) {
  return ApolloReactHooks.useQuery<GetOtherUserQuery, GetOtherUserQueryVariables>(GetOtherUserDocument, baseOptions);
}
export function useGetOtherUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetOtherUserQuery, GetOtherUserQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<GetOtherUserQuery, GetOtherUserQueryVariables>(GetOtherUserDocument, baseOptions);
}
export type GetOtherUserQueryHookResult = ReturnType<typeof useGetOtherUserQuery>;
export type GetOtherUserLazyQueryHookResult = ReturnType<typeof useGetOtherUserLazyQuery>;
export type GetOtherUserQueryResult = ApolloReactCommon.QueryResult<GetOtherUserQuery, GetOtherUserQueryVariables>;
export const SearchUserDocument = gql`
    query searchUser($query: String) {
  searchUser(query: $query) {
    username
    id
    profilePicture
  }
}
    `;

/**
 * __useSearchUserQuery__
 *
 * To run a query within a React component, call `useSearchUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUserQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SearchUserQuery, SearchUserQueryVariables>) {
  return ApolloReactHooks.useQuery<SearchUserQuery, SearchUserQueryVariables>(SearchUserDocument, baseOptions);
}
export function useSearchUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchUserQuery, SearchUserQueryVariables>) {
  return ApolloReactHooks.useLazyQuery<SearchUserQuery, SearchUserQueryVariables>(SearchUserDocument, baseOptions);
}
export type SearchUserQueryHookResult = ReturnType<typeof useSearchUserQuery>;
export type SearchUserLazyQueryHookResult = ReturnType<typeof useSearchUserLazyQuery>;
export type SearchUserQueryResult = ApolloReactCommon.QueryResult<SearchUserQuery, SearchUserQueryVariables>;

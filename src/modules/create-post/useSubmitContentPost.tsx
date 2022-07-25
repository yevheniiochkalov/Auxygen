import {
  AlbumPostInput,
  ArtistPostInput,
  GetPostsDocument,
  ThoughtsPostInput,
  GetPostsOfFollowingDocument,
  GetUserPostsDocument,
  TrackPostInput,
  useCreateAlbumPostMutation,
  useCreateArtistPostMutation,
  useCreateTrackPostMutation,
  useGetCurrentUserQuery,
  useCreateThoughtsPostMutation,
} from '../../generated-components/apolloComponents';
import { useStoreState } from '../../state-management/hooks';

type useSubmitContentType = () => () => any;

export const useSubmitContentPost: useSubmitContentType = () => {
  const content = useStoreState((state) => state.createPost.content);
  const postType = useStoreState((state) => state.createPost.postType);
  const currUser = useGetCurrentUserQuery();
  const id: number = currUser ? +currUser.data.getCurrentUser.id : 1;

  const [createArtistPost] = useCreateArtistPostMutation();
  const [createAlbumPost] = useCreateAlbumPostMutation();
  const [createTrackPost] = useCreateTrackPostMutation();
  const [createThoughtsPost] = useCreateThoughtsPostMutation();

  const submitArtistPost = async () => {
    const {
      name: artistName,
      imageUrl,
      id: artistId,
      text,
      externalUrl,
    } = content;
    const data: ArtistPostInput = {
      text,
      artistName,
      imageUrl,
      artistId,
      externalUrl,
    };
    try {
      const response = await createArtistPost({
        variables: { data },
        refetchQueries: [
          { query: GetPostsDocument },
          { query: GetPostsOfFollowingDocument },
          { query: GetUserPostsDocument, variables: { id } },
        ],
      });
      return response;
    } catch (err) {
      return err;
    }
  };

  const submitThoughtsPost = async () => {
    const {
      text,
    } = content;

    const data: ThoughtsPostInput = {
      text,
    };
    try {
      const response = await createThoughtsPost({
        variables: { data },
        refetchQueries: [
          { query: GetPostsDocument },
          { query: GetPostsOfFollowingDocument },
          { query: GetUserPostsDocument, variables: { id } },
        ],
      });
      return response;
    } catch (err) {
      return err;
    }
  };

  const submitTrackPost = async () => {
    const {
      name: trackName,
      id: trackId,
      imageUrl,
      vote,
      text,
      artistNames,
      externalUrl,
    } = content;

    const data: TrackPostInput = {
      trackName,
      trackId,
      text,
      imageUrl,
      vote,
      artistNames,
      externalUrl,
    };
    try {
      const response = await createTrackPost({
        variables: { data },
        refetchQueries: [
          { query: GetPostsDocument },
          { query: GetPostsOfFollowingDocument },
          { query: GetUserPostsDocument, variables: { id } },
        ],
      });
      return response;
    } catch (err) {
      return err;
    }
  };

  const submitAlbumPost = async () => {
    const {
      name: albumName,
      id: albumId,
      imageUrl,
      rating,
      artistNames,
      text,
      externalUrl,
    } = content;
    const data: AlbumPostInput = {
      albumId,
      albumName,
      text,
      imageUrl,
      rating,
      artistNames,
      externalUrl,
    };
    try {
      const response = await createAlbumPost({
        variables: { data },
        refetchQueries: [
          { query: GetPostsDocument },
          { query: GetPostsOfFollowingDocument },
          { query: GetUserPostsDocument, variables: { id } },
        ],
      });
      return response;
    } catch (err) {
      return err;
    }
  };

  const submitContent = () => {
    const finalResponse = postType === 'track'
      ? submitTrackPost()
      : postType === 'album'
        ? submitAlbumPost()
        : postType === 'thoughts'
          ? submitThoughtsPost()
          : submitArtistPost();

    return finalResponse;
  };

  return submitContent;
};

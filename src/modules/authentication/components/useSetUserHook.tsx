import { useEffect } from 'react';

import { useGetCurrentUserQuery } from '../../../generated-components/apolloComponents';
import {
  useStoreActions,
  useStoreState,
} from '../../../state-management/hooks';

type useSetUserHookType = () => void;

export const useSetUserHook: useSetUserHookType = () => {
  const setUser = useStoreActions((actions) => actions.user.setUser);
  const userState = useStoreState((state) => state.user.user);
  const { data, loading, error } = useGetCurrentUserQuery();

  useEffect(() => {
    setCurrentUser();
  }, [data, loading, error]);

  const setCurrentUser = async () => {
    if (error) {
      return false;
    }

    if (!data) {
      return false;
    }

    try {
      const thisData = data.getCurrentUser;

      setUser({
        ...userState,
        id: +thisData.id,
        email: thisData.email,
        username: thisData.username,
        googleId: thisData.googleId,
        facebookId: thisData.facebookId,
        firstLogin: thisData.firstLogin,
        profilePicture: thisData.profilePicture,
        followers: thisData.followers,
        topArtists: thisData.topArtists,
        topAlbums: thisData.topAlbums,
        topTracks: thisData.topTracks,
      });
    } catch (error) {
      return false;
    }
    return true;
  };
  return;
};

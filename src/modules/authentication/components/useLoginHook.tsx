import React, { useContext } from 'react';
import { State } from 'react-native-gesture-handler';
import { AuthContext } from '../../../utils/AuthProvider';
import { setAccessToken } from '../../../utils/accessToken';
import { useStoreActions } from '../../../state-management/hooks';
import userModel, {
  UserTypeInterface,
} from '../../../state-management/model/userModel';
import { useSetUserHook } from './useSetUserHook';
import { client } from '../../../index';
import { useGetCurrentUserQuery } from '../../../generated-components/apolloComponents';
import { deleteExpoToken } from '../../../generated-components/deleteExpoToken';

interface LoginHookProps {}

type useLoginHookType = () => [
  (accessToken: string, userData?: UserTypeInterface) => void,
  () => void
];

export const useLoginHook: useLoginHookType = () => {
  //   const { setUser } = useContext(AuthContext);
  const setUser = useStoreActions((actions) => actions.user.setUser);
  const clearUser = useStoreActions((actions) => actions.user.clearUser);
  // calling this so it will be on the cache

  const setLoginUser = (myToken: string, userData?: UserTypeInterface) => {
    setAccessToken(myToken);
    const payload = userData
      ? {
        accesToken: myToken,
        id: userData.id,
        email: userData.email,
        username: userData.username,
      }
      : { accessToken: myToken };
    setUser(payload);
    // setUser(accessToken);
    // setCurrentUser();
  };

  const setLogoutUser = async () => {
    await deleteExpoToken();
    setAccessToken('');
    clearUser();
    // clear the apollo cache
    await client.clearStore();
    client.resetStore();

    // setUser(accessToken);
  };

  return [setLoginUser, setLogoutUser];
};

import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { RootStack } from '../navigation/app/RootStack';
import { AuthStack } from '../navigation/auth/AuthStack';
import { useStoreState } from '../state-management/hooks';

import { navigationRef } from './RootNavigation';
import { getAccessToken } from './accessToken';
import { StyledColumnView } from '../styled-components/ReusedUI';
import { Spinner } from './Spinner';

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = ({}) => {
  const user = useStoreState((state) => state.user.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // check if user is logged in or not --> not doing anything rn
    const accessToken = getAccessToken();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <StyledColumnView>
        <Spinner />
      </StyledColumnView>
    );
  }
  return (
    <NavigationContainer ref={navigationRef}>
      {user.accessToken ? <RootStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

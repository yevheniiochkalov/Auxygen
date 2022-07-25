import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { MenuProvider } from 'react-native-popup-menu';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { StoreProvider } from 'easy-peasy';
import React, { useMemo, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import { ThemeProvider } from 'styled-components';
import { Text } from 'react-native';
import Constants from 'expo-constants';
import getEnvVars from '../environment';
import introspectionQueryResultData from '../fragmentTypes.json';
import store from './state-management/store';
import { getAccessToken } from './utils/accessToken';
import { AppWithHeaders } from './utils/AppWithHeaders';
import { AuthContext } from './utils/AuthProvider';
import { theme, SCtheme } from './styled-components/theme';

const { apiUrl } = getEnvVars();

// for queries involving unions in shema
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const cache = new InMemoryCache({ fragmentMatcher });

export const client = new ApolloClient({
  cache,
  uri: `${apiUrl}/graphql`,
  credentials: 'include',
  request: (operation) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      operation.setContext({
        headers: {
          authorization: `bearer ${accessToken}`,
        },
      });
    }
  },
});

interface ProvidersProps {}

export const Providers: React.FC<ProvidersProps> = () => {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <StoreProvider store={store}>
      <AuthContext.Provider value={value as any}>
        <ApolloProvider client={client}>
          <PaperProvider theme={theme}>
            <ThemeProvider theme={SCtheme}>
              <MenuProvider>
                <AppWithHeaders />
              </MenuProvider>
            </ThemeProvider>
          </PaperProvider>
        </ApolloProvider>
      </AuthContext.Provider>
    </StoreProvider>
  );
};

import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Dimensions, ImageBackground, Platform, Text,
} from 'react-native';

import { TabBar, TabView } from 'react-native-tab-view';
import { TrackSearchType } from './search-types/TrackSearchType';
import { AlbumSearchType } from './search-types/AlbumSearchType';
import { PostSearchType } from './search-types/PostSearchType';
import { UserSearchType } from './search-types/UserSearchType';
import { ArtistSearchType } from './search-types/ArtistSearchType';

import { StyledColumnView } from '../../styled-components/ReusedUI';
import { HomeStackNavProps } from '../../navigation/app/home/HomeParamList';
import { styles } from '../../styled-components/StyleSheet';
import NiceSearchbar from '../../styled-components/StylishComponents';
import { cyanB, grayPlaceholder } from '../../styled-components/colors';

interface SearchViewProps {}

const initialLayout = { width: Dimensions.get('window').width };

export const SearchView: React.FC<HomeStackNavProps<'SearchPage'>> = ({
  navigation,
  route,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: 'first', title: 'Artists' },
    { key: 'second', title: 'Tracks' },
    { key: 'third', title: 'Albums' },
    { key: 'four', title: 'Users' },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={{
        backgroundColor: 'transparent',
        marginTop: 20,
      }}
      indicatorStyle={{
        backgroundColor: 'red',
        height: 0,
      }}
      renderLabel={({ route, focused, color }) => (
        <Text
          style={{
            fontFamily: 'Montserrat_400Regular',
            marginRight: -20,
            marginLeft: -20,
            letterSpacing: 0.8,
            fontSize: 12,
            color: focused ? '#ffffff' : grayPlaceholder,
            textTransform: 'uppercase',
            borderWidth: 1,
            borderColor: focused ? cyanB : grayPlaceholder,
            padding: 10,
            borderRadius: 19,
          }}
        >
          {route.title}
        </Text>
      )}
    />
  );

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return (
          <ArtistSearchType
            searchQuery={searchQuery}
            navigation={navigation}
            route={route}
          />
        );
      case 'second':
        return (
          <TrackSearchType
            searchQuery={searchQuery}
            navigation={navigation}
            route={route}
          />
        );
      case 'third':
        return (
          <AlbumSearchType
            searchQuery={searchQuery}
            navigation={navigation}
            route={route}
          />
        );
      case 'four':
        return (
          <UserSearchType
            searchQuery={searchQuery}
            navigation={navigation}
            route={route}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <ImageBackground
      style={styles.wavyBackgroundStyle}
      imageStyle={styles.wavyBackgroundImageStyle}
      source={require('../../local-assets/wavy.png')}
    >
      <ScrollView contentContainerStyle={{
        paddingBottom: Platform.OS === 'ios' ? 180 : 120,
      }}
      >
        <StyledColumnView>
          <NiceSearchbar
            placeholder="Search"
            onChangeText={(searchQuery) => setSearchQuery(searchQuery)}
            value={searchQuery}
          />
          {searchQuery ? (
            <TabView
              renderTabBar={renderTabBar}
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={initialLayout}
            />
          ) : (
            <></>
          )}
        </StyledColumnView>
      </ScrollView>
    </ImageBackground>
  );
};

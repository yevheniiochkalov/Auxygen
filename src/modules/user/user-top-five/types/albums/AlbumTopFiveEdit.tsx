import React from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';

import { TopFiveEditProps } from '../../UserTopFiveView';
import { AlbumTopFiveQuery } from './AlbumTopFiveQuery';

export const AlbumTopFiveEdit: React.FC<TopFiveEditProps> = ({
  array,
  setArray,
  searchQuery,
  setSearchQuery,
  arrayIndex,
  setShowSearch,
  type,
}) => (
  <View>
    <Searchbar
      placeholder="Search"
      onChangeText={(searchQuery) => {
        setSearchQuery(searchQuery);
      }}
      value={searchQuery}
    />
    <AlbumTopFiveQuery
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      array={array}
      setArray={setArray}
      arrayIndex={arrayIndex}
      setShowSearch={setShowSearch}
      type={type}
    />
  </View>
);


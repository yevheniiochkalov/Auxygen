import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Chip, Searchbar, Title } from 'react-native-paper';
import { TopFiveEditProps } from '../../UserTopFiveView';
import { TrackTopFiveQuery } from './TrackTopFiveQuery';

export const TrackTopFiveEdit: React.FC<TopFiveEditProps> = ({
  array,
  setArray,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View>
      <Title>Choose Top Five Tracks</Title>
      <Searchbar
        placeholder="Search"
        onChangeText={(searchQuery) => setSearchQuery(searchQuery)}
        value={searchQuery}
      />
      <TrackTopFiveQuery
        searchQuery={searchQuery}
        array={array}
        setArray={setArray}
      />
      <FlatList
        data={array}
        keyExtractor={(item, index) => (item.name + index).toString()}
        renderItem={({ item }) => (
          <Chip
            onClose={() => {
              const filteredArray = array.filter((el) => el.name !== item.name);
              setArray(filteredArray);
            }}
          >
            {item.name}
          </Chip>
        )}
      />
    </View>
  );
};

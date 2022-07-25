import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Chip, Searchbar, Title } from 'react-native-paper';
import { ArtistTopFiveQuery } from './ArtistTopFiveQuery';
import { TopFiveEditProps } from '../../UserTopFiveView';

export const ArtistTopFiveEdit: React.FC<TopFiveEditProps> = ({
  array,
  setArray,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View>
      <Title>Choose Top Five Artists</Title>
      <Searchbar
        placeholder="Search"
        onChangeText={(searchQuery) => setSearchQuery(searchQuery)}
        value={searchQuery}
      />
      <ArtistTopFiveQuery
        searchQuery={searchQuery}
        array={array}
        setArray={setArray}
      />
      <FlatList
        contentContainerStyle={{
          justifyContent: 'space-around',
          flexDirection: 'column',
        }}
        data={array}
        keyExtractor={(item, index) => item.id}
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

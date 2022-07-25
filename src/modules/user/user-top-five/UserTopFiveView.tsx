import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { AlbumTopFiveWrapper } from './types/albums/AlbumTopFiveWrapper';
import { HomeParamList } from '../../../navigation/app/home/HomeParamList';

export interface TopFiveEditProps {
  array: TopFiveArrayType[];
  setArray: React.Dispatch<React.SetStateAction<TopFiveArrayType[]>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  arrayIndex: number;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
}

export interface TopFiveWrapperProps {
  id: number;
  type: string;
  navigation: StackNavigationProp<HomeParamList, 'UserPage'>;
}

export type TopFiveArrayType = {
  id?: string;
  name?: string;
  imageUrl?: string;
  artistNames?: string[];
};

interface UserTopFiveViewProps {
  id: number;
  navigation: StackNavigationProp<HomeParamList, 'UserPage'>;
}

export const UserTopFiveView: React.FC<UserTopFiveViewProps> = ({
  id,
  navigation,
}) => (
  <ScrollView
    style={{
      paddingHorizontal: 20,
      // paddingBottom: 200,
    }}
  >
    <View style={styles.wrap}>
      <Text style={styles.sectionTitle}>Top 5 Albums
      </Text>

      <AlbumTopFiveWrapper id={id} type="album" navigation={navigation} />

      <Text style={styles.sectionTitle}>Top 5 Artists
      </Text>
      <AlbumTopFiveWrapper id={id} type="artist" navigation={navigation} />

      <Text style={styles.sectionTitle}>Top 5 Songs
      </Text>
      <AlbumTopFiveWrapper id={id} type="track" navigation={navigation} />
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 19,
    marginBottom: 30,
    fontFamily: 'Montserrat_800ExtraBold',
    color: '#ffffff',
  },
});

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button, Title } from 'react-native-paper';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { styles } from './styles';
import { cyanB, grayPlaceholder } from '../../../styled-components/colors';

interface PickGenresProps {
  selectedGenres: any,
  updateSelectedGenres: any,
  data: any,
  saveGenresResults: () => void,
  fromSettings: boolean,
}

export const PickGenres: React.FC<PickGenresProps> = ({
  selectedGenres,
  updateSelectedGenres,
  data,
  fromSettings,
  saveGenresResults,
}) => (
  <View style={{
    paddingBottom: 100,
    width: '100%',
  }}
  >
    <View style={styles.genresContainer}>
      <Text
        style={styles.genreTitle}
      >
        Pick Your Favorite Genres
      </Text>

      {fromSettings && (
        <Button
          onPress={saveGenresResults}
          mode="contained"
          style={{
            marginBottom: 15,
          }}
          contentStyle={{
            width: 200,
          }}
          labelStyle={{
            fontSize: 16,
            fontFamily: 'Montserrat_500Medium',
          }}
        >
          Save
        </Button>
      )}

      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          padding: 10,
          paddingHorizontal: 35,
          justifyContent: 'center',
        }}
      >
        {data?.getGenres.genres.map((item) => (
          <TouchableOpacity
            style={selectedGenres.includes(item)
              ? genresStyles.activeToggleButton
              : genresStyles.toggleButton}
            onPress={() => updateSelectedGenres(item)}
          >
            <Text
              style={selectedGenres.includes(item)
                ? genresStyles.activeLabel
                : genresStyles.label}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

    </View>
  </View>
);

const genresStyles = StyleSheet.create({
  toggleButton: {
    padding: 10,
    borderColor: grayPlaceholder,
    borderWidth: 1,
    marginRight: 8,
    borderRadius: 50,
    marginBottom: 12,
  },
  activeToggleButton: {
    padding: 10,
    borderColor: cyanB,
    borderWidth: 1,
    marginRight: 8,
    borderRadius: 50,
    marginBottom: 12,
  },
  label: {
    color: grayPlaceholder,
    fontFamily: 'Montserrat_500Medium',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontSize: 11,

  },
  activeLabel: {
    color: '#ffffff',
    fontFamily: 'Montserrat_500Medium',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontSize: 11,
  },
});

import { StyleSheet } from 'react-native';

import { deepPurpleB, grayPlaceholder, white } from '../../../styled-components/colors';

export const styles = StyleSheet.create({
  screenWrapper: {
    backgroundColor: '#17172B',
    height: '100%',
  },
  option: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  firstOption: {
    borderTopWidth: 0,
  },
  lastOption: {
    borderBottomWidth: 2,
  },
  optionLabel: {
    color: '#ffffff',
    fontFamily: 'Montserrat_500Medium',
    fontSize: 20,
  },

  genresContainer: {
    backgroundColor: '#17172B',
    display: 'flex',
    alignItems: 'center',
  },
  genreTitle: {
    marginBottom: 10,
    color: 'white',
    marginTop: 70,
    fontFamily: 'Montserrat_500Medium',
    fontSize: 20,
  },
  saveButton: {
    borderWidth: 1,
    borderColor: grayPlaceholder,
    maxWidth: 250,
    marginBottom: 20,
    padding: 20,
    paddingVertical: 7,
    backgroundColor: 'transparent',
  },
  activeSaveButton: {
    maxWidth: 250,
    marginBottom: 20,
    paddingVertical: 7,
    padding: 20,

  },
  saveButtonLabel: {
    color: grayPlaceholder,
  },
  activeSaveButtonLabel: {
    color: white,
  },
});

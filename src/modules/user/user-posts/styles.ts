import { StyleSheet } from 'react-native';

import { cyanB, grayPlaceholder } from '../../../styled-components/colors';

export const styles = StyleSheet.create({
  toggleButton: {
    padding: 12,
    borderColor: grayPlaceholder,
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 50,
  },
  activeToggleButton: {
    padding: 12,
    borderColor: cyanB,
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 50,
    // marginBottom: 20,
  },
  label: {
    color: grayPlaceholder,
    fontFamily: 'Montserrat_500Medium',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontSize: 12,

  },
  activeLabel: {
    color: '#ffffff',
    fontFamily: 'Montserrat_500Medium',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingLeft: 20,
    height: 70,
    paddingTop: 10,
    alignItems: 'center',
    // marginBottom: 40
  },
});

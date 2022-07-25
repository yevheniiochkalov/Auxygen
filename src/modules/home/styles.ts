import { StyleSheet } from 'react-native';
import { cyanB, grayPlaceholder } from '../../styled-components/colors';

export const styles = StyleSheet.create({
  card: {
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: '#17172B',
  },

  userContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  userRight: {
    display: 'flex',
    marginLeft: 20,
  },
  username: {
    fontSize: 14,
    fontFamily: 'Montserrat_700Bold',
    color: '#ffffff',
    letterSpacing: 0.8,
    marginBottom: 5,
  },
  timeSubmitted: {
    color: cyanB,
    fontSize: 12,
    fontFamily: 'Montserrat_400Regular',
  },

  postTypeCaption: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 11,
    letterSpacing: 0.8,
  },

  cardTitle: {
    fontSize: 23,
    marginTop: 10,
    marginBottom: 20,
    fontFamily: 'Montserrat_500Medium',
    color: '#ffffff',
    paddingRight: 20,
  },
  cardDescription: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 14,
    color: grayPlaceholder,
    paddingRight: 20,
  },

  pollQuestion: {
    fontSize: 22,
    fontFamily: 'Montserrat_500Medium',
  },

  inactivePollButton: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: grayPlaceholder,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  inactivePollLabel: {
    fontFamily: 'Montserrat_400Regular',
    letterSpacing: 0.7,
    color: grayPlaceholder,
  },
  activePollButtonWrap: {
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 15,
  },
  activePollButton: {
    borderRadius: 50,
    height: 40,
    top: -1.5,
    left: -0.5,
    position: 'absolute',
    backgroundColor: '#3A205A',
  },
  activePollLabel: {
    fontFamily: 'Montserrat_400Regular',
    letterSpacing: 0.7,
    color: '#ffffff',
  },
});

import { StyleSheet, Dimensions } from 'react-native';
import { orange700 } from '../../styled-components/colors';

const { width } = Dimensions.get('window');

export const profileStyles = StyleSheet.create({
  userInfo: {
    display: 'flex',
    flexDirection: 'row',
    paddingRight: 20,
    paddingLeft: 20,
  },
  userInfoRight: {
    display: 'flex',
    width: width - 160,
    padding: 20,
  },
  username: {
    fontSize: 21,
    color: '#ffffff',
    fontFamily: 'Montserrat_600SemiBold',
    letterSpacing: 1,
    marginBottom: 10,
    // flexWrap: 'wrap',
    // flex: 1,
    flexShrink: 1,
  },
  usernameWrap: {
    flexDirection: 'row',

  },
  userCounts: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 30,
  },
  userButtons: {

  },
  countLabel: {
    color: orange700,
    fontFamily: 'Montserrat_400Regular',
    fontSize: 11,
    textTransform: 'uppercase',
  },
  followButtonsWrap: {
    display: 'flex',
    flexDirection: 'row',
  },

  avatar: {
    // marginRight: 20,
  },
  countButton: {
    marginRight: 15,
  },
});

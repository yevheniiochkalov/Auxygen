import { Dimensions, StyleSheet } from 'react-native';
import { cyanB } from '../../styled-components/colors';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  notificationsContainer: {
    margin: 20,
    paddingBottom: 200,
  },
  notificationBox: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(23, 23, 43, 0.75)',
  },
  avatar: {
    marginRight: 15,
  },
  notificationText: {
    color: '#ffffff',
    fontSize: 15,
    fontFamily: 'Montserrat_400Regular',
    marginBottom: 10,
  },
  notificationDate: {
    color: cyanB,
    fontSize: 13,
    fontFamily: 'Montserrat_500Medium',
  },
  notificationSender: {
    color: cyanB,
    fontFamily: 'Montserrat_500Medium',
  },
  groupHeader: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.6)',
  },
  groupTitle: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 18,
    fontFamily: 'Montserrat_400Regular',
  },
  notificationTextWrap: {
    maxWidth: width * 0.7,
  },
});

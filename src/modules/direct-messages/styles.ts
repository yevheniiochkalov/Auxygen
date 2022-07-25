import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginTop: 50,
  },

  row: {
    marginBottom: 10,
    alignItems: 'center',
  },

  avatar: {
    marginRight: 15,
  },

  partnerName: {
    fontFamily: 'Montserrat_500Medium',
    fontSize: 23,
    color: 'white',
  },

  userMessageCard: {
    backgroundColor: '#4527a0',
    borderRadius: 10,
    width: 230,
    alignSelf: 'flex-end',
    padding: 10,
    marginVertical: 10,
    position: 'relative',
  },

  partnerMessageCard: {
    backgroundColor: '#FB5D1B',
    borderRadius: 10,
    width: 230,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    padding: 10,
    marginVertical: 10,
    position: 'relative',
  },

  messageText: {
    color: 'white',
  },

  messageDate: {
    marginTop: 15,
    color: 'rgba(255,255,255,0.6)',
  },
  partnerUnreadMark: {
    position: 'absolute',
    right: 20,
    top: 32,
    zIndex: 10,
    width: 15,
    height: 15,
    backgroundColor: '#FB5D1B',
    borderRadius: 50,
  },
  userUnreadMark: {
    position: 'absolute',
    top: '60%',
    left: -30,
    width: 10,
    height: 10,
    backgroundColor: '#FB5D1B',
    borderRadius: 50,
  },
});

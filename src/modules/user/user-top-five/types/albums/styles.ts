import { StyleSheet } from 'react-native';
import { cyanB } from '../../../../../styled-components/colors';
import { width } from '../../../../../styled-components/theme';

export const styles = StyleSheet.create({
  albumList: {
    display: 'flex',
    flexDirection: 'row',
  },
  albumCard: {
    width: width * 0.33,
    height: width * 0.33,
    position: 'relative',
    marginBottom: 10,
    marginRight: 15,
  },
  largeAlbumCard: {
    width: width * 0.51,
    height: width * 0.51,
    position: 'relative',
    marginBottom: 10,
  },

  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0)',
    zIndex: 1,
    borderRadius: 7,
  },

  albumImg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    marginRight: 10,
    marginBottom: 10,
  },
  largeImg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  coverPlaceholder: {
    borderRadius: 15,
    width: 120,
    height: 120,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#432287',
    alignItems: 'center',
    justifyContent: 'center',
  },
  albumInfo: {
    position: 'absolute',
    bottom: 10,
    zIndex: 2,
    paddingLeft: 15,
    marginRight: 10,
  },
  albumTitle: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    color: '#000',
    padding: 2,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 10,
    marginBottom: 5,
  },
  albumAuthor: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    color: '#000',
    padding: 2,
    fontFamily: 'Montserrat_700Bold',
    fontSize: 9,
  },
  ratingContainer: {
    width: 75,
    marginBottom: 10,
  },

  trackItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  trackInfo: {
    marginLeft: 10,
  },
  trackTitle: {
    color: '#ffffff',
    fontSize: 13,
    letterSpacing: 0.7,
    fontFamily: 'Montserrat_500Medium',
    marginBottom: 5,
  },
  trackAuthor: {
    color: cyanB,
    fontSize: 12,
    letterSpacing: 0.7,
    fontFamily: 'Montserrat_400Regular',
  },
});

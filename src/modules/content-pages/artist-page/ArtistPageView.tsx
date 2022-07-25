import React, { useContext } from 'react';
import {
  ScrollView, ImageBackground, View, Text, Platform,
} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Headline,
  Subheading,
  Title,
  List,
} from 'react-native-paper';
import { ThemeContext } from 'styled-components';
import { HomeStackNavProps } from '../../../navigation/app/home/HomeParamList';
import { StyledColumnView } from '../../../styled-components/ReusedUI';
import { ArtistPageAlbums } from './ArtistPageAlbums';
import { ArtistPageTracks } from './ArtistPageTracks';
import { styles } from '../../../styled-components/StyleSheet';
import { getSpotifyContent } from '../../../generated-components/getSpotifyContent';
import { useStoreActions } from '../../../state-management/hooks';
import { LinearGradientButton } from '../../../styled-components/LinearGradientButton';

export const ArtistPageView: React.FC<HomeStackNavProps<'ArtistPage'>> = ({
  route,
  navigation,
}) => {
  const themeContext = useContext(ThemeContext);
  const { id, name, imageUrl } = route.params;

  const setContent = useStoreActions(
    (actions) => actions.createPost.setContent,
  );
  const clearContent = useStoreActions(
    (actions) => actions.createPost.clearContent,
  );
  const setPostType = useStoreActions(
    (actions) => actions.createPost.setPostType,
  );

  const addReview = async () => {
    const res = await getSpotifyContent(id, 'artist');

    const {
      name,
      imageUrl,
      externalUrl,
    } = res;

    clearContent();
    setPostType('artist');

    setContent({
      id,
      name,
      imageUrl,
      externalUrl,
    });

    navigation.navigate('CreatePost');
  };

  return (
    <ImageBackground
      style={styles.wavyBackgroundStyle}
      imageStyle={styles.wavyBackgroundImageStyle}
      source={require('../../../local-assets/wavy.png')}
    >
      <ScrollView contentContainerStyle={{
        paddingBottom: Platform.OS === 'ios' ? 180 : 120,
      }}
      >

        {/* <List.Item
            title={name}
            description="+1.1 MILLION FOLLOWERS"
            descriptionStyle={{ color: themeContext.colors.accent }}
            titleStyle={{ fontSize: 30, fontWeight: 'bold' }}
            left={() => (

            )}
          /> */}
        <View style={{
          display: 'flex',
          alignItems: 'center',
          paddingTop: 25,
        }}
        >
          <Avatar.Image size={160} source={{ uri: `${imageUrl}` }} />
          <Text style={{
            fontSize: 35,
            marginTop: 20,
            color: 'rgba(255,255,255,1)',
          }}
          >
            {name}
          </Text>
        </View>
        <LinearGradientButton
          text="Add Review"
          onPress={addReview}
          buttonStyles={{
            width: 200,
            alignSelf: 'center',
            marginTop: 20,
          }}
          labelStyles={{
            fontSize: 14,
            fontFamily: 'Montserrat_500Medium',
          }}
        />

        <StyledColumnView>
          <Text
            style={{
              fontFamily: 'Montserrat_500Medium',
              fontSize: 20,
              color: 'white',
              marginBottom: 15,
            }}
          >
            Top Songs
          </Text>
          <ArtistPageTracks id={id} navigation={navigation} route={route} />
        </StyledColumnView>

        <StyledColumnView>
          <Text
            style={{
              fontFamily: 'Montserrat_500Medium',
              fontSize: 20,
              color: 'white',
              marginBottom: 15,
            }}
          >
            Albums
          </Text>
          <ArtistPageAlbums id={id} navigation={navigation} route={route} />
        </StyledColumnView>

        <Button
          style={{ marginHorizontal: 30, marginBottom: 30 }}
          mode="contained"
          onPress={() => {
            navigation.navigate('ArtistPosts', {
              id,
              name,
            });
          }}
        >
          See Shares of this Artist
        </Button>
      </ScrollView>
    </ImageBackground>
  );
};

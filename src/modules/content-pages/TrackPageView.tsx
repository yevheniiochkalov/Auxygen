import React, { useContext } from 'react';
import {
  ImageBackground, Platform, View,
} from 'react-native';
import {
  Caption,
  Button,
  Card,
  Title,
  Paragraph,
  IconButton,
} from 'react-native-paper';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { ThemeContext } from 'styled-components';

import { useNavigation } from '@react-navigation/native';
import { HomeStackNavProps } from '../../navigation/app/home/HomeParamList';
import { useGetTrackPostsQuery } from '../../generated-components/apolloComponents';
import {
  StyledColumnView,
  RoundImage,
} from '../../styled-components/ReusedUI';
import { styles } from '../../styled-components/StyleSheet';
import { UserTitle } from '../home/UserTitle';
import {
  UnroundCard,
  BoldWhiteCaption,
} from '../../styled-components/StylishComponents';
import getEnvVars from '../../../environment';
import { useStoreActions } from '../../state-management/hooks';
import { getSpotifyContent, getSpotifyArtist } from '../../generated-components/getSpotifyContent';
import { Spinner } from '../../utils/Spinner';
import { LinearGradientButton } from '../../styled-components/LinearGradientButton';

const { apiUrl } = getEnvVars();

export const TrackPageView: React.FC<HomeStackNavProps<'TrackPage'>> = ({
  route,
}) => {
  const navigation = useNavigation();
  const {
    id, name, artistNames, imageUrl,
  } = route.params;
  const { data, loading, error } = useGetTrackPostsQuery({
    variables: {
      id,
    },
  });

  const goToArtist = async (name) => {
    const res = (await getSpotifyArtist(id, 'track')).data.getSpotifyTrack.artists;

    const artist = res.filter((artist) => artist.name === name)[0];
    navigation.navigate('ArtistPage', {
      id: artist.id,
      name: artist.name,
      imageUrl: artist.images[0].url,
    });
  };

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
    const res = await getSpotifyContent(id, 'track');
    const {
      name,
      imageUrl,
      externalUrl,
      artistNames,
    } = res;

    clearContent();
    setPostType('track');

    setContent({
      id,
      name,
      imageUrl,
      externalUrl,
      artistNames,
    });

    navigation.navigate('CreatePost');
  };

  const themeContext = useContext(ThemeContext);

  const getAvgVote = () => {
    const voteNum = data.getTrackPosts.map((i) => i.vote)[0];
    if (voteNum) {
      return voteNum;
    }
    return 0;
  };

  if (loading) {
    return <Spinner />;
  }
  if (error || !data) {
    console.log(error);
    return <Caption>Error...</Caption>;
  }

  return (
    <ImageBackground
      style={styles.wavyBackgroundStyle}
      imageStyle={styles.wavyBackgroundImageStyle}
      source={require('../../local-assets/wavy.png')}
    >
      <ScrollView
        contentContainerStyle={{
          paddingBottom: Platform.OS === 'ios' ? 180 : 120,
        }}
      >
        <StyledColumnView>
          <View style={{ alignItems: 'center' }}>
            <RoundImage
              style={{ width: 200, height: 200 }}
              resizeMode="contain"
              source={{
                uri: `${imageUrl}`,
              }}
            />
            <Title
              style={{ color: themeContext.colors.text, textAlign: 'center' }}
            >
              {name}
            </Title>

            {artistNames ? (
              <Caption style={{
                marginTop: 10,
              }}
              >
                {artistNames.map((name) => (
                  <Caption
                    onPress={() => goToArtist(name)}
                    key={name}
                    style={{
                      color: themeContext.colors.text,
                      fontSize: 15,
                    }}
                  >
                    {`${name}, `}
                  </Caption>
                ))}
              </Caption>
            ) : (
              <></>
            )}
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
          </View>
        </StyledColumnView>

        <StyledColumnView>
          <BoldWhiteCaption> SONG IMPRESSIONS </BoldWhiteCaption>
          {data.getTrackPosts.length < 1 ? (
            <Card>
              <Caption style={{ textAlign: 'center' }}>
                There are no posts about this track yet!
              </Caption>
            </Card>
          ) : (
            <View>
              {data.getTrackPosts.map((item, i) => (
                <UnroundCard key={i} style={{ marginBottom: 2 }}>
                  <Card.Content>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                      <View style={{ flexGrow: 2 }}>
                        <UserTitle
                          username={item.user.username}
                          timeSubmitted={item.timeSubmitted}
                          userId={+item.user.id}
                          userImage={`${apiUrl}/${item.user.profilePicture}`}
                          avatarSize={24}
                        />
                      </View>
                      <IconButton
                        size={20}
                        icon={
                            item.vote === 1
                              ? 'thumb-up-outline'
                              : 'thumb-down-outline'
                          }
                      />
                    </View>
                    <Paragraph style={{ marginLeft: 30 }}>
                      {item.text}
                    </Paragraph>
                  </Card.Content>
                </UnroundCard>
              ))}
            </View>
          )}
        </StyledColumnView>
      </ScrollView>
    </ImageBackground>
  );
};

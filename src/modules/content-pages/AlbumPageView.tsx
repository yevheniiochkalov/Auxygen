import React, { useContext, useEffect, useState } from 'react';
import {
  Caption,
  Card,
  Button,
  Paragraph,
  Title,
  List,
  Avatar,
} from 'react-native-paper';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {
  Image,
  ImageBackground, Platform, View,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import { ThemeContext } from 'styled-components';

import {
  useGetAlbumPostsQuery,
  useGetAlbumTracksQuery,
} from '../../generated-components/apolloComponents';
import { StyledColumnView, RoundImage } from '../../styled-components/ReusedUI';
import { HomeStackNavProps } from '../../navigation/app/home/HomeParamList';
import { styles } from '../../styled-components/StyleSheet';
import { UserTitle } from '../home/UserTitle';
import {
  UnroundCard,
  BoldWhiteCaption,
} from '../../styled-components/StylishComponents';
import getEnvVars from '../../../environment';
import { openURL } from '../home/FeedView';
import { getSpotifyArtist, getSpotifyContent } from '../../generated-components/getSpotifyContent';
import { useStoreActions } from '../../state-management/hooks';
import { Spinner } from '../../utils/Spinner';
import playIcon from '../../../assets/play_icon.png';
import { LinearGradientButton } from '../../styled-components/LinearGradientButton';

const { apiUrl } = getEnvVars();

export const AlbumPageView: React.FC<HomeStackNavProps<'AlbumPage'>> = ({
  route,
  navigation,
}) => {
  const [albumItem, setAlbumItem] = useState(null);
  const themeContext = useContext(ThemeContext);
  const [isShowAllReviews, setIsShowAllReviews] = React.useState(false);
  const { id, name, imageUrl } = route.params;
  const [artists, setArtists] = useState(null);

  useEffect(() => {
    const apiCall = async () => {
      const albumArtists = (await getSpotifyArtist(id, 'album')).data.getSpotifyAlbum.artists;
      console.log(albumArtists);
      setArtists(albumArtists);
    };

    apiCall();
  }, []);

  const goToArtist = async (artist) => {
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

  const { data, loading, error } = useGetAlbumPostsQuery({
    variables: {
      id,
    },
  });

  const {
    data: sdata,
    loading: sloading,
    error: serror,
  } = useGetAlbumTracksQuery({
    variables: {
      id,
    },
  });

  const addReview = async () => {
    const res = await getSpotifyContent(id, 'album');

    const {
      name,
      imageUrl,
      externalUrl,
      artistNames,
    } = res;

    clearContent();
    setPostType('album');

    setContent({
      id,
      name,
      imageUrl,
      externalUrl,
      artistNames,
    });

    navigation.navigate('CreatePost');
  };

  if (loading || sloading) {
    return <Spinner />;
  }
  if (error || !data || serror || !sdata) {
    console.log(error);
    return <Caption>Error...</Caption>;
  }

  let rat;
  if (data.getAlbumPosts.length) {
    rat = +(
      data.getAlbumPosts
        .map((p) => p.rating)
        .reduce((a, b) => a + b) / data.getAlbumPosts.length
    ).toFixed(2);
  }

  return (
    <ImageBackground
      style={styles.wavyBackgroundStyle}
      imageStyle={styles.wavyBackgroundImageStyle}
      source={require('../../local-assets/wavy.png')}
    >
      <ScrollView contentContainerStyle={{
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
              style={{ color: themeContext.colors.text, textAlign: 'center', marginBottom: 15 }}
            >
              {name}
            </Title>

            {artists ? (
              <Caption style={{ marginBottom: 10 }}>
                {artists.map((artist, idx, arr) => (
                  <Caption
                    onPress={() => goToArtist(artist)}
                    key={artist.id}
                    style={{
                      color: themeContext.colors.text,
                      fontSize: 15,
                    }}
                  >
                    {idx === arr.length - 1 ? (
                      `${artist.name}`
                    ) : (
                      `${artist.name}, `
                    )}
                  </Caption>
                ))}
              </Caption>
            ) : (
              <></>
            )}

            <StarRating
              disabled
              maxStars={5}
              fullStar="star"
              halfStar="star-half-o"
              starSize={25}
              fullStarColor={themeContext.colors.accent}
              emptyStarColor={themeContext.colors.accent}
              rating={rat}
              selectedStar={() => {}}
            />
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
        </StyledColumnView>

        <StyledColumnView>
          <BoldWhiteCaption>SONGS </BoldWhiteCaption>
          <View style={{ paddingLeft: 10 }}>
            <FlatList
              data={sdata.getAlbumTracks.items}
              renderItem={(item) => (
                <List.Item
                  onPress={() => {
                    navigation.navigate('TrackPage', {
                      id: item?.item.id,
                      name: item?.item.name,
                      artistNames: item.item?.artists?.map((i) => i.name),
                      imageUrl,
                    });
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 5,
                  }}
                  title={item.item?.name}
                  description={item.item?.artists?.map((i, ix) => i.name).join(', ')}
                  left={(props) => (
                    <Avatar.Image
                      style={{
                        marginTop: 8,
                        marginRight: 15,
                      }}
                      size={30}
                      source={{
                        uri: `${imageUrl}`,
                      }}
                    />
                  )}
                  right={() => (
                    <TouchableOpacity
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => {
                        openURL(`${item.item?.external_urls.spotify}`);
                      }}
                    >
                      <Image
                        source={playIcon}
                        style={{
                          width: 24,
                          height: 24,
                          backgroundColor: 'white',
                          borderRadius: 50,
                        }}
                      />
                    </TouchableOpacity>
                  )}
                />
              )}
              keyExtractor={(item, ix) => ix.toString()}
            />
          </View>
        </StyledColumnView>

        <StyledColumnView>
          <BoldWhiteCaption> REVIEWS </BoldWhiteCaption>
          {data.getAlbumPosts.length < 1 ? (
            <Card>
              <Caption style={{ textAlign: 'center' }}>
                There are no posts about this album yet!
              </Caption>
            </Card>
          ) : (
            <View>
              <FlatList
                data={data.getAlbumPosts.length > 3 ? (
                  isShowAllReviews ? (
                    data.getAlbumPosts
                  ) : (
                    data.getAlbumPosts.slice(0, 3)
                  )
                ) : (
                  data.getAlbumPosts
                )}
                renderItem={(item) => (
                  <UnroundCard style={{ marginBottom: 2 }}>
                    <Card.Content>
                      <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <View style={{ flexGrow: 2 }}>
                          <UserTitle
                            username={item.item.user.username}
                            timeSubmitted={item.item.timeSubmitted}
                            userId={+item.item.user.id}
                            userImage={`${apiUrl}/${item.item.user.profilePicture}`}
                            avatarSize={24}
                          />
                        </View>
                        <StarRating
                          disabled
                          maxStars={5}
                          fullStar="star"
                          halfStar="star-half"
                          starSize={15}
                          fullStarColor={themeContext.colors.accent}
                          emptyStarColor={themeContext.colors.accent}
                          rating={item.item.rating}
                          selectedStar={() => {}}
                        />
                      </View>
                      <Paragraph style={{ marginLeft: 30 }}>
                        {item.item.text}
                      </Paragraph>
                    </Card.Content>
                  </UnroundCard>
                )}
                keyExtractor={(item, ix) => ix.toString()}
                contentContainerStyle={{ marginBottom: 30 }}
              />
              <Button
                style={{ marginHorizontal: 30, marginBottom: 30 }}
                mode="contained"
                onPress={() => setIsShowAllReviews(!isShowAllReviews)}
              >
                {isShowAllReviews ? 'See all reviews' : 'Hide all reviews'}
              </Button>
            </View>
          )}
        </StyledColumnView>
      </ScrollView>
    </ImageBackground>
  );
};

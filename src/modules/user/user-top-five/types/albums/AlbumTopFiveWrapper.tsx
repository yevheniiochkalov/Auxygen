import React, { useState, useEffect, useContext } from 'react';
import {
  Chip,
  Avatar,
  IconButton,
  Caption,
  Text,
} from 'react-native-paper';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import {
  View, ScrollView, Image,
} from 'react-native';
import { ThemeContext } from 'styled-components';

import { wrap } from 'node:module';
import {
  GetOtherUserDocument,
  TopFiveArrayInput,
  TopFiveInput,
  useUpdateUserTopFiveMutation,
  useGetOtherUserQuery,
} from '../../../../../generated-components/apolloComponents';
import { RoundImage } from '../../../../../styled-components/ReusedUI';
import { TopFiveArrayType, TopFiveWrapperProps } from '../../UserTopFiveView';
import { AlbumTopFiveEdit } from './AlbumTopFiveEdit';
import { useStoreState } from '../../../../../state-management/hooks';
import { LinearGradientButton } from '../../../../../styled-components/LinearGradientButton';
import AlbumIcon from '../../../../../../assets/album_icon.png';

import { styles } from './styles';
import { Spinner } from '../../../../../utils/Spinner';
import { width } from '../../../../../styled-components/theme';

export const AlbumTopFiveWrapper: React.FC<TopFiveWrapperProps> = ({
  id,
  type,
  navigation,
}) => {
  const themeContext = useContext(ThemeContext);
  const userState = useStoreState((state) => state.user.user);
  const [array, setArray] = useState(Array<TopFiveArrayType>());
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [index, setIndex] = useState(-1);
  const [editMode, setEditMode] = useState(false);
  const [updateTopFive, { loading: mloading }] = useUpdateUserTopFiveMutation();

  const { data, loading, error } = useGetOtherUserQuery({
    variables: {
      id,
    },
  });

  const submitUpdateTopFive = async () => {
    // make sure everything has the right type
    const goodArray = array.filter((value) => Object.keys(value).length !== 0);
    const dataArray = goodArray as TopFiveInput[];
    const data: TopFiveArrayInput = {
      dataArray,
      type,
    };
    try {
      // make the mutation
      await updateTopFive({
        variables: { data },
        refetchQueries: [
          { query: GetOtherUserDocument, variables: { data: { id } } },
        ],
      });
    } catch (err) {
      console.log('error in album top five wrapper', err);
      return <Caption>Submission Failed</Caption>;
    }
  };

  const handleClose = (id) => {
    setArray(array.map((item: any) => (item.id === id ? {} : item)));
  };

  if (loading) {
    return <Spinner />;
  }
  if (error || !data) {
    console.log(error);
    return <></>;
  }

  useEffect(() => {
    if (data && data.getOtherUser) {
      // might want to switch to get last 5 items in list ...
      const content = type === 'track'
        ? data.getOtherUser.topTracks
        : type === 'artist'
          ? data.getOtherUser.topArtists
          : type === 'album'
            ? data.getOtherUser.topAlbums
            : null;

      const topAlbums = content
        ? content.slice(0, 5).map(({ __typename, ...item }) => item)
        : null;

      if (!topAlbums || topAlbums.length < 5) {
        const emptyNum = !topAlbums ? 5 : 5 - topAlbums.length;
        const topAlbumsWithEmpty = !topAlbums
          ? new Array(emptyNum).fill({})
          : topAlbums.concat(new Array(emptyNum).fill({}));
        setArray(topAlbumsWithEmpty);
        return;
      }
      setArray(topAlbums);
    }
  }, [data]);

  return (
    <View
      style={{
        marginBottom: 20,
      }}
    >
      {!editMode ? (
      // SIMPLE FLATLIST

        <View>
          {userState.id === id && (
            <LinearGradientButton
              text="edit"
              buttonStyles={{
                width: 100,
                paddingVertical: 8,
                borderRadius: 17,
                marginBottom: 10,
              }}
              labelStyles={{
                fontFamily: 'Montserrat_500Medium',
              }}
              onPress={() => {
                setEditMode(true);
              }}
            />
          )}

          {type === 'album' && (
            <View style={styles.albumList}>
              <View>
                {array.map((item, index) => (index % 2 === 0) && (
                <TouchableOpacity
                  style={styles.albumCard}
                  key={item.id}
                  onPress={() => {
                    if (item.imageUrl) {
                      navigation.navigate('AlbumPage', {
                        id: item.id,
                        name: item?.name,
                        imageUrl: item.imageUrl,
                      });
                    }
                  }}
                >
                  {Object.keys(item).length ? (
                    <>
                      <View style={styles.overlay} />
                      <RoundImage
                        style={styles.albumImg}
                        resizeMode="contain"
                        source={{
                          uri: `${item.imageUrl}`,
                        }}
                      />

                      <View
                        style={styles.albumInfo}
                      >
                        {/* <View style={styles.ratingContainer}>
                              <StarRating
                                disabled
                                maxStars={5}
                                fullStar="star"
                                halfStar="star-half-o"
                                starSize={12}
                                fullStarColor={themeContext.colors.accent}
                                emptyStarColor={themeContext.colors.accent}
                                rating={3.5}
                              />
                            </View> */}
                        <Text
                          style={styles.albumTitle}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >{item.name}
                        </Text>
                        <Text
                          style={styles.albumAuthor}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {item.artistNames?.map((i) => i).join(', ')}
                        </Text>
                      </View>
                    </>
                  ) : (
                    <View style={styles.coverPlaceholder}>
                      <Image
                        source={AlbumIcon}
                        style={[{
                          height: 50,
                          width: 50,
                        }, {
                          tintColor: 'white',
                        }]}
                      />
                    </View>
                  )}

                </TouchableOpacity>
                ))}
              </View>
              <View>
                {array.map((item, index) => (
                  (index % 2 !== 0) && (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.largeAlbumCard}
                    onPress={() => {
                      if (item.imageUrl) {
                        navigation.navigate('AlbumPage', {
                          id: item.id,
                          name: item?.name,
                          imageUrl: item.imageUrl,
                        });
                      }
                    }}
                  >
                    {Object.keys(item).length ? (
                      <>
                        <View style={styles.overlay} />

                        <RoundImage
                          style={[styles.albumImg, styles.largeImg]}
                          resizeMode="contain"
                          source={{
                            uri: `${item.imageUrl}`,
                          }}
                        />

                        <View
                          style={styles.albumInfo}
                        >
                          {/* <View style={styles.ratingContainer}>
                            <StarRating
                              disabled
                              maxStars={5}
                              fullStar="star"
                              halfStar="star-half-o"
                              starSize={12}
                              fullStarColor={themeContext.colors.accent}
                              emptyStarColor={themeContext.colors.accent}
                              rating={3.5}
                            />
                          </View> */}
                          <Text
                            style={styles.albumTitle}
                          >{item.name}
                          </Text>
                          <Text
                            style={styles.albumAuthor}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                          >
                            {item.artistNames?.map((i) => i).join(', ')}
                          </Text>
                        </View>
                      </>
                    ) : (
                      <View style={styles.coverPlaceholder}>
                        <Image
                          source={AlbumIcon}
                          style={[{
                            height: 50,
                            width: 50,
                          }, {
                            tintColor: 'white',
                          }]}
                        />
                      </View>
                    )}

                  </TouchableOpacity>
                  )
                ))}
              </View>
            </View>
          )}

          <FlatList
            data={array}
            contentContainerStyle={type === 'artist' ? ({
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
            }) : {}}
            keyExtractor={(item, index) => index.toString() + item}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{ padding: 3 }}
                onPress={() => {
                  const pageType = type === 'track'
                    ? 'TrackPage'
                    : type === 'artist'
                      ? 'ArtistPage'
                      : type === 'album'
                        ? 'AlbumPage'
                        : null;
                  if (item.imageUrl) {
                    navigation.navigate(pageType, {
                      id: item.id,
                      name: item?.name,
                      imageUrl: item.imageUrl,
                    });
                  }
                }}
              >
                {type === 'track' ? (
                  <View
                    style={{
                      width: 250,
                    }}
                  >
                    <View style={styles.trackItem}>
                      {item.imageUrl ? (
                        <RoundImage
                          style={{ width: 50, height: 50 }}
                          resizeMode="contain"
                          source={{
                            uri: `${item.imageUrl}`,
                          }}
                        />
                      ) : (
                        <Avatar.Icon
                          style={{
                            borderRadius: 15,
                            backgroundColor:
                                    themeContext.colors.backgroundContrast,
                          }}
                          icon="music"
                        />
                      )}

                      {Object.keys(item).length ? (
                        <View style={styles.trackInfo}>
                          <Text style={styles.trackTitle}>
                            {item.name}
                          </Text>
                          <Text style={styles.trackAuthor}>
                            {item.artistNames?.map((i) => i).join(', ')}
                            {/* The Weeknd */}
                          </Text>
                        </View>
                      ) : (
                        <></>
                      )}
                    </View>
                  </View>
                ) : type === 'artist' ? (
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      width: 100,
                    }}
                  >
                    {item.imageUrl ? (
                      <Avatar.Image
                        size={90}
                        source={{
                          uri: `${item.imageUrl}`,
                        }}
                      />
                    ) : (
                      <Avatar.Icon
                        size={90}
                        icon="artist"
                        style={{
                          backgroundColor:
                                themeContext.colors.backgroundContrast,
                        }}
                      />
                    )}
                    <Caption
                      style={{
                        textAlign: 'center',
                        color: themeContext.colors.accentTwo,
                        marginTop: 10,
                      }}
                    >
                      {item.name}
                    </Caption>
                  </View>
                ) : (
                  <></>
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
      // EDIT MODE FLATLIST

        <ScrollView>
          <LinearGradientButton
            text="save"
            buttonStyles={{
              width: 100,
              paddingVertical: 8,
              borderRadius: 17,
              marginBottom: 10,
            }}
            labelStyles={{
              fontFamily: 'Montserrat_500Medium',
            }}
            onPress={() => {
              submitUpdateTopFive();
              setEditMode(false);
            }}
          />
          {showSearch ? (
            <AlbumTopFiveEdit
              type={type}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              array={array}
              setArray={setArray}
              arrayIndex={index}
              setShowSearch={setShowSearch}
            />
          ) : (
            <></>
          )}
          <FlatList
            data={array}
            keyExtractor={(item, index) => index.toString() + item}
            renderItem={({ item, index }) => (
              <View>
                {item.name ? (
                  <View
                    style={{
                      backgroundColor: '#432287',
                      margin: 10,
                      padding: 10,
                      paddingRight: 25,
                      position: 'relative',
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderRadius: 15,
                    }}
                  >
                    <View style={{
                      marginRight: 10,
                    }}
                    >
                      <Avatar.Image
                        size={35}
                        source={{
                          uri: `${item.imageUrl}`,
                        }}
                      />
                    </View>

                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        width: width * 0.6,

                      }}
                    >
                      {item.name}
                    </Text>
                    <IconButton
                      size={20}
                      onPress={() => handleClose(item.id)}
                      icon="close-circle"
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: 6,
                      }}
                    />
                  </View>
                ) : (
                  <Chip
                    style={{
                      backgroundColor: '#432287',
                      margin: 10,
                      padding: 10,
                    }}
                    icon="plus"
                    onPress={() => {
                      setShowSearch(true);
                      setIndex(index);
                    }}
                  >
                    New Item
                  </Chip>
                )}
              </View>
            )}
          />
        </ScrollView>
      )}
    </View>
  );
};

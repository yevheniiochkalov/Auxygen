import React from 'react';
import {
  Text,
  Card,
  Caption,
  Avatar,
  IconButton,
} from 'react-native-paper';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { ImageBackground, StyleSheet, View } from 'react-native';

import { HomeHeader } from '../home/HomeHeader';

import { useGetArtistPostsQuery } from '../../generated-components/apolloComponents';
import { HomeStackNavProps } from '../../navigation/app/home/HomeParamList';
import { LeftColumn } from '../../styled-components/ReusedUI';
import { timeSince } from '../../utils/timeSince';
import { styles } from '../home/styles';
import getEnvVars from '../../../environment';
import { blueA800, cyanB } from '../../styled-components/colors';
import { height } from '../../styled-components/theme';
import { Spinner } from '../../utils/Spinner';

const { apiUrl } = getEnvVars();

const emptyImage = 'https://www.pikpng.com/pngl/m/39-398340_emergency-medicine-physician-robert-tomsho-empty-profile-picture.png';

export const ArtistPostsView: React.FC<HomeStackNavProps<'ArtistPosts'>> = ({
  route,
  navigation,
}) => {
  const { id, name } = route.params;
  const { data, loading, error } = useGetArtistPostsQuery({
    variables: {
      id,
    },
  });

  if (loading) {
    return <Spinner />;
  }

  if (error || !data) {
    console.log(error);
    return <Text>Error..</Text>;
  }

  return (
    <ImageBackground
      style={localStyles.wavyBackgroundStyle}
      imageStyle={localStyles.wavyBackgroundImageStyle}
      source={require('../../local-assets/wavy.png')}
    >
      <HomeHeader navigation={navigation} />
      <View style={{
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        margin: 10,
        marginTop: -20,
        marginBottom: 220,
      }}
      >
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
        }}
        >
          <IconButton
            icon="chevron-left"
            size={20}
            color={cyanB}
            style={{
              borderWidth: 2,
              borderColor: cyanB,
              marginRight: 20,
            }}
            onPress={() => navigation.goBack()}
          />
          <Text style={{
            fontFamily: 'Montserrat_600SemiBold',
            fontSize: 23,
          }}
          >
            Shares of {name}
          </Text>
        </View>
        {data.getArtistPosts.length < 1 ? (
          <Card>
            <Caption style={{ textAlign: 'center' }}>
              There are no posts about this artist yet!
            </Caption>
          </Card>
        ) : (
          <FlatList
            data={data.getArtistPosts}
            renderItem={(item) => (
              <View style={{
                backgroundColor: '#16182a',
                borderRadius: 20,
                padding: 20,
                marginBottom: 25,
              }}
              >
                <View style={{
                  borderBottomColor: 'rgba(255,255,255,0.3)',
                  borderBottomWidth: 1,
                  marginBottom: 20,
                  paddingBottom: 20,
                }}
                >
                  <LeftColumn>
                    {item.item.user && (
                    <TouchableOpacity
                      style={styles.userContainer}
                      onPress={() => {
                        navigation.navigate('UserPage', { id: +item.item.user.id });
                      }}
                    >
                      <Avatar.Image
                        size={55}
                        source={{
                          uri: `${apiUrl}/${
                            item.item.user.profilePicture
                              ? item.item.user.profilePicture
                              : emptyImage
                          }`,
                        }}
                      />

                      <View style={styles.userRight}>
                        <Text style={styles.username}>
                          {item.item.user.username}
                        </Text>
                        <Text style={styles.timeSubmitted}>
                          {timeSince(item.item.timeSubmitted)}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    )}

                  </LeftColumn>

                </View>
                <Text
                  style={{
                    fontSize: 18,
                  }}
                >
                  {item.item.text}
                </Text>
              </View>
            )}
            keyExtractor={(item, ix) => ix.toString()}
          />
        )}
      </View>
    </ImageBackground>

  );
};

const localStyles = StyleSheet.create({
  wavyBackgroundStyle: {
    backgroundColor: blueA800,
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    minHeight: Math.round(height),
  },

  wavyBackgroundImageStyle: {
    resizeMode: 'cover',
    height: 600,
    opacity: 0.3,
  },
});

import React, { useState, useEffect, useContext } from 'react';
import { Button, Title } from 'react-native-paper';
import Swiper from 'react-native-swiper/src';
import {
  View, StyleSheet, Text, Image,
} from 'react-native';
import { ThemeContext } from 'styled-components';

import { EditNames } from './EditNames';
import { PickGenres } from './PickGenres';

import { HomeStackNavProps } from '../../../navigation/app/home/HomeParamList';
import {
  useEditFirstLoginMutation,
  GetCurrentUserDocument,
  useEditUserGenresMutation,
  useGetGenresQuery,
  EditUserInput,
} from '../../../generated-components/apolloComponents';
import { blueA800 } from '../../../styled-components/colors';
import logo from '../../../../assets/logo_img2.png';
import { height, width } from '../../../styled-components/theme';

interface UserOnBoardingProps {}

export const UserOnBoarding: React.FC<
  UserOnBoardingProps & HomeStackNavProps<'UserOnBoarding'>
> = ({ navigation }) => {
  const themeContext = useContext(ThemeContext);
  const [next, setNext] = useState(true);
  const [ready, setReady] = useState(false);

  const [selectedGenres, setSelectedGenres] = useState(new Array<string>());
  const [editGenres] = useEditUserGenresMutation();
  const { data, loading, error } = useGetGenresQuery();

  const updateSelectedGenres = (genreName: string) => {
    if (!selectedGenres.includes(genreName)) {
      // add
      setSelectedGenres((existData) => [...existData, genreName]);
      return;
    }
    // delete
    const tempArr = selectedGenres.filter((e) => e !== genreName);
    setSelectedGenres(tempArr);
  };

  const submitEditGenres = async () => {
    const data: EditUserInput = {
      genres: selectedGenres,
    };
    try {
      const response = await editGenres({
        variables: { data },
        refetchQueries: [{ query: GetCurrentUserDocument }],
      });
      return response;
    } catch (err) {
      return err;
    }
  };

  const [editFirstLogin] = useEditFirstLoginMutation();

  const submitEditFirstLogin = async () => {
    try {
      const response = await editFirstLogin({
        refetchQueries: [{ query: GetCurrentUserDocument }],
      });
      if (response.data.editFirstLogin) {
        setReady(true);
      }
      return response.data.editFirstLogin;
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    if (ready) {
      navigation.navigate('Feed');
    }
  }, [ready]);

  const saveGenresResults = async (index) => {
    if (index === 2) {
      await submitEditGenres();
    }
  };

  return (
    <Swiper
      loop={false}
      style={styles.wrapper}
      showsButtons={next}
      onIndexChanged={saveGenresResults}
    >
      <View style={styles.slide1}>
        <View>
          <Text
            style={styles.welcomeTitle}
          >
            Welcome to
          </Text>
          <Image
            source={logo}
            style={{
              width: width * 0.7,
              height: height * 0.6,
              marginBottom: -150,
              marginTop: -80,
              marginLeft: -20,
            }}
          />
        </View>
      </View>
      {/* <View style={styles.slide2}>
        <EditNames setNext={setNext} />
      </View> */}
      <View style={styles.slide3}>
        <PickGenres
          selectedGenres={selectedGenres}
          updateSelectedGenres={updateSelectedGenres}
          data={data}
        />
      </View>
      <View style={styles.slide3}>
        <View>
          <Button
            mode="contained"
            contentStyle={styles.enterBtn}
            labelStyle={styles.enterBtnLabel}
            onPress={submitEditFirstLogin}
          >
            Enter the App
          </Button>
        </View>
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: blueA800,
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: blueA800,
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: blueA800,
  },
  slide4: {
    flex: 1,
    backgroundColor: blueA800,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  welcomeTitle: {
    color: '#ffffff',
    fontSize: 35,
    fontFamily: 'Montserrat_600SemiBold',
    textAlign: 'center',
  },
  enterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  enterBtnLabel: {
    fontSize: 20,
    fontFamily: 'Montserrat_500Medium',
  },
});

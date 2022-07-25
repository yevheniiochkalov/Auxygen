import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ReactNativeFile } from 'apollo-upload-client';
import * as WebBrowser from 'expo-web-browser';

import {
  Button, Platform, Text, ToastAndroid, View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo';
import { HomeStackNavProps } from '../../../navigation/app/home/HomeParamList';
import { styles } from './styles';
import { useStoreState } from '../../../state-management/hooks';
import getEnvVars from '../../../../environment';
import { Spinner } from '../../../utils/Spinner';
import {
  EditUserInput, GetCurrentUserDocument, useEditUserGenresMutation, useGetGenresQuery,
} from '../../../generated-components/apolloComponents';
import { PickGenres } from './PickGenres';
import { getSelectedGenresFetch } from '../../../generated-components/getSelectedGenres';

const { apiUrl } = getEnvVars();

export const SettingsView: React.FC<HomeStackNavProps<'SettingsPage'>> = ({
  navigation,
}) => {
  const user = useStoreState((state) => state.user.user);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = React.useState(null);
  const [isShowGenres, setIsShowGenres] = useState(false);

  const { data } = useGetGenresQuery();
  const [editGenres] = useEditUserGenresMutation();
  const [selectedGenres, setSelectedGenres] = useState(new Array<string>());

  useEffect(() => {
    getSelectedGenres();
  }, []);

  const getSelectedGenres = async () => {
    const res = await getSelectedGenresFetch();
    setSelectedGenres(res.data.getCurrentUser.genres);
  };

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

      setIsShowGenres(false);
      alert('Success');
      return response;
    } catch (err) {
      return err;
    }
  };

  const pickImage = async () => {
    setLoading(true);
    try {
      const imageResult = await ImagePicker.launchImageLibraryAsync({});
      if (imageResult.cancelled === false) {
        const data = new FormData();
        data.append('name', 'avatar');
        data.append('filedata', {
          uri: imageResult.uri,
          type: 'image/jpeg',
          name: imageResult.uri.split('/')[imageResult.uri.split('/').length - 1],
        });
        const config = {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: data,
        };

        const res = await fetch(`${apiUrl}/api/upload/${user.id}`, config);
        const result = await res.json();

        if (Platform.OS === 'ios') {
          setLoading(false);
          alert('Avatar changed successfully');
        } else {
          showToast();
        }
        setLoading(false);
      }
    } catch (err) {
      console.log('err picking img', err.message);
    }
  };

  const showToast = () => {
    ToastAndroid.show('Avatar changed successfully', ToastAndroid.SHORT);
  };

  const openGenreSelection = (value: boolean) => {
    setIsShowGenres(value);
  };

  const _goToPrivacy = async () => {
    const result = await WebBrowser.openBrowserAsync(`${apiUrl}/docs/privacy`);
    setResult(result);
  };

  const _goToTerms = async () => {
    const result = await WebBrowser.openBrowserAsync(`${apiUrl}/docs/terms`);
    setResult(result);
  };

  if (loading) return <Spinner />;

  return (
    <View style={styles.screenWrapper}>
      {isShowGenres ? (
        <PickGenres
          selectedGenres={selectedGenres}
          updateSelectedGenres={updateSelectedGenres}
          data={data}
          fromSettings
          saveGenresResults={submitEditGenres}
        />
      ) : (
        <>
          <TouchableOpacity
            style={[styles.option, styles.firstOption]}
            onPress={pickImage}
          >
            <Text style={styles.optionLabel}>
              Change Profile Picture
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => openGenreSelection(true)}
          >
            <Text style={styles.optionLabel}>
              Genre Selection
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, styles.lastOption]}
            onPress={_goToPrivacy}
          >
            <Text style={styles.optionLabel}>
              Privacy Policy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, styles.lastOption]}
            onPress={_goToTerms}
          >
            <Text style={styles.optionLabel}>
              Terms and Conditions
            </Text>
          </TouchableOpacity>
        </>
      )}

    </View>
  );
};

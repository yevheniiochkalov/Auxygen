import React, { useEffect, useRef, useState } from 'react';
import {
  ImageBackground, View, Text, Keyboard, Platform, Button,
} from 'react-native';
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {
  Avatar, IconButton,
} from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useNavigation } from '@react-navigation/native';
import { NewDMInput } from './NewDMInput';

import { Row } from '../../styled-components/ReusedUI';
import { DMStackNavProps } from '../../navigation/app/direct-messages/DMParamList';
import { useStoreState, useStoreActions } from '../../state-management/hooks';
import { styles as mainStyles } from '../../styled-components/StyleSheet';
import { styles } from './styles';
import { timeSince } from '../../utils/timeSince';
import getEnvVars from '../../../environment';
import { height } from '../../styled-components/theme';
import { Spinner } from '../../utils/Spinner';
import { cyanB } from '../../styled-components/colors';

const { apiUrl } = getEnvVars();

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export type DMessageInput = {
  message: string,
  recipientId: number
}
interface DMChatProps {}

export const DMChat: React.FC<DMChatProps & DMStackNavProps<'DMChat'>> = ({ route }) => {
  const { partnerID, partnerPictureURL, partnerName } = route.params;

  const navigation = useNavigation();
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);
  const scrollViewRef = useRef();
  const currentUser = useStoreState((state) => state.user.user);
  const [inputHeight, setInputHeight] = useState(0);

  const messages = useStoreState((state) => (
    state.direct.chatEntities[partnerID]?.messages?.map((message) => (
      state.direct.messageEntities[message]
    ))
  ));

  const messageIds = useStoreState((state) => (
    state.direct.chatEntities[partnerID]?.messages
  ));

  const loading = useStoreState((state) => state.direct.loading);

  const setMessagesToChatThunk = useStoreActions((actions) => (
    actions.direct.setMessagesToChatThunk
  ));

  const makeChatMessagesReadThunk = useStoreActions((actions) => (
    actions.direct.makeChatMessagesReadThunk
  ));

  const setCurrentChat = useStoreActions((actions) => (
    actions.direct.setCurrentChat
  ));

  const makeChatRead = useStoreActions((actions) => (
    actions.direct.makeChatRead
  ));

  React.useEffect(() => {
    setCurrentChat(+partnerID);
    makeChatRead({
      chatId: +partnerID,
      value: true,
    });

    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    const apiCall = async () => {
      await setMessagesToChatThunk(partnerID);
      makeChatMessagesReadThunk({ chatId: partnerID, type: 'partner' });
    };
    apiCall();

    return () => {
      setCurrentChat(null);
      keyboardDidShowListener.remove();
    };
  }, []);

  const _keyboardDidShow = (e) => {
    setKeyboardHeight(e.endCoordinates.height);
  };

  const mapMessages = (item) => (
    <View
      key={item.id}
      style={
        +item.sender.id !== currentUser.id
          ? styles.partnerMessageCard
          : styles.userMessageCard
      }
    >
      {(+item.sender.id !== currentUser.id ? (
        <Avatar.Image
          size={25}
          source={{
            uri: `${apiUrl}/${item.sender.profilePicture}`,
          }}
        />
      ) : (
        <></>
      ))}
      <View style={{
        marginLeft: 10,
        paddingRight: 10,
      }}
      >
        <Text style={styles.messageText}>
          {item.text}
        </Text>
        <Text style={styles.messageDate}>
          {timeSince(item.timeSubmitted)}
        </Text>
      </View>
    </View>
  );

  const goBack = () => {
    navigation.goBack();
  };

  const find_dimesions = (layout) => setInputHeight(layout.height);

  const onFocus = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <ImageBackground
      style={mainStyles.wavyBackgroundStyle}
      imageStyle={mainStyles.wavyBackgroundImageStyle}
      source={require('../../local-assets/wavy.png')}
    >
      <View style={styles.container}>
        <Row style={styles.row}>
          <IconButton
            icon="chevron-left"
            size={20}
            color={cyanB}
            style={{
              borderWidth: 2,
              borderColor: cyanB,
              marginRight: 20,
            }}
            onPress={goBack}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('UserPage', { id: +partnerID });
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Avatar.Image
              style={styles.avatar}
              size={40}
              source={{
                uri: `${partnerPictureURL}`,
              }}
            />
            <Text
              style={styles.partnerName}
            >
              {partnerName}
            </Text>
          </TouchableOpacity>
        </Row>

        <KeyboardAwareScrollView
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={Platform.OS === 'android' ? keyboardHeight - 30 : keyboardHeight - 300}
        >
          <ScrollView
            ref={scrollViewRef}
            style={{
              height: (height * 0.77) - inputHeight,
            }}
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
          >
            {messages?.length ? (
              messages
                .sort((a, b) => a.timeSubmitted.localeCompare(b.timeSubmitted))
                .map(mapMessages)
            ) : (<></>)}
          </ScrollView>
          <NewDMInput
            onFocus={onFocus}
            partnerID={partnerID}
            onLayout={(event) => find_dimesions(event.nativeEvent.layout)}
            inputHeight={inputHeight}
            setInputHeight={setInputHeight}
          />
        </KeyboardAwareScrollView>

      </View>
    </ImageBackground>
  );
};

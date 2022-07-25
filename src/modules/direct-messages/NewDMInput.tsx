import React, { useContext, useEffect, useRef } from 'react';
import { IconButton } from 'react-native-paper';
import { ThemeContext } from 'styled-components';
import { View, TextInput, Keyboard } from 'react-native';

import SocketClient from '../user/Socket';
import {
  useSendNewDmMutation,
  DirectMessageInput,
} from '../../generated-components/apolloComponents';
import { width } from '../../styled-components/theme';

interface NewDMInputProps {
  partnerID: number;
  onLayout: (event: any) => void
  onFocus: () => void
  inputHeight: number
  setInputHeight: any
}

export const NewDMInput: React.FC<NewDMInputProps> = ({
  onFocus, partnerID, onLayout,
}) => {
  const inputRef = useRef(null);
  const themeContext = useContext(ThemeContext);
  const [text, setText] = React.useState('');
  const [sendDM] = useSendNewDmMutation();

  useEffect(() => {
    inputRef.current.focus();

    setTimeout(() => {
      Keyboard.dismiss();
    }, 100);
  }, []);

  const submitSendDM = async () => {
    const data: DirectMessageInput = {
      text,
      recipientID: partnerID,
    };
    const { sendSocketMessage } = SocketClient;

    try {
      const response = await sendDM({
        variables: { data },
      });
      setText('');

      const resMessage = response.data.sendNewDM;

      sendSocketMessage.call(SocketClient, resMessage);
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const onChange = (value) => {
    setText(value);
  };
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: 5,
        paddingTop: 10,
      }}
    >
      <TextInput
        ref={inputRef}
        onLayout={onLayout}
        placeholderTextColor={themeContext.colors.darkText}
        value={text}
        onChangeText={onChange}
        placeholder="Start a message "
        multiline
        onFocus={onFocus}
        style={{
          borderRadius: 40,
          backgroundColor: '#26274B',
          flexGrow: 1,
          maxWidth: width * 0.75,
          paddingHorizontal: 15,
          paddingTop: 20,
          paddingBottom: 20,
          color: 'rgba(255,255,255,1)',
        }}
      />
      <IconButton icon="send" onPress={submitSendDM} disabled={!text || !text.trim()} />
    </View>
  );
};

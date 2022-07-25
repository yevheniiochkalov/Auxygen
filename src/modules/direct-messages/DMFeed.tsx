import React, { useEffect } from 'react';
import { ScrollView, FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import {
  Caption,
  Title,
  Card,
  Subheading,
  Paragraph,
  List,
  Avatar,
} from 'react-native-paper';
import {
  Button, ImageBackground, Platform, Text, View,
} from 'react-native';
import { StyledColumnView } from '../../styled-components/ReusedUI';
import {
  useGetMyDMsQuery,
  useGetMyDmChatQuery,
} from '../../generated-components/apolloComponents';

import { DMStackNavProps } from '../../navigation/app/direct-messages/DMParamList';
import { StartDM } from './StartDM';
import { useStoreState, useStoreActions } from '../../state-management/hooks';
import { styles as mainStyles } from '../../styled-components/StyleSheet';
import getEnvVars from '../../../environment';
import { styles } from './styles';
import { timeSince } from '../../utils/timeSince';
import { height, width } from '../../styled-components/theme';
import { cyanB } from '../../styled-components/colors';
import { Spinner } from '../../utils/Spinner';

const { apiUrl } = getEnvVars();

const onlyUnique = (value, index, self) => self.indexOf(value) === index;

interface DMFeedProps {}

export const DMFeed: React.FC<DMFeedProps & DMStackNavProps<'DMFeed'>> = ({
  navigation,
  route,
}) => {
  const currentUser = useStoreState((state) => state.user.user);
  // const { data, loading, error } = useGetMyDMsQuery();

  const chats = useStoreState((state) => Object.values(state.direct.chatEntities));
  const { messageEntities: messages, loading } = useStoreState((state) => state.direct);
  const setChatsThunk = useStoreActions((actions) => actions.direct.setChatsThunk);
  const setMessagesToChatThunk = useStoreActions((actions) => (
    actions.direct.setMessagesToChatThunk
  ));

  const setCurrentChat = useStoreActions((actions) => (
    actions.direct.setCurrentChat
  ));

  React.useEffect(() => {
    setChatsThunk();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  // if (error || !data) {
  //   console.log(error);
  //   return <Caption>Error..</Caption>;
  // }

  const chatSorting = (a, b) => (
    new Date(messages[b.messages[b.messages.length - 1]]?.timeSubmitted)
    - new Date(messages[a.messages[a.messages.length - 1]]?.timeSubmitted)
  );

  return (
    <ImageBackground
      style={mainStyles.wavyBackgroundStyle}
      imageStyle={mainStyles.wavyBackgroundImageStyle3}
      source={require('../../local-assets/wavy.png')}
    >
      <StyledColumnView
        style={{
          marginTop: 50,
        }}
      >
        <Text
          style={{
            color: 'white',
            fontFamily: 'Montserrat_600SemiBold',
            fontSize: 22,
            marginBottom: 15,
            marginLeft: 20,
          }}
        >
          Messages
        </Text>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: Platform.OS === 'ios' ? 70 : 40,
          }}
        >
          <StartDM navigation={navigation} route={route} />
          {chats
            .sort(chatSorting)
            .map((chat) => (
              <TouchableOpacity
                key={chat.partner.id}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 15,
                  marginLeft: 10,
                  position: 'relative',
                }}
                onPress={() => {
                  setCurrentChat(+chat.partner.id);
                  navigation.navigate('DMChat', {
                    partnerID: +chat.partner.id,
                    partnerName: chat.partner.username,
                    partnerPictureURL: `${apiUrl}/${chat.partner.profilePicture}`,
                  });
                }}
              >
                {!chat.isRead && (
                <View
                  style={styles.partnerUnreadMark}
                />
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Avatar.Image
                    size={45}
                    source={{
                      uri: `${apiUrl}/${chat.partner.profilePicture}`,
                    }}
                  />
                  <View
                    style={{
                      display: 'flex',
                      marginLeft: 10,
                    }}
                  >
                    <Text style={{
                      color: '#ffffff',
                    }}
                    >
                      {chat.partner.username}
                    </Text>
                    <Text style={{
                      color: 'rgba(255,255,255,0.6)',
                      maxWidth: width * 0.6,
                    }}
                    >
                      {messages[chat.messages[chat.messages.length - 1]]?.text}
                    </Text>
                  </View>
                </View>
                <Text style={{
                  color: 'rgba(255,255,255,0.6)',
                  alignSelf: 'center',
                }}
                >
                  {timeSince(messages[chat.messages[chat.messages.length - 1]]?.timeSubmitted)}
                </Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </StyledColumnView>
    </ImageBackground>
  );
};

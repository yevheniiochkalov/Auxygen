import React, { useState, useEffect } from 'react';
import {
  FlatList, View, ImageBackground, StyleSheet, Text, Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ScrollView } from 'react-native-gesture-handler';
import { StyledColumnView, LineBreak } from '../../../styled-components/ReusedUI';
import { LengthPicker } from './Picker';
import { UserInfo } from '../UserInfo';
import { TextArea } from '../TextArea';
import { PollItem } from './PollItem';
import { CreatePostHeader } from '../CreatePostHeader';

import {
  useCreatePollMutation,
  GetPostsDocument,
  PollInput,
  PollOptionInput,
  GetUserPostsDocument,
  useGetCurrentUserQuery,
} from '../../../generated-components/apolloComponents';
import { styles } from '../../../styled-components/StyleSheet';
import { useStoreActions } from '../../../state-management/hooks';

interface CreatePollProps {}

export type PollItemType = {
  text: string;
  enabled: Boolean;
};

export const CreatePoll: React.FC<CreatePollProps> = () => {
  const navigation = useNavigation();
  const [err, setErr] = useState(false);
  const [array, setArray] = useState(
    Array<PollItemType>(4).fill({ text: '', enabled: false }),
  );
  const [days, setDays] = useState(1);
  const [question, setQuestion] = useState('');
  const [createPoll] = useCreatePollMutation();
  const currUser = useGetCurrentUserQuery();
  const id: number = currUser ? +currUser.data.getCurrentUser.id : 1;

  const setPostType = useStoreActions(
    (actions) => actions.createPost.setPostType,
  );

  const submitPoll = async () => {
    const options: PollOptionInput[] = array
      .filter((el) => el.text)
      .map((el) => {
        const votes: number = 0;
        const option = el.text;
        return { option, votes };
      });
    const pollData: PollInput = {
      length: days,
      question,
      options,
    };
    try {
      const response = await createPoll({
        variables: { data: pollData },
        refetchQueries: [
          { query: GetPostsDocument },
          { query: GetUserPostsDocument, variables: { id } },
        ],
      });

      if (response.data) {
        // let user know
        alert('Success');

        setPostType('thoughts');
        // navigate away
        navigation.navigate('Feed');
      } else {
        alert('Post Unsuccesful ');
      }
    } catch (err) {
      console.log(err);
      return err;
    } finally {
      setQuestion('');
      setArray(Array<PollItemType>(4).fill({ text: '', enabled: false }));
      setDays(1);
      // redirect to home page
      // let know post was succesfule
    }
  };

  return (
    <ImageBackground
      style={styles.wavyBackgroundStyle}
      imageStyle={styles.wavyBackgroundImageStyle2}
      source={require('../../../local-assets/wavy.png')}
    >
      <CreatePostHeader navigation={navigation} title="Create Poll" handleSubmit={submitPoll} />
      <ScrollView contentContainerStyle={pollStyles.container}>
        <UserInfo />

        <View style={pollStyles.pollWrapper}>
          <TextArea
            value={question}
            setValue={setQuestion}
            placeholder="Ask a question..."
            minHeight={0}
          />
        </View>

        <LineBreak />
        <StyledColumnView>
          <FlatList
            data={array.sort((a, b) => +b.enabled - +a.enabled)}
            keyExtractor={(item, index) => index.toString() + item}
            renderItem={({ item, index }) => (
              <PollItem
                item={item}
                index={index}
                array={array}
                setArray={setArray}
              />
            )}
          />
        </StyledColumnView>
        <LengthPicker days={days} setDays={setDays} />
      </ScrollView>
    </ImageBackground>
  );
};

const pollStyles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    height: Platform.OS === 'ios' ? 'auto' : '110%',
  },
  pollWrapper: {
    paddingLeft: 40,
    paddingRight: 40,
  },
});

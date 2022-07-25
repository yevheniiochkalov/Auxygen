import React, { useState } from 'react';
import {
  Text, Card, Title, Button,
} from 'react-native-paper';
import {
  useStoreActions,
  useStoreState,
} from '../../../state-management/hooks';

interface TrackVotesProps {}

export const TrackVotes: React.FC<TrackVotesProps> = ({}) => {
  const content = useStoreState((state) => state.createPost.content);
  const setContent = useStoreActions(
    (actions) => actions.createPost.setContent,
  );
  // track is by default 0

  const [pressed, setPressed] = useState(null);

  const handlePress = (vote: number) => {
    setPressed(vote);
    vote === 1
      ? setContent({ ...content, vote: 1 })
      : setContent({ ...content, vote: -1 });

    // pass info to state management
  };
  return (
    <Card style={{
      marginBottom: -20,
    }}
    >
      <Card.Content style={{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
      >
        <Button
          onPress={() => handlePress(1)}
          icon="thumb-up-outline"
          labelStyle={{
            color: pressed === 1 ? '#FB5D1B' : '#fff',
          }}
        >
          Upvote
        </Button>
        <Button
          onPress={() => handlePress(-1)}
          icon="thumb-down-outline"
          labelStyle={{
            color: pressed === -1 ? '#FB5D1B' : '#fff',
          }}
        >
          Downvote
        </Button>
      </Card.Content>
    </Card>
  );
};

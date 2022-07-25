import React, { useState, useContext } from 'react';
import {
  Card,
  Avatar,
  Title,
  Button,
  Subheading,
  IconButton,
} from 'react-native-paper';
import { Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { ThemeContext } from 'styled-components';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { HomeStackNavProps } from '../../navigation/app/home/HomeParamList';
import { ThinLine } from '../../styled-components/ReusedUI';
import {
  Poll,
  useUpdatePollMutation,
  GetPostsDocument,
  PollInput,
  PollOptionInput,
} from '../../generated-components/apolloComponents';
import { emptyImage } from './FeedView';

import { CommentsAndLikes } from './CommentsAndLikes';
import { timeSince } from '../../utils/timeSince';
import { styles } from './styles';
import getEnvVars from '../../../environment';

const { apiUrl } = getEnvVars();
type OptionData = { option: string; votes?: number };
interface PollViewProps {
  item: Poll;
  showAvatar: boolean
  from: string | null,
  refetchFeed: () => void,
}

export const PollView: React.FC<PollViewProps & HomeStackNavProps<'Feed'>> = ({
  item,
  navigation,
  route,
  showAvatar = true,
  from,
  handleDelete,
  isOwner,
  isLiked,
  refetchFeed,
}) => {
  const themeContext = useContext(ThemeContext);
  const [showVotes, setShowVotes] = useState(false);
  const [updatePoll] = useUpdatePollMutation();

  const totalVotes = item.options
    .map((i) => i.votes)
    .reduce((a, b) => a + b, 0);

  const submitUpdatePoll = async (optionName: string) => {
    // update votes on the options
    const newOptions: PollOptionInput[] = item.options.map(
      ({ __typename, ...i }) => {
        if (i.option === optionName) {
          i.votes++;
        }
        return i;
      },
    );

    const data: PollInput = {
      id: +item.id,
      options: newOptions,
    };
    try {
      const response = await updatePoll({
        variables: { data },
        refetchQueries: [{ query: GetPostsDocument }],
      });
    } catch (err) {
      return err;
    }
  };

  return (
    <Card
      style={{
        marginBottom: 20,
      }}
    >
      {/* TODO: make a global style for centering */}
      <Card.Content style={{ paddingLeft: 20 }}>
        <View
          style={{
            width: 300,
          }}
        >
          {item.user && showAvatar && (
          <TouchableOpacity
            style={styles.userContainer}
            onPress={() => {
              navigation.navigate('UserPage', { id: +item?.user.id });
            }}
          >
            <Avatar.Image
              size={55}
              source={{
                uri: `${apiUrl}/${
                  item?.user.profilePicture
                    ? item?.user.profilePicture
                    : emptyImage
                }`,
              }}
            />

            <View style={styles.userRight}>
              <Text style={styles.username}>
                {item?.user.username}
              </Text>
              <Text style={styles.timeSubmitted}>
                {timeSince(item?.timeSubmitted)}
              </Text>
            </View>
          </TouchableOpacity>
          )}
        </View>
        {showAvatar && (
          <ThinLine />
        )}

        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        >
          <Title style={styles.pollQuestion}>{item.question}</Title>
          {!showAvatar && isOwner && (
          <Menu>
            <MenuTrigger>
              <IconButton
                icon="dots-vertical"
                size={25}
                disabled
              />
            </MenuTrigger>
            <MenuOptions
              optionsContainerStyle={{
                marginTop: 30,
              }}
            >
              <MenuOption onSelect={handleDelete}>
                <Text style={{ color: 'red' }}>Delete</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
          )}
        </View>
        <FlatList
          style={{
            marginTop: 20,
          }}
          data={item.options}
          keyExtractor={(item, ix) => ix.toString()}
          renderItem={(option) => (!showVotes ? (

            <TouchableOpacity
              style={styles.inactivePollButton}
              onPress={() => {
                // TODO: update user's vote
                submitUpdatePoll(option.item.option);
                setShowVotes(true);
              }}
            >
              <Text
                style={styles.inactivePollLabel}
              >
                {option.item.option}
              </Text>
            </TouchableOpacity>
          ) : (
            <View
              style={styles.activePollButtonWrap}
            >
              <View
                style={[styles.activePollButton, {
                  width: `${(option.item.votes / totalVotes) * 100}%`,
                  borderLeftWidth: option.item.votes > 0 ? 0.5 : 0,
                }]}
              />
              <Text style={styles.activePollLabel}>
                {option.item.option}
              </Text>
              <Text style={styles.activePollLabel}>
                {option.item.votes}
              </Text>
            </View>

          ))}
        />
        {from !== 'comments' && (
          <CommentsAndLikes
            navigation={navigation}
            item={item}
            route={route}
            isLiked={isLiked}
            refetchFeed={refetchFeed}
          />
        )}

      </Card.Content>
    </Card>
  );
};

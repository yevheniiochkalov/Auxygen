import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper';
import { StyledColumnView } from '../../../styled-components/ReusedUI';
import {
  useGetOtherUserQuery,
  TopFive,
} from '../../../generated-components/apolloComponents';
import { Spinner } from '../../../utils/Spinner';

interface TypeDisplayProps {
  id: number;
  freshData: TopFive[];
  type: string;
}

export const TypeDisplay: React.FC<TypeDisplayProps> = ({
  id,
  freshData,
  type,
}) => {
  const { data, loading, error } = useGetOtherUserQuery({
    variables: {
      id,
    },
  });

  if (loading) {
    return <Spinner />;
  }
  if (error || !data) {
    console.log(error);
    return <></>;
  }

  const localData = type === 'track'
    ? data.getOtherUser.topTracks
    : type === 'artist'
      ? data.getOtherUser.topArtists
      : type === 'album'
        ? data.getOtherUser.topAlbums
        : null;

  return (
    <FlatList
      contentContainerStyle={{
        justifyContent: 'space-around',
        flexDirection: 'row',
      }}
      data={freshData || localData}
      keyExtractor={(item, index) => item!?.id!?.toString() + index}
      renderItem={(item) => (
        <StyledColumnView>
          {/* <Caption>{item.item.name}</Caption> */}
          <Avatar.Image
            size={50}
            source={{
              uri: `${item.item.imageUrl}`,
            }}
          />
        </StyledColumnView>
      )}
    />
  );
};

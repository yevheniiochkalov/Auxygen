import React, { useState } from 'react';
import { Button, List, Title } from 'react-native-paper';
import {
  GetOtherUserDocument,
  TopFiveArrayInput,
  TopFiveInput,
  useUpdateUserTopFiveMutation,
} from '../../../../../generated-components/apolloComponents';
import { StyledColumnView } from '../../../../../styled-components/ReusedUI';
import { TypeDisplay } from '../../TypeDisplay';
import { TopFiveArrayType, TopFiveWrapperProps } from '../../UserTopFiveView';
import { TrackTopFiveEdit } from './TrackTopFiveEdit';
import { useStoreState } from '../../../../../state-management/hooks';

export const TrackTopFiveWrapper: React.FC<TopFiveWrapperProps> = ({ id }) => {
  const userState = useStoreState((state) => state.user.user);
  const [trackArray, setTrackArray] = useState(Array<TopFiveArrayType>());
  const [searchQuery, setSearchQuery] = useState('');
  const [updateTopFive, { data: mdata }] = useUpdateUserTopFiveMutation();

  const submitUpdateTopFive = async () => {
    const dataArray: TopFiveInput[] = trackArray;
    const data: TopFiveArrayInput = {
      dataArray,
      type: 'track',
    };
    try {
      // make the mutation
      await updateTopFive({
        variables: { data },
        refetchQueries: [
          { query: GetOtherUserDocument, variables: { data: { id } } },
        ],
      });
      // clean up
      setSearchQuery('');
      setTrackArray([]);
    } catch (err) {
      console.log('error in album top five wrapper', err);
    }
    // setShowSettings(false);
  };

  return (
    <StyledColumnView>
      <Title>Top Tracks</Title>

      <TypeDisplay
        id={id}
        freshData={mdata ? mdata.updateUserTopFive.topTracks : null}
        type="track"
      />
      {userState.id === id ? (
        <List.Accordion title="Edit Top Five">
          <TrackTopFiveEdit
            array={trackArray}
            setArray={setTrackArray}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <Button onPress={submitUpdateTopFive}>Submit</Button>
        </List.Accordion>
      ) : (
        <></>
      )}
    </StyledColumnView>
  );
};

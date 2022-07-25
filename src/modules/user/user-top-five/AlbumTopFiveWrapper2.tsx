import React, { useState } from 'react';
import { Button, List, Title } from 'react-native-paper';
import {
  GetOtherUserDocument,
  TopFiveArrayInput,
  TopFiveInput,
  useUpdateUserTopFiveMutation,
} from '../../../generated-components/apolloComponents';
import { StyledColumnView } from '../../../styled-components/ReusedUI';
import { TypeDisplay } from './TypeDisplay';
import { TopFiveArrayType, TopFiveWrapperProps } from './UserTopFiveView';
import { AlbumTopFiveEdit } from './types/albums/AlbumTopFiveEdit';
import { useStoreState } from '../../../state-management/hooks';

export const AlbumTopFiveWrapper2: React.FC<TopFiveWrapperProps> = ({ id }) => {
  const userState = useStoreState((state) => state.user.user);
  const [albumArray, setAlbumArray] = useState(Array<TopFiveArrayType>());
  const [searchQuery, setSearchQuery] = useState('');
  //   const [showSettings, setShowSettings] = useState(false);
  const [updateTopFive, { data: mdata }] = useUpdateUserTopFiveMutation();

  const submitUpdateTopFive = async () => {
    const dataArray: TopFiveInput[] = albumArray;
    const data: TopFiveArrayInput = {
      dataArray,
      type: 'album',
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
      setAlbumArray([]);
    } catch (err) {
      console.log('error in album top five wrapper', err);
    }
    // setShowSettings(false);
  };

  return (
    <StyledColumnView>
      <Title>Top Albums</Title>

      <TypeDisplay
        id={id}
        freshData={mdata ? mdata.updateUserTopFive.topAlbums : null}
        type="album"
      />
      {userState.id === id ? (
        <List.Accordion title="Edit Top Five">
          {/* <AlbumTopFiveEdit
            array={albumArray}
            setArray={setAlbumArray}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          /> */}
          <Button onPress={submitUpdateTopFive}>Submit</Button>
        </List.Accordion>
      ) : (
        <></>
      )}
    </StyledColumnView>
  );
};

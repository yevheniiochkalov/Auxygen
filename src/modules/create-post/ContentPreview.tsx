import React from 'react';
import { Image } from 'react-native';
import {
  Button, Card, Title, Subheading,
} from 'react-native-paper';
import { useStoreState } from '../../state-management/hooks';
import { StyledColumnView } from '../../styled-components/ReusedUI';

interface ContentPreviewProps {
  onPress: (hello: number) => void;
}

export const ContentPreview: React.FC<ContentPreviewProps> = ({ onPress }) => {
  const content = useStoreState((state) => state.createPost.content);
  const postType = useStoreState((state) => state.createPost.postType);

  return (
    <StyledColumnView>
      <Card>
        <Card.Content style={{ alignItems: 'center' }}>
          <Title>{content.name}
          </Title>
          <Subheading> {postType}</Subheading>
          <Image
            style={{ resizeMode: 'contain', width: 200, height: 200 }}
            source={{
              uri: `${content.imageUrl}`,
            }}
          />
          <Card.Actions>
            <Button
              labelStyle={{
                color: 'white',
              }}
              onPress={() => {
                onPress(Math.random());
              }}
            >
              Cancel
            </Button>
          </Card.Actions>
        </Card.Content>
      </Card>
    </StyledColumnView>
  );
};

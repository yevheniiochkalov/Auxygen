import React from 'react';
import { Text } from 'react-native';

import { profileStyles } from './styles';
import { useGetUserPostsQuery } from '../../generated-components/apolloComponents';

interface PostsCounterProps {
  userId: number
}

export const PostsCounter: React.FC<PostsCounterProps> = ({ userId }) => {
  const { data, loading, error } = useGetUserPostsQuery({
    variables: {
      id: userId,
    },
  });

  if (loading) {
    return (
      <></>
    );
  }
  return (
    <Text style={profileStyles.countLabel}>
      {`${data?.getUserPosts.length} Posts`}
    </Text>
  );
};


import React from 'react';
import { Caption, Card } from 'react-native-paper';

import { Comment } from './Comment';

export const CommentsList = ({
  comments,
  postType,
  postId,
  pressReply,
  userId,
  onLayout,
}) => {
  const renderComment = (item) => (
    <Comment
      item={item}
      isReply={0}
      key={item.id}
      postType={postType}
      postId={postId}
      pressReply={pressReply}
      userId={userId}
      onLayout={onLayout}
    />
  );

  return (
    <Card theme={{ roundness: 15 }} style={{ marginTop: 20 }}>
      <Card.Content
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
        }}
      >
        {comments?.length > 0 ? (
          comments.filter((comment) => !comment.replyToId).sort((a, b) => (
            a.timeSubmitted.localeCompare(b.timeSubmitted)
          )).map((comment) => renderComment(comment))
        ) : (
          <Caption>No comments yet!</Caption>
        )}
      </Card.Content>
    </Card>
  );
};

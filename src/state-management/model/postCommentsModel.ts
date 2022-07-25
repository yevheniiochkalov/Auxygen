import {
  Action, action, Thunk, thunk,
} from 'easy-peasy';
import { getPostCommentsFetch } from '../../generated-components/getPostComments';

interface GetPostCommentInput {
  id: number,
  postType: string,
  replyToId?: string,
}

interface CommentUserInterface {
  id: number,
  username: string,
  profilePicture: string
}

export interface PostCommentInterface {
  id: string,
  text: string,
  timeSubmitted: Date,
  replyToId: number,
  replies?: PostCommentInterface[]
  parentCommentAuthor?: PostCommentInterface
  likes: number,
  likedUsers: number[],
  user: CommentUserInterface
}

type CommentsObjectsType = {
  [id: number]: PostCommentInterface
}

export interface PostCommentsModelInterface {
  currentPost?: number;
  setCurrentPost: Action<PostCommentsModelInterface, any>;
  // comments: PostCommentInterface[];
  commentsIds: number[],
  commentsObjects: CommentsObjectsType,
  getPostCommentsThunk: Thunk<PostCommentsModelInterface, GetPostCommentInput>;
  addComments: Action<PostCommentsModelInterface, any>;
  setLikeUnlike: Action<PostCommentsModelInterface, any>;
  addNewComment: Action<PostCommentsModelInterface, any>;
  clearComments: Action<PostCommentsModelInterface>;
}

const postCommentsModel: PostCommentsModelInterface = {
  currentPost: null,
  commentsIds: [],
  commentsObjects: {},
  setCurrentPost: action((state, payload) => {
    if (payload.postId) {
      state.currentPost = +payload.postId;
    } else {
      state.currentPost = null;
    }
  }),
  getPostCommentsThunk: thunk(async (actions, payload) => {
    const commentsFromApi = (await getPostCommentsFetch(payload));
    // const repliesIds = [];
    // comments.forEach((comment) => {
    //   if (!comment.replyToId) return;

    //   const idx = comments.findIndex((c) => Number(c.id) === comment.replyToId);
    //   if (comments[idx].replies) {
    //     comments[idx].replies.push(comment);
    //   } else {
    //     comments[idx].replies = [comment];
    //   }

    //   comment.parentCommentAuthor = comments[idx].user.username;
    //   repliesIds.push(comment.id);
    // });
    // actions.addComments(comments);

    const commentsObjects = {};
    const commentsIds = [];
    commentsFromApi.forEach((comment: PostCommentInterface) => {
      const id = Number(comment.id);
      commentsObjects[id] = comment;
      commentsIds.push(id);
    });

    const repliesIds = [];
    const comments: PostCommentInterface[] = Object.values(commentsObjects);

    comments.forEach((comment) => {
      if (!comment.replyToId) return;

      const idx = comments.findIndex((c) => Number(c.id) === comment.replyToId);
      if (comments[idx].replies) {
        comments[idx].replies.push(comment);
      } else {
        comments[idx].replies = [comment];
      }

      comment.parentCommentAuthor = comments[idx].user.username;
      repliesIds.push(comment.id);
    });

    actions.addComments({
      commentsObjects,
      commentsIds,
    });
  }),
  addComments: action((state, payload) => {
    state.commentsObjects = payload.commentsObjects;
    state.commentsIds = payload.commentsIds;
  }),
  setLikeUnlike: action((state, payload) => {
    const { value, userId, commentId } = payload;

    const targetComment = state.commentsObjects[Number(commentId)];

    let newComment;
    if (value) {
      newComment = {
        ...targetComment,
        likes: targetComment.likes + 1,
        likedUsers: [
          ...targetComment.likedUsers,
          +userId,
        ],
      };
    } else {
      newComment = {
        ...targetComment,
        likes: targetComment.likes - 1,
        likedUsers: targetComment.likedUsers.filter((id) => +id !== +userId),
      };
    }
    state.commentsObjects[Number(commentId)] = newComment;

    if (targetComment.replyToId) {
      state.commentsObjects[targetComment.replyToId].replies = state.commentsObjects[targetComment.replyToId].replies.map((comment) => {
        if (+comment.id !== +targetComment.id) {
          return console.log(+comment);
        }
        return newComment;
      });
    }
  }),
  addNewComment: action((state, payload) => {
    // on socket events
    state.commentsIds = [...state.commentsIds, payload.id],
    state.commentsObjects = {
      ...state.commentsObjects,
      [payload.id]: payload,
    };
  }),
  clearComments: action((state) => {
    state.commentsIds = [];
    state.commentsObjects = {};
  }),

};
export default postCommentsModel;

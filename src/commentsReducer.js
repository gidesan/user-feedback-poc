export const SET_COMMENTS = 'comments/set';
export const ADD_COMMENT = 'comments/add';
export const UPDATE_COMMENT = 'comments/update';
export const REMOVE_COMMENT = 'comments/remove';

export default function reducer(state, action) {
  switch (action.type) {
    case SET_COMMENTS:
      return action.payload;
    case ADD_COMMENT:
      return [
        ...state,
        action.payload,
      ];
    case UPDATE_COMMENT:
      const newComment = action.payload;
      return state.map((comment) => {
        return comment.id === newComment.id ? newComment : comment;
      });
    case REMOVE_COMMENT:
      return state.filter(comment => comment.id !== action.payload)  
    default:
      return state;
  }
}

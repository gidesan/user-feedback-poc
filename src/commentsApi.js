import { v4 as uuid } from 'uuid';

const COMMENTS_KEY = 'comments';

const getComments = () => {
  return JSON.parse(localStorage.getItem(COMMENTS_KEY)) || [];
};

const setComments = (comments) => {
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments || []));
};

export const createComment = (comment) => {
  return new Promise((resolve, reject) => {
    const newComment = {
      ...comment,
      id: uuid(),
    };
    const comments = getComments();
    const updatedComments = [
      ...comments,
      newComment,
    ];
    setComments(updatedComments);
    resolve(newComment);
  });
}

export const readComments = () => {
  return new Promise((resolve, reject) => {
    resolve(getComments());
  });
}

export const readComment = (id) => {
  return new Promise((resolve, reject) => {
    const comments = getComments();
    const comment = comments.filter(comment => comment.id === id)
    resolve(comment);
  });
}

export const updateComment = (newComment) => {
  return new Promise((resolve, reject) => {
    const comments = getComments();
    const updatedComments = comments.map((comment) => {
      return comment.id === newComment.id ? newComment : comment;
    });
    setComments(updatedComments);
    resolve(updatedComments);
  });
};

export const deleteComment = (id) => {
  return new Promise((resolve, reject) => {
    const comments = JSON.parse(localStorage.getItem('comments'));
    const updatedComments = comments.filter(comment => comment.id !== id)
    setComments(updatedComments);
    resolve(id);
  });
}

import unique from 'unique-selector';
import { useEffect, useReducer } from 'react';
import { createComment, deleteComment, readComments } from './commentsApi';
import reducer, { ADD_COMMENT, REMOVE_COMMENT, SET_COMMENTS } from './commentsReducer';
import useWindowWidth from './useWindowWidth';
import './Overlay.css';

export default function Overlay({ rect }) {

  const [comments, dispatch] = useReducer(reducer, []);

  async function fetchComments() {
    const comments = await readComments();
    dispatch({ type: SET_COMMENTS, payload: comments });
  }

  async function addComment(comment) {
    const updatedComment = await createComment(comment);
    dispatch({ type: ADD_COMMENT, payload: updatedComment });
  }

  async function removeComment(id) {
    await deleteComment(id);
    dispatch({ type: REMOVE_COMMENT, payload: id });
  }

  useEffect(() => {
    fetchComments();
  }, []);

  // we don't even store the "width" value returned from the hook since we only need to re-render on widtth change,
  // no matter its value
  useWindowWidth();  

  const getElementUnderOverlay = (x, y) => document.elementsFromPoint(x,y)[1];

  const getElementRect = (selector) => {
    const element = document.querySelector(selector);
    if (!element) {
      throw new Error(`Element not found for selector ${selector}`);
    }
    return element.getBoundingClientRect();
  };

  const handleOverlayClick = (e) => {
    const evt = e.nativeEvent;
    const text = 'comment';
    const x = evt.clientX;
    const y = evt.clientY;

    // first element of the array returned by document.elementsFromPoint
    // is the overlay, so we'll pick the second one 
    const selectedElement = getElementUnderOverlay(x, y);
    const selectedElementRect = selectedElement.getBoundingClientRect();

    addComment({
      x: x - selectedElementRect.x,
      y: y - selectedElementRect.y,
      selector: unique(selectedElement),
      text,
    });    
  };

  const calcCommentPosition = (comment) => {
    const elementRect = getElementRect(comment.selector);
    const top = elementRect.y + Math.min(comment.y, elementRect.height - 30);
    const left = elementRect.x + Math.min(comment.x, elementRect.width - 30);
    return {
      top: `${top}px`,
      left: `${left}px`,
    };
  };

  const { top, left, width, height } = rect;

  return (
    <>
      <div 
        onClick={handleOverlayClick}
        className="overlay"
        style={{
          width,
          height,
          top,
          left,
        }}
      />
      {comments.map(comment => (
        <div
          key={`${comment.x}.${comment.y}`}
          onClick={() => removeComment(comment.id)}
          style={calcCommentPosition(comment)}
          className="marker"
        >
          {comment.text}
        </div>
      ))}
    </>
  );
}

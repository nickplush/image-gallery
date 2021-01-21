import React, { useState } from 'react';
import { Loader } from './Loader';
import Comment from './Comment';
import './modal.css';

const Modal = ({ onClose, photo, comments }) => {
  const [isLoading, setIsLoading] = useState(true);
  const onLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      <div className="back" />
      <div className="modal_back" onClick={() => onClose()}>
        <div className="modal" id="modal">
          <div className="content">
            <div className={isLoading ? '' : 'hidden'}>
              <Loader />
            </div>
            <img
              src={photo.large}
              alt={photo.large}
              onLoad={onLoad}
              className={isLoading ? 'hidden' : 'img'}
            />
          </div>
          <div className="actions">
            <h2>Comments:</h2>
            <div className="comments">
              {comments.length ? (
                comments.map((comment, i) => (
                  <Comment key={i} author={comment.author} text={comment.text} />
                ))
              ) : (
                <h3>No comments</h3>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;

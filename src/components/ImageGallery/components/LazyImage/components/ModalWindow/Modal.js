import React, { useState, useEffect } from 'react';
import Comment from './components/Comment/Comment';
import Loader from './components/Loader/Loader';
import PropTypes from 'prop-types';
import './Modal.css';

const Modal = ({ onClose, photo, comments }) => {
  const [isLoading, setIsLoading] = useState(true);

  const onLoad = () => {
    setIsLoading(false);
  };

  const handleKeyUp = e => {
    if (e.keyCode === 27) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);
    return () => document.removeEventListener('keyup', handleKeyUp);
  });

  return (
    <>
      <div className="back" />
      <div className="modal-back" onClick={onClose}>
        <div className="modal" id="modal">
          <div className="content">
            {isLoading && <Loader />}
            <img src={photo} alt={photo} onLoad={onLoad} className={isLoading ? 'hidden' : ''} />
          </div>
          <div className="comments">
            <h2>Comments:</h2>
            <div className="comments-content">
              {comments && comments.length ? (
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

Modal.propTypes = {
  onClose: PropTypes.func,
  photo: PropTypes.string,
  comments: PropTypes.array,
};

export default Modal;

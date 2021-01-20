import React, { useState } from 'react';
import './modal.css';
import './author.css';
import { stringToHslColor } from '../../utils';
import { Loader } from './Loader';

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
              {!comments.length && <h3>No comments</h3>}
              {comments.map((comment, i) => (
                <div className="comment" key={i}>
                  <div className="results">
                    <span
                      className="color-circle"
                      style={{ background: stringToHslColor(comment.author) }}
                    >
                      {comment.author[0]}
                    </span>
                  </div>
                  <div>{comment.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;

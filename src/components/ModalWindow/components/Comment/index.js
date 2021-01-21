import React from 'react';
import { stringToHslColor } from './helpers/index';
import './author.css';

const Comment = ({ author, text }) => {
  return (
    <div className="comment">
      <div className="results">
        <span className="color-circle" style={{ background: stringToHslColor(author) }}>
          {author[0]}
        </span>
      </div>
      <div>{text}</div>
    </div>
  );
};

export default Comment;

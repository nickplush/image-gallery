import React from 'react';
import PropTypes from 'prop-types';
import { stringToHslColor } from './helpers/index';
import './Comment.css';

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

Comment.propTypes = {
  author: PropTypes.string,
  text: PropTypes.string,
};

export default Comment;

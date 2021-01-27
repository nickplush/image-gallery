import React, { useState, useEffect } from 'react';
import Modal from './components/ModalWindow/Modal';
import './LazyImage.css';
import { BehaviorSubject, fromEvent } from 'rxjs';

const placeHolder =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP0d/GvBwADLwFjI/tmIwAAAABJRU5ErkJggg==';

export const LazyImage = ({ src, alt, comments, position }) => {
  const parentRef = React.createRef();
  const [srcImage, setSrcImage] = useState(placeHolder);
  const [open, setOpen] = useState(false);

  useEffect(
    () => {
      if (srcImage === placeHolder) {
        if (parentRef.current.getBoundingClientRect().top + position < position + 1500) {
          setSrcImage(src.webformatURL);
        }
      }
    },
    [position],
  );
  const onModalClose = () => {
    setOpen(false);
  };

  const onModalOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <img src={srcImage} className="lazy-image " onClick={onModalOpen} alt={alt} ref={parentRef} />
      {open && <Modal photo={src.largeImageURL} comments={comments} onClose={onModalClose} />}
    </>
  );
};

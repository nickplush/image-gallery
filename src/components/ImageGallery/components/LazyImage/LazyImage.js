import React, { useState, useEffect } from 'react';
import Modal from './components/ModalWindow/Modal';
import './LazyImage.css';
import { fromEvent } from 'rxjs';
import { map, throttleTime } from 'rxjs/operators';

const scroll$ = fromEvent(window, 'scroll');

const placeHolder =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP0d/GvBwADLwFjI/tmIwAAAABJRU5ErkJggg==';

export const LazyImage = ({ src, alt, comments }) => {
  const parentRef = React.createRef();
  const [srcImage, setSrcImage] = useState(placeHolder);
  const [open, setOpen] = useState(false);
  const [windowPosition, setWindowPosition] = useState(0);

  useEffect(
    () => {
      const sub = scroll$
        .pipe(
          map(res => Object.values(res['path'])[1].scrollY),
          throttleTime(500, undefined, { trailing: true }),
        )
        .subscribe(setWindowPosition);

      if (srcImage === placeHolder) {
        if (
          parentRef.current.getBoundingClientRect().top + windowPosition <
          windowPosition + 1500
        ) {
          setSrcImage(src.webformatURL);
        }
      } else {
        sub.unsubscribe();
      }
      return () => sub.unsubscribe();
    },
    [windowPosition],
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

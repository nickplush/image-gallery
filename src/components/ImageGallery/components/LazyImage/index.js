import React, { useState, useEffect } from 'react';
import ModalWindow from '../../../ModalWindow';
import './lazyImage.css';

const placeHolder =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP0d/GvBwADLwFjI/tmIwAAAABJRU5ErkJggg==';

export const LazyImage = ({ src, alt, comment }) => {
  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(placeHolder);
  const [imageRef, setImageRef] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const onModalClose = () => {
    setOpen(false);
  };

  const onModalOpen = () => {
    setOpen(true);
  };

  const onLoad = event => {
    setIsLoaded(true);
  };

  const onError = event => {
    setHasError(true);
  };

  useEffect(
    () => {
      let observer;
      let didCancel = false;

      if (imageRef && imageSrc !== src.tiny) {
        if (IntersectionObserver) {
          observer = new IntersectionObserver(
            entries => {
              entries.forEach(entry => {
                if (!didCancel && (entry.intersectionRatio > 0 || entry.isIntersecting)) {
                  setImageSrc(src.tiny);
                  observer.unobserve(imageRef);
                }
              });
            },
            {
              threshold: 0.01,
            },
          );
          observer.observe(imageRef);
        } else {
          setImageSrc(src.tiny);
        }
      }
      return () => {
        didCancel = true;
        if (observer && observer.unobserve) {
          observer.unobserve(imageRef);
        }
      };
    },
    [src, imageSrc, imageRef],
  );
  return (
    <>
      <img
        src={imageSrc}
        alt={alt}
        onClick={onModalOpen}
        ref={setImageRef}
        onLoad={onLoad}
        onError={onError}
        className={`lazy-image ${isLoaded ? 'loaded' : ''} ${hasError ? 'has-error' : ''}`}
      />
      {open && <ModalWindow photo={src.large} comments={comment} onClose={onModalClose} />}
    </>
  );
};

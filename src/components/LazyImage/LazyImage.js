import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ModalWindow from '../modalWindow/ModalWindow';

const placeHolder =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP0d/GvBwADLwFjI/tmIwAAAABJRU5ErkJggg==';

const Image = styled.img`
  display: block;
  height: auto;
  width: 100%;

  @keyframes loaded {
    0% {
      opacity: 0.1;
    }
    100% {
      opacity: 1;
    }
  }

  &.loaded:not(.has-error) {
    animation: loaded 400ms ease-in-out;
  }

  &.has-error {
    content: url(${placeHolder});
  }
`;

export const LazyImage = ({ src, alt, comment }) => {
  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(placeHolder);
  const [imageRef, setImageRef] = useState();

  const onModalClose = () => {
    setOpen(false);
  };

  const onModalOpen = () => {
    setOpen(true);
  };

  const onLoad = event => {
    event.target.classList.add('loaded');
  };

  const onError = event => {
    event.target.classList.add('has-error');
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
      <Image
        src={imageSrc}
        alt={alt}
        onClick={onModalOpen}
        ref={setImageRef}
        onLoad={onLoad}
        onError={onError}
      />
      {open && <ModalWindow photo={src} comments={comment} onClose={onModalClose} />}
    </>
  );
};

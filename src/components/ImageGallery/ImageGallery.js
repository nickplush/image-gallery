import React, { useEffect, useState } from 'react';
import { LazyImage } from './components/LazyImage/LazyImage';
import { generateComment } from './helpers';
import { getImages } from '../../api/httpReq';
import { fromEvent } from 'rxjs';
import './ImageGallery.css';
import { map, throttleTime } from 'rxjs/operators';

const ImageGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [windowPosition, setWindowPosition] = useState(0);
  const scroll$ = fromEvent(window, 'scroll');

  useEffect(() => {
    const sub = scroll$
      .pipe(
        map(res => Object.values(res['path'])[1].scrollY),
        throttleTime(500, undefined, { trailing: true }),
      )
      .subscribe(setWindowPosition);
    const get = getImages().subscribe(setPhotos);
    return () => {
      get.unsubscribe();
      sub.unsubscribe();
    };
  }, []);

  return (
    <div>
      <div className="grid" id="table">
        {photos.map(photo => (
          <LazyImage
            key={photo.id}
            position={windowPosition}
            src={photo}
            alt="placeholder"
            comments={generateComment()}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;

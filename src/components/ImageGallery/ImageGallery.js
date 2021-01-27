import React, { useEffect, useState } from 'react';
import { LazyImage } from './components/LazyImage/LazyImage';
import { generateComment } from './helpers';
import { getImages } from '../../api/httpReq';
import './ImageGallery.css';

const ImageGallery = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const get = getImages().subscribe(setPhotos);
    return () => {
      get.unsubscribe();
    };
  }, []);

  return (
    <div>
      <div className="grid" id="table">
        {photos.map(photo => (
          <LazyImage key={photo.id} src={photo} alt="placeholder" comments={generateComment()} />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;

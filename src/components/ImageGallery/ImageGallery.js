import React,{useEffect, useState} from 'react';

import {LazyImage} from './components/LazyImage/LazyImage';
import {generateComment} from './helpers';
import {getImages} from "../../api/httpReq";
import './ImageGallery.css';

const ImageGallery = () => {
  const [photos, setPhotos] = useState([]);
  console.log('bbb',photos)

  useEffect(() => {
      getImages().subscribe(res=> setPhotos(res));
    return () => {
      setPhotos([]);
    };
  }, []);

    return (
        <div>
            <div className="grid">
                {photos.map(photo => (
                    <LazyImage
                        key={photo.id}
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

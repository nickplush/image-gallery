import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { LazyImage } from './components/LazyImage';
import { generateComment } from './helpers';
import axios from 'axios';
import './index.css';

function LazyContainer() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const getPhotos = async () => {
      const res = await axios.get('https://api.pexels.com/v1/search?query=nature&per_page=100', {
        headers: {
          Authorization: '563492ad6f9170000100000103bafd0a3dfe48508bc5c66b15bacbde',
        },
      });
      setPhotos(res.data.photos);
    };
    getPhotos();
    return () => {
      setPhotos([]);
    };
  }, []);

  return (
    <div>
      <div className="grid">
        {photos.map(photo => (
          <LazyImage key={photo.id} src={photo.src} alt="placeholder" comment={generateComment()} />
        ))}
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<LazyContainer />, rootElement);
export default LazyContainer;

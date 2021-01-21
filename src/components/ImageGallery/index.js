import './index.css';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { LazyImage } from './components/LazyImage';
import axios from 'axios';

const users = [
  'Gaudio F Bob',
  'Hoy Bob',
  'Loliya Bob',
  'Bob Bob',
  'Tameka C Bob',
  'James M Andre',
  'Nolan Andre',
];

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

  const generateComment = () => {
    let str =
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, soluta ea. Atque voluptatem dignissimos deleniti natus quae nisi neque earum, quis laboriosam repellendus ipsa est, hic accusantium corporis dolore quam.';
    let words = str.split(' ');

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }

    function createComment() {
      return {
        author: users[Math.floor(Math.random() * users.length)],
        text: words[getRandomInt(0, words.length)] + ' ' + words[getRandomInt(0, words.length)],
      };
    }

    let comment = [];
    for (let i = 0; i < getRandomInt(0, 10); i++) {
      comment.push(createComment());
    }
    return comment;
  };

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

import { USERS } from '../../../config';

export const generateComment = () => {
  const str =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, soluta ea. Atque voluptatem dignissimos deleniti natus quae nisi neque earum, quis laboriosam repellendus ipsa est, hic accusantium corporis dolore quam.';
  const words = str.split(' ');

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function createComment() {
    return {
      author: USERS[Math.floor(Math.random() * USERS.length)],
      text: words[getRandomInt(0, words.length)] + ' ' + words[getRandomInt(0, words.length)],
    };
  }

  let comment = [];
  for (let i = 0; i < getRandomInt(0, 10); i++) {
    comment.push(createComment());
  }
  return comment;
};

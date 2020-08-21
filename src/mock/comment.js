import {randomInteger, formatDate} from "../utils/common.js";

export const generateCommentMock = () => {
  const text = [
    `С пивом потянет`,
    `Книга лучше!`,
    `Стань разработчиком без регистрации и смс`,
    `Фильм улёт, кто понял концовку?`
  ];

  const emoji = [
    {
      path: `./images/emoji/angry.png`,
      alt: `angry`
    },
    {
      path: `./images/emoji/puke.png`,
      alt: `puke`
    },
    {
      path: `./images/emoji/sleeping.png`,
      alt: `sleeping`
    },
    {
      path: `./images/emoji/smile.png`,
      alt: `smile`
    }
  ];

  const authors = [
    `Петя`,
    `Маша`,
    `Даша`,
    `Глаша`
  ];

  return {
    text: text[randomInteger(0, text.length - 1)],
    emoji: emoji[randomInteger(0, emoji.length - 1)],
    author: authors[randomInteger(0, authors.length - 1)],
    date: formatDate(new Date()),
  };
};

export const getComments = (amount) => {
  let result = [];
  for (let i = 0; i < amount; i++) {
    result.push(generateCommentMock());
  }
  return result;
};

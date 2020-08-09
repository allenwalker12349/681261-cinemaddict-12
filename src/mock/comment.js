import {randomInteger, formatDate} from "../util.js";

export const generateCommentMock = () => {
  const text = [
    `С пивом потянет`,
    `Книга лучше!`,
    `Стань разработчиком без регистрации и смс`,
    `Фильм улёт, кто понял концовку?`
  ];

  const emoji = [
    `./images/emoji/angry.png`,
    `./images/emoji/puke.png`,
    `./images/emoji/sleeping.png`,
    `./images/emoji/smile.png`
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

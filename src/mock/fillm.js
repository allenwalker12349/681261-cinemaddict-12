export const filmCardMock = {
  filmsTitels: [
    `Унесённые ветром`,
    `Пираты Карибского моря`,
    `Охотники за приведениями`,
    `Один дома`,
    `Джанго освобожденный`
  ],
  filmsPosters: [
    `./images/posters/made-for-each-other.png`,
    `./images/posters/popeye-meets-sinbad.png`,
    `./images/posters/sagebrush-trail.jpg`,
    `./images/posters/santa-claus-conquers-the-martians.jpg`,
    `./images/posters/the-dance-of-life.jpg`,
    `./images/posters/the-great-flamarion.jpg`,
    `./images/posters/the-man-with-the-golden-arm.jpg`
  ],
  filmDescription: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`
  ],
};

const dataForComments = {
  commentsText: [
    `С пивом потянет`,
    `Книга лучше!`,
    `Стань разработчиком без регистрации и смс`,
    `Фильм улёт, кто понял концовку?`
  ],
  emojiImg: [
    `./images/emoji/angry.png`,
    `./images/emoji/puke.png`,
    `./images/emoji/sleeping.png`,
    `./images/emoji/smile.png`
  ],
  authors: [
    `Петя`,
    `Маша`,
    `Даша`,
    `Глаша`
  ],
};

function randomInteger(a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
}

export function getRandomArrayEl(data) {
  const randomNum = randomInteger(0, data.length - 1);
  return data[randomNum];
}

const formatDate = (date) => date.getFullYear() + `/` + (`0` + date.getDate()).slice(-2) + `/` + (`0` + (date.getMonth() + 1)).slice(-2) + ` ` + (`0` + date.getHours()).slice(-2) + `:` + (`0` + date.getMinutes()).slice(-2);

function generateCommentMock(text, emotion, author) {
  return {
    commentText: getRandomArrayEl(text),
    commentEmoji: getRandomArrayEl(emotion),
    commentAuthor: getRandomArrayEl(author),
    deleteButton: `<button class="film-details__comment-delete">Delete</button>`,
    date: formatDate(new Date()),
  };
}

function generateCommentsObj() {
  let tempArray = [];
  for (let i = 0; i < randomInteger(1, 5); i++) {
    let generatedElement = generateCommentMock(dataForComments.commentsText, dataForComments.emojiImg, dataForComments.authors);
    tempArray.push(generatedElement);
  }
  return tempArray;
}

/* export function generateDescription(data) {
  const randomNum = randomInteger(1, data.length - 1);
  let tempArray = [];
  let str;

  for (let i = 0; i < randomNum; i++) {
    tempArray.push(data[i]);
    str = tempArray.join(` `);
  }

  return str;
}  */

export const generateDescription = () => {
  return {
    title: getRandomArrayEl(filmCardMock.filmsTitels),
    poster: getRandomArrayEl(filmCardMock.filmsPosters),
    description: generateDescription(filmCardMock.filmDescription),
    comments: generateCommentsObj(),
  };
};

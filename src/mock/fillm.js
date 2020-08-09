const MAX_AMMOUNT_OF_COMMENTS = 5;
const MAX_AMMOUNT_OF_SENTENSES = 5;

function randomInteger(a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
}

const formatDate = (date) => date.getFullYear() + `/` + (`0` + date.getDate()).slice(-2) + `/` + (`0` + (date.getMonth() + 1)).slice(-2) + ` ` + (`0` + date.getHours()).slice(-2) + `:` + (`0` + date.getMinutes()).slice(-2);

const generateTitle = () => {
  const titles = [
    `Унесённые ветром`,
    `Пираты Карибского моря`,
    `Охотники за приведениями`,
    `Один дома`,
    `Джанго освобожденный`
  ];

  return titles[randomInteger(0, titles.length - 1)];
};

const generatePoster = () => {
  const filmsPosters = [
    `./images/posters/made-for-each-other.png`,
    `./images/posters/popeye-meets-sinbad.png`,
    `./images/posters/sagebrush-trail.jpg`,
    `./images/posters/santa-claus-conquers-the-martians.jpg`,
    `./images/posters/the-dance-of-life.jpg`,
    `./images/posters/the-great-flamarion.jpg`,
    `./images/posters/the-man-with-the-golden-arm.jpg`
  ];

  return filmsPosters[randomInteger(0, filmsPosters.length - 1)];
};

const generateDescription = () => {
  let result = [];
  const amountOfSentensesToGenerate = randomInteger(1, MAX_AMMOUNT_OF_SENTENSES);

  const filmDescription = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`
  ];

  for (let i = 0; i < amountOfSentensesToGenerate; i++) {
    result.push(filmDescription[randomInteger(0, filmDescription.length - 1)]);
  }

  return result.join(` `);
};

const generateCommentMock = () => {
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
    authors: authors[randomInteger(0, authors.length - 1)],
    deleteButton: `<button class="film-details__comment-delete">Delete</button>`,
    date: formatDate(new Date()),
  };
};

function generateCommentsForCard() {
  let result = [];

  for (let i = 0; i < randomInteger(1, MAX_AMMOUNT_OF_COMMENTS); i++) {
    result.push(generateCommentMock());
  }

  return result;
}

export const generateCardMock = () => {
  return {
    title: generateTitle(),
    poster: generatePoster(),
    description: generateDescription(),
  };
};

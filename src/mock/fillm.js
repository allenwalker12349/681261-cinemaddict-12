import {randomInteger} from "../util.js";

const MAX_AMMOUNT_OF_SENTENSES = 5;

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

export const generateCardMock = () => {
  return {
    title: generateTitle(),
    poster: generatePoster(),
    description: generateDescription(),
  };
};

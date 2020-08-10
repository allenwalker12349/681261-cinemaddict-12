import {randomInteger} from "../util.js";

const MAX_AMMOUNT_OF_SENTENSES = 5;
const RAITING = {
  MIN: 1,
  MAX: 10,
};
const YEAR = {
  MIN: 1929,
  MAX: 2020,
};

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

const generateFilmRaiting = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  let int = Math.random() * (max - min) + min;
  return int.toFixed(1);
};

const generateDuration = () => {
  return {
    hours: randomInteger(RAITING.MIN, RAITING.MAX),
    minutes: randomInteger(RAITING.MIN, RAITING.MAX),
  };
};

const generateGenre = () => {
  const geners = [
    ` music`,
    ` horror`,
    ` action`,
    ` drama`
  ];
  const randomNum = randomInteger(1, geners.length - 1);
  let result = [];
  for (let i = 1; i <= randomNum; i++) {
    result.push(geners[i]);
  }
  return result;
};

const generateOriginTitle = () => {
  const titles = [
    `film1`,
    `film2`,
    `film3`
  ];
  return titles[randomInteger(0, titles.length - 1)];
};

const generateDirector = () => {
  const directors = [
    `Director1`,
    `Director2`,
    `Director3`
  ];
  return directors[randomInteger(0, directors.length - 1)];
};

const generateCountry = () => {
  const countries = [
    `USA`,
    `USSR`,
    `Canada`
  ];
  return countries[randomInteger(0, countries.length - 1)];
};

const generateActors = () => {
  const actors = [
    `Actor 1`,
    `Actor 2`,
    `Actor 3`
  ];
  const randomNum = randomInteger(0, actors.length - 1);
  let result = [];
  for (let i = 0; i <= randomNum; i++) {
    result.push(actors[i]);
  }
  return result.join(` `);
};

const generateWriters = () => {
  const writers = [
    `Writer 1`,
    `Writer 2`,
    `Writer 3`
  ];
  const randomNum = randomInteger(0, 3);
  let result = [];
  for (let i = 0; i <= randomNum; i++) {
    result.push(writers[i]);
  }
  return result.join(` `);
};

const generateFilmDate = () => {
  const months = [
    `Jun`,
    `Jul`,
    `Aug`
  ];
  const year = randomInteger(1929, 2020);
  const month = months[randomInteger(0, months.length - 1)];
  const day = randomInteger(1, 31);
  return day + ` ` + month + ` ` + year;
};

export const generateCardMock = () => {
  return {
    title: generateTitle(),
    poster: generatePoster(),
    description: generateDescription(),
    raiting: generateFilmRaiting(RAITING.MIN, RAITING.MAX),
    year: randomInteger(YEAR.MIN, YEAR.MAX),
    duration: generateDuration(),
    gener: generateGenre(),
    originTitle: generateOriginTitle(),
    director: generateDirector(),
    actors: generateActors(),
    writers: generateWriters(),
    country: generateCountry(),
    date: generateFilmDate(),
    age: randomInteger(7, 18) + `+`,
  };
};

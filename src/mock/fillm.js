import {randomInteger} from "../util.js";
import {getComments} from "./comment.js";

const MAX_AMMOUNT_OF_SENTENSES = 5;
const RAITING = {
  MIN: 1,
  MAX: 10,
};

const DURATION = {
  HOURS: {
    MIN: 1,
    MAX: 3
  },
  MINUTES: {
    MIN: 1,
    MAX: 59
  }
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
    hours: randomInteger(DURATION.HOURS.MIN, DURATION.HOURS.MAX),
    minutes: randomInteger(DURATION.MINUTES.MIN, DURATION.MINUTES.MAX),
  };
};

const generateGenre = () => {
  const genres = [
    `music`,
    `horror`,
    `action`,
    `drama`
  ];
  const randomNum = randomInteger(1, genres.length - 1);
  return new Array(randomNum).fill().map(function (i) {
    i = genres[randomInteger(0, genres.length - 1)];
    return i;
  });
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
  return result;
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
  const today = new Date(Date.now());
  return new Date(today.getFullYear() - randomInteger(1, 50),
      today.getMonth() + Math.random() * randomInteger(1, 12),
      today.getDate() + Math.random() * randomInteger(1, 31),
      Math.random(),
      Math.random() * 60);
};

const generateCardMock = () => {
  return {
    title: generateTitle(),
    poster: generatePoster(),
    description: generateDescription(),
    raiting: generateFilmRaiting(RAITING.MIN, RAITING.MAX),
    duration: generateDuration(),
    genre: generateGenre(),
    originTitle: generateOriginTitle(),
    director: generateDirector(),
    actors: generateActors(),
    writers: generateWriters(),
    country: generateCountry(),
    releaseDate: generateFilmDate(),
    ageRating: randomInteger(7, 18),
    comments: getComments(randomInteger(1, 5)),
  };
};

export const getFilmCards = (amount) => {
  let result = [];
  for (let i = 0; i < amount; i++) {
    result.push(generateCardMock());
  }
  return result;
};

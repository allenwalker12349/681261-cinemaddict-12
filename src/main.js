import {createProfileTemplate} from "./view/profile.js";
import {createNavigation} from "./view/navigation.js";
import {createSort} from "./view/sort.js";
import {createFilmsContainer} from "./view/films_container.js";
import {createFilmCard} from "./view/film_card.js";
import {createShowMoreButton} from "./view/show_more_button.js";
import {createExtraFilmBlock} from "./view/extra_film_block.js";
import {createStatistic} from "./view/statistic.js";
import {createDetailInfo} from "./view/detail_info.js";

const CARDS_AMOUNT = 5;
const EXTRA_CONTAINER_AMOUNT = 2;
const CARDS_IN_EXTRA_BLOCK_AMOUNT = 2;


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeader = document.querySelector(`.header`);
render(siteHeader, createProfileTemplate(), `beforeend`);

const siteMain = document.querySelector(`main`);
render(siteMain, createNavigation(), `beforeend`);
render(siteMain, createSort(), `beforeend`);
render(siteMain, createFilmsContainer(), `beforeend`);

const filmList = siteMain.querySelector(`.films-list`);
const cardsContainer = filmList.querySelector(`.films-list__container`);
for (let index = 0; index < CARDS_AMOUNT; index++) {
  render(cardsContainer, createFilmCard(), `beforeend`);
}

render(cardsContainer, createShowMoreButton(), `afterend`);

const filmContainer = siteMain.querySelector(`.films`);

for (let index = 0; index < EXTRA_CONTAINER_AMOUNT; index++) {
  render(filmContainer, createExtraFilmBlock(), `beforeend`);
}

const extraFilmContainers = siteMain.querySelectorAll(`.films-list--extra`);
extraFilmContainers.forEach((element) => {
  const containerToInsertCards = element.querySelector(`.films-list__container`);
  for (let index = 0; index < CARDS_IN_EXTRA_BLOCK_AMOUNT; index++) {
    render(containerToInsertCards, createFilmCard(), `beforeend`);
  }
});

const siteFooter = document.querySelector(`.footer`);
render(siteFooter, createStatistic(), `beforeend`);

render(siteMain, createDetailInfo(), `beforeend`);

const closeModalButton = document.querySelector(`.film-details__close-btn`);
closeModalButton.addEventListener(`click`, function () {
  document.querySelector(`.film-details`).style.display = `none`;
});


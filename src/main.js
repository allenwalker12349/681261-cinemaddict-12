import SiteProfileView from "./view/profile.js";
import NavigationContainer from "./view/navigation_container.js";
import NavigationList from "./view/navigation_list";
import StatsButton from "./view/stats_button.js";
import Sort from "./view/sort.js";
import AllFilmContainer from "./view/all_films_container.js";
import FilmList from "./view/film_list.js";
import CardsContainer from "./view/cards_container.js";
import FilmCard from "./view/film_card.js";
import ShowMoreButton from "./view/show_more_button.js";
import Statistic from "./view/statistic.js";
import {randomInteger} from "./util.js";
import {getFilmCards} from "./mock/fillm.js";
import {getComments} from "./mock/comment.js";
import {renderTemplate, renderElement, renderPosition} from "./util.js";

const CARDS_AMOUNT = 17;
const CARD_COUNT_PER_STEP = 5;
let renderedCardsCount = CARD_COUNT_PER_STEP;
export const filmCards = getFilmCards(CARDS_AMOUNT);
const comments = getComments(randomInteger(1, 5));


// рендер хедера
const siteHeader = document.querySelector(`.header`);
renderElement(siteHeader, new SiteProfileView().getElement(), renderPosition.BEFOREEND);

// рендер навигации
const siteMain = document.querySelector(`main`);
renderElement(siteMain, new NavigationContainer().getElement(), renderPosition.BEFOREEND);
const navigationContainer = siteMain.querySelector(`.main-navigation`);
renderElement(navigationContainer, new NavigationList().getElement(), renderPosition.BEFOREEND);
renderElement(navigationContainer, new StatsButton().getElement(), renderPosition.BEFOREEND);

// рендер сортировки
renderElement(siteMain, new Sort().getElement(), renderPosition.BEFOREEND);

// рендер контейнера для карточек
const allCardsConatiner = new AllFilmContainer();
const filmsUpcomung = new FilmList();
const cardsContainer = new CardsContainer();
renderElement(siteMain, allCardsConatiner.getElement(), renderPosition.BEFOREEND);
renderElement(allCardsConatiner.getElement(), filmsUpcomung.getElement(), renderPosition.BEFOREEND);
renderElement(filmsUpcomung.getElement(), cardsContainer.getElement(), renderPosition.BEFOREEND);

// рендер карточек
for (let index = 0; index < Math.min(filmCards.length, CARD_COUNT_PER_STEP); index++) {
  renderElement(cardsContainer.getElement(), new FilmCard(filmCards[index]).getElement(), renderPosition.BEFOREEND);
}

if (filmCards.length > CARD_COUNT_PER_STEP) {
  renderElement(filmsUpcomung.getElement(), new ShowMoreButton().getElement(), renderPosition.BEFOREEND);
  const showMoreButton = siteMain.querySelector(`.films-list__show-more`);
  showMoreButton.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    filmCards
    .slice(renderedCardsCount, renderedCardsCount + CARD_COUNT_PER_STEP)
    .forEach((card) => renderElement(cardsContainer.getElement(), new FilmCard(card).getElement(), renderPosition.BEFOREEND));
    renderedCardsCount += CARD_COUNT_PER_STEP;
    if (renderedCardsCount >= filmCards.length) {
      showMoreButton.remove();
    }
  });
}

const footerContainer = document.querySelector(`.footer__statistics`);
renderElement(footerContainer, new Statistic().getElement(), renderPosition.BEFOREEND);

siteMain.querySelector(`.film-details__comments-count`).innerHTML = comments.length;


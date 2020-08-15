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
import DetailInfo from "./view/detail_info";
import {randomInteger} from "./util.js";
import {getFilmCards} from "./mock/fillm.js";
import {getComments} from "./mock/comment.js";
import {render, renderPosition} from "./util.js";

const CARDS_AMOUNT = 17;
const CARD_COUNT_PER_STEP = 5;
let renderedCardsCount = CARD_COUNT_PER_STEP;
export const filmCards = getFilmCards(CARDS_AMOUNT);
const comments = getComments(randomInteger(1, 5));


// рендер хедера
const siteHeader = document.querySelector(`.header`);
render(siteHeader, new SiteProfileView().getElement(), renderPosition.BEFOREEND);

// рендер навигации
const siteMain = document.querySelector(`main`);
render(siteMain, new NavigationContainer().getElement(), renderPosition.BEFOREEND);
const navigationContainer = siteMain.querySelector(`.main-navigation`);
render(navigationContainer, new NavigationList().getElement(), renderPosition.BEFOREEND);
render(navigationContainer, new StatsButton().getElement(), renderPosition.BEFOREEND);

// рендер сортировки
render(siteMain, new Sort().getElement(), renderPosition.BEFOREEND);

// рендер контейнера для карточек
const allCardsConatiner = new AllFilmContainer();
const filmsUpcomung = new FilmList();
const cardsContainer = new CardsContainer();
render(siteMain, allCardsConatiner.getElement(), renderPosition.BEFOREEND);
render(allCardsConatiner.getElement(), filmsUpcomung.getElement(), renderPosition.BEFOREEND);
render(filmsUpcomung.getElement(), cardsContainer.getElement(), renderPosition.BEFOREEND);

// рендер карточек

const renderTask = (cardListElement, card) => {
  const cardComponent = new FilmCard(card);
  const detailInfo = new DetailInfo(card);

  cardComponent.getElement().querySelector(`img`).addEventListener(`click`, function () {
    siteMain.appendChild(detailInfo.getElement());
  });

  cardComponent.getElement().querySelector(`.film-card__title`).addEventListener(`click`, function () {
    siteMain.appendChild(detailInfo.getElement());
  });

  cardComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, function () {
    siteMain.appendChild(detailInfo.getElement());
  });

  detailInfo.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, function () {
    siteMain.removeChild(detailInfo.getElement());
  });

  render(cardListElement, cardComponent.getElement(), renderPosition.BEFOREEND);
};

for (let index = 0; index < Math.min(filmCards.length, CARD_COUNT_PER_STEP); index++) {
  renderTask(cardsContainer.getElement(), filmCards[index]);
}

if (filmCards.length > CARD_COUNT_PER_STEP) {
  render(filmsUpcomung.getElement(), new ShowMoreButton().getElement(), renderPosition.BEFOREEND);
  const showMoreButton = siteMain.querySelector(`.films-list__show-more`);
  showMoreButton.addEventListener(`click`, function (evt) {
    evt.preventDefault();
    filmCards
    .slice(renderedCardsCount, renderedCardsCount + CARD_COUNT_PER_STEP)
    .forEach((card) => renderTask(cardsContainer.getElement(), card));
    renderedCardsCount += CARD_COUNT_PER_STEP;
    if (renderedCardsCount >= filmCards.length) {
      showMoreButton.remove();
    }
  });
}

const footerContainer = document.querySelector(`.footer__statistics`);
render(footerContainer, new Statistic().getElement(), renderPosition.BEFOREEND);


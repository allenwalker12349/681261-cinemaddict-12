import SiteProfileView from "./view/profile.js";
import NavigationContainer from "./view/navigation-container.js";
import NavigationList from "./view/navigation-list";
import StatsButton from "./view/stats-button.js";
import Sort from "./view/sort.js";

import ShowMoreButton from "./view/show-more-button.js";
import Statistic from "./view/statistic.js";

import Comment from "./view/comment.js";
import {getFilmCards} from "./mock/fillm.js";
import {render, renderPosition} from "./utils/render.js";
import FilmsContainer from "./presenter/move-list.js";

const CARDS_AMOUNT = 17;
const CARD_COUNT_PER_STEP = 5;
let renderedCardsCount = CARD_COUNT_PER_STEP;
export const filmCards = getFilmCards(CARDS_AMOUNT);


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

const filmsContainterPresenter = new FilmsContainer(siteMain);
filmsContainterPresenter.init(filmCards);

// рендер карточек
/*

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

  const CommentList = detailInfo.getElement().querySelector(`.film-details__comments-list`);
  detailInfo.getElement().querySelector(`.film-details__comments-count`).innerHTML = card.comments.length;
  card.comments.forEach((comment) => render(CommentList, new Comment(comment).getElement(), renderPosition.BEFOREEND));

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
*/

const footerContainer = document.querySelector(`.footer__statistics`);
render(footerContainer, new Statistic().getElement(), renderPosition.BEFOREEND);


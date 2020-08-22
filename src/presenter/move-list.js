import AllFilmContainer from "../view/all-films-container.js";
import FilmList from "../view/film-list.js";
import CardsContainer from "../view/cards-container.js";
import FilmCard from "../view/film-card.js";
import DetailInfo from "../view/detail-info";
import {render, renderPosition} from "../utils/render.js";
import ShowMoreButton from "../view/show-more-button.js";

const CARD_COUNT_PER_STEP = 5;

export default class FilmsContainer {
  constructor(filmsContainer) {
    this._filmsConainer = filmsContainer;

    this._allCardsContainer = new AllFilmContainer();
    this._filmsUpcomung = new FilmList();
    this._cardsContainer = new CardsContainer();
    this._showMoreButton = new ShowMoreButton();
  }

  init(films) {
    this._filmsCard = films.slice();
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js
    this._renderFilmsContainer();
    this._renderFilmCards(this._filmsCard);
    this._showoreButton(this._filmsCard);
  }

  _renderCard(card) {
    const cardComponent = new FilmCard(card);
    const detailInfo = new DetailInfo(card);
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        this._filmsConainer.removeChild(detailInfo.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    render(this._cardsContainer, cardComponent, renderPosition.BEFOREEND);
    cardComponent.setImgClickHandler(() => {
      this._filmsConainer.appendChild(detailInfo.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    cardComponent.setTitleClickHandler(() => {
      this._filmsConainer.appendChild(detailInfo.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    cardComponent.setCommentClickHandler(() => {
      this._filmsConainer.appendChild(detailInfo.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    detailInfo.setCloseBtnClickHandler(() => {
      this._filmsConainer.removeChild(detailInfo.getElement());
    });

    detailInfo._setCommentsAmount();
    detailInfo._renderComments();
  }

  _renderFilmCards(films) {
    for (let i = 0; i < Math.min(films.length, CARD_COUNT_PER_STEP); i++) {
      this._renderCard(films[i]);
    }
  }

  _showoreButton(films) {
    let renderedCardsCount = CARD_COUNT_PER_STEP;
    if (films.length > CARD_COUNT_PER_STEP) {
      render(this._filmsUpcomung, this._showMoreButton, renderPosition.BEFOREEND);
      this._showMoreButton.setClickHandler(() => {
        films
        .slice(renderedCardsCount, renderedCardsCount + CARD_COUNT_PER_STEP)
        .forEach((card) => this._renderCard(card));
        renderedCardsCount += CARD_COUNT_PER_STEP;
        if (renderedCardsCount >= films.length) {
          this._showMoreButton.getElement().remove();
        }
      });
    }
  }

  _renderFilmsContainer() {
    render(this._filmsConainer, this._allCardsContainer, renderPosition.BEFOREEND);
    render(this._allCardsContainer, this._filmsUpcomung, renderPosition.BEFOREEND);
    render(this._filmsUpcomung, this._cardsContainer, renderPosition.BEFOREEND);
  }
}

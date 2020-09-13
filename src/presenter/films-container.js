import AllFilmContainer from "../view/all-films-container.js";
import FilmList from "../view/film-list.js";
import CardsContainer from "../view/cards-container.js";
import {render, renderPosition} from "../utils/render.js";
import ShowMoreButton from "../view/show-more-button.js";
import FilmCardPresenter from "./film-card-presenter.js";
import {updateItem} from "../utils/common.js";

const CARD_COUNT_PER_STEP = 5;

export default class FilmsContainer {
  constructor(filmsContainer, cardsModel) {
    this._cardsModel = cardsModel;
    this._filmsConainer = filmsContainer;
    this._filmPresenter = {};
    this._renderedCardsCount = CARD_COUNT_PER_STEP;

    this._allCardsContainer = new AllFilmContainer();
    this._filmsUpcomung = new FilmList();
    this._cardsContainer = new CardsContainer();
    this._showMoreButton = new ShowMoreButton();

    this._handleCardChange = this._handleCardChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(films) {
    this._filmsCard = films.slice();
    this._sourceFilmCards = films.slice();
    this._renderFilmsContainer();
    this._renderFilmCards(this._filmsCard);
    this._showoreButton(this._filmsCard);
  }

  _getCards() {
    return this._cardsModel.getTasks();
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleCardChange(updatedCard) {
    this._filmsCard = updateItem(this._filmsCard, updatedCard);
    this._sourceFilmCards = updateItem(this._sourceFilmCards, updatedCard);
    this._filmPresenter[updatedCard.id].init(updatedCard);
  }

  _renderCard(film) {
    const cardPresenter = new FilmCardPresenter(this._cardsContainer, this._handleCardChange, this._handleModeChange);
    cardPresenter.init(film);
    this._filmPresenter[film.id] = cardPresenter;
  }

  _renderFilmCards(films) {
    for (let i = 0; i < Math.min(films.length, CARD_COUNT_PER_STEP); i++) {
      this._renderCard(films[i]);
    }
  }

  _showoreButton(films) {
    if (films.length > CARD_COUNT_PER_STEP) {
      render(this._filmsUpcomung, this._showMoreButton, renderPosition.BEFOREEND);
      this._showMoreButton.setClickHandler(() => {
        films
        .slice(this._renderedCardsCount, this._renderedCardsCount + CARD_COUNT_PER_STEP)
        .forEach((card) => this._renderCard(card));
        this._renderedCardsCount += CARD_COUNT_PER_STEP;
        if (this._renderedCardsCount >= films.length) {
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

  _clearCardList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedCardsCount = CARD_COUNT_PER_STEP;
  }
}

import AllFilmContainer from "../view/all-films-container.js";
import FilmList from "../view/film-list.js";
import CardsContainer from "../view/cards-container.js";
import {render, renderPosition} from "../utils/render.js";
import ShowMoreButton from "../view/show-more-button.js";
import FilmCardPresenter from "./film-card-presenter.js";
import Sort from "../view/sort.js";
import {sortByDate, sortByRating} from "../utils/films.js";
import {SortType, UserAction, UpdateType} from "../const.js";
import {filter} from "../utils/filter.js";

const CARD_COUNT_PER_STEP = 5;
const siteMain = document.querySelector(`main`);

export default class FilmsContainer {
  constructor(filmsContainer, cardsModel, filterModel) {
    this._cardsModel = cardsModel;
    this._filterModel = filterModel;
    this._filmsConainer = filmsContainer;
    this._filmPresenter = {};
    this._renderedCardsCount = 0;
    this._currentSortType = SortType.DEFAULT;

    this._allCardsContainer = new AllFilmContainer();
    this._filmsUpcomung = new FilmList();
    this._cardsContainer = new CardsContainer();
    this._showMoreButton = new ShowMoreButton();

    this._handleCardChange = this._handleCardChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._cardsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderFilmList();
  }

  _renderFilmList() {
    this._renderSort();
    this._renderFilmsContainer();
    this._renderFilmCards(this._getCards().slice(this._renderedCardsCount, CARD_COUNT_PER_STEP));
    this._renderedCardsCount = CARD_COUNT_PER_STEP;
    this._showoreButton();
  }

  _renderSort() {
    this._sortComponent = new Sort();

    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(siteMain, this._sortComponent, renderPosition.BEFOREEND);
  }

  _getCards() {
    const filterType = this._filterModel.getFilter();
    const cards = this._cardsModel.getFilms();
    const filtredCards = filter[filterType](cards);

    switch (this._currentSortType) {
      case SortType.RAITING:
        return filtredCards.sort(sortByRating);
      case SortType.DATE:
        return filtredCards.sort(sortByDate);
    }
    return filtredCards;
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleCardChange(updatedCard) {
    this._filmPresenter[updatedCard.id].init(updatedCard);
  }

  _renderCard(film) {
    const cardPresenter = new FilmCardPresenter(this._cardsContainer, this._handleViewAction, this._handleModeChange);
    cardPresenter.init(film);
    this._filmPresenter[film.id] = cardPresenter;
  }

  _renderFilmCards(films) {
    films.forEach((film) => this._renderCard(film));
  }

  _showoreButton() {
    const cardCount = this._getCards().length;
    if (cardCount > CARD_COUNT_PER_STEP) {
      render(this._filmsUpcomung, this._showMoreButton, renderPosition.BEFOREEND);
      this._showMoreButton.setClickHandler(() => {
        this._handelShowMoreButtonClick();
      });
    }
  }

  _handelShowMoreButtonClick() {
    const cardCount = this._getCards().length;
    const newRenderedCardCount = Math.min(cardCount, this._renderedCardsCount + CARD_COUNT_PER_STEP);
    const cards = this._getCards().slice(this._renderedCardsCount, newRenderedCardCount);
    this._renderFilmCards(cards);
    this._renderedCardsCount = newRenderedCardCount;
    if (this._renderedCardsCount >= cardCount) {
      this._showMoreButton.getElement().remove();
    }
  }

  _renderFilmsContainer() {
    render(this._filmsConainer, this._allCardsContainer, renderPosition.BEFOREEND);
    render(this._allCardsContainer, this._filmsUpcomung, renderPosition.BEFOREEND);
    render(this._filmsUpcomung, this._cardsContainer, renderPosition.BEFOREEND);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._sortComponent.setActiveButton(this._currentSortType);
    this._clearCardList();
    this._handelShowMoreButtonClick();
    this._showoreButton();
  }

  _clearCardList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedCardsCount = 0;
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._cardsModel.updateFilm(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {

      case UpdateType.PATCH:
        // обновляет карточку
        this._filmPresenter[data.id].init(data);
        break;

      case UpdateType.MINOR:
        // - обновить список
        this._clearCardList();
        this._handelShowMoreButtonClick();
        this._showoreButton();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску
        this._clearCardList({resetRenderedFilmCount: true, resetSortType: true});
        this._handelShowMoreButtonClick();
        this._showoreButton();
        break;
    }
  }
}

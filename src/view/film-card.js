import AbstractView from "./abstract.js";

const ACTIVE_CLASS = {
  WATCHED: `film-card__controls-item--active`,
  FAVORITE: `film-card__controls-item--active`,
  IN_LIST: `film-card__controls-item--active`
};

const renderCardDescription = (data) => {
  let result;
  if (data.length > 139) {
    result = data.slice(1, 139);
  } else {
    result = data;
  }
  return result + `...`;
};

const createFilmCard = (cardData, comments) => {
  const {title, poster, description, raiting, releaseDate, duration, genre, isWatched, isInWatchList, isInFavorite} = cardData;
  return (`<article class="film-card">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${raiting}</p>
  <p class="film-card__info">
    <span class="film-card__year">${releaseDate.getFullYear()}</span>
    <span class="film-card__duration">${duration.hours}h ${duration.minutes}m</span>
    <span class="film-card__genre">${genre[0]}</span>
  </p>
  <img src="${poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${renderCardDescription(description)}</p>
  <a class="film-card__comments">${comments.length} comments</a>
  <form class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isInWatchList ? ACTIVE_CLASS.IN_LIST : ``}">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatched ? ACTIVE_CLASS.WATCHED : ``}">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite ${isInFavorite ? ACTIVE_CLASS.FAVORITE : ``}">Mark as favorite</button>
  </form>
  </article>`);
};

export default class FilmCard extends AbstractView {
  constructor(films, comments) {
    super();
    this._films = films;
    this._comments = comments;
    this._clickHandler = this._clickHandler.bind(this);
    this._markWatchedHandler = this._markWatchedHandler.bind(this);
    this._addToWatchListHandler = this._addToWatchListHandler.bind(this);
    this._addToFavoriteHandler = this._addToFavoriteHandler.bind(this);
  }

  getTemplate() {
    return createFilmCard(this._films, this._comments);
  }

  _markWatchedHandler(evt) {
    evt.preventDefault();
    this._callback.markWatched();
  }

  _addToWatchListHandler(evt) {
    evt.preventDefault();
    this._callback.addToWatchList();
  }

  _addToFavoriteHandler(evt) {
    evt.preventDefault();
    this._callback.addToFavorite();
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.showDetailInfo();
  }

  setWatchedClickHandler(callback) {
    this._callback.markWatched = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._markWatchedHandler);
  }

  setAddToWatchListHandler(callback) {
    this._callback.addToWatchList = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._addToWatchListHandler);
  }

  setAddToFavoriteHandler(callback) {
    this._callback.addToFavorite = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._addToFavoriteHandler);
  }

  setImgClickHandler(callback) {
    this._callback.showDetailInfo = callback;
    this.getElement().querySelector(`img`).addEventListener(`click`, this._clickHandler);
  }

  setTitleClickHandler(callback) {
    this._callback.showDetailInfo = callback;
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._clickHandler);
  }

  setCommentClickHandler(callback) {
    this._callback.showDetailInfo = callback;
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._clickHandler);
  }
}


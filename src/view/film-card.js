import AbstractView from "./abstract.js";

const renderCardDescription = (data) => {
  let result;
  if (data.length > 139) {
    result = data.slice(1, 139);
  } else {
    result = data;
  }
  return result + `...`;
};

const createFilmCard = (cardData) => {
  const {title, poster, description, raiting, releaseDate, duration, genre, comments} = cardData;
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
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
  </form>
  </article>`);
};

export default class FilmCard extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCard(this._films);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.showDetailInfo();
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


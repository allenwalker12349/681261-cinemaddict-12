import AbstractView from "./abstract.js";

const ACTIVE_ATRIBUTE = `checked`;

const createDetailInfo = (cardData) => {
  const {title, poster, description, raiting, duration, genre, originTitle, director, actors, writers,
    country, releaseDate, ageRating, isWatched, isInWatchList, isInFavorite} = cardData;

  let genreString = `Genre`;
  if (genre.length > 1) {
    genreString = `Genres`;
  }

  const renderGenres = () => {
    return genre.join(`, `);
  };

  const renderDate = (data) => {
    const month = [`Января`, `Февраля`, `Марта`, `Апреля`, `Мая`, `Июня`, `Июля`, `Августа`, `Сентября`, `Октября`,
      `Ноября`, `Декабря`];
    return data.getDate() + ` ` + month[data.getMonth()] + ` ` + data.getFullYear();
  };

  const renderActors = (data) => {
    return data.join(` `);
  };

  return (`<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">${ageRating + `+`}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">${originTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${raiting}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${renderActors(actors)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release date</td>
              <td class="film-details__cell">${renderDate(releaseDate)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${duration.hours}h ${duration.minutes}m</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${genreString}</td>
              <td class="film-details__cell">
              ${renderGenres()}
              </td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" ${isInWatchList ? ACTIVE_ATRIBUTE : ``} class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
        <label for="watchlist"  class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" ${isWatched ? ACTIVE_ATRIBUTE : ``} class="film-details__control-input visually-hidden" id="watched" name="watched">
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" ${isInFavorite ? ACTIVE_ATRIBUTE : ``} class="film-details__control-input visually-hidden" id="favorite" name="favorite">
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
  </section>`);
};

export default class DetailInfo extends AbstractView {
  constructor(filmData) {
    super();
    this._filmData = filmData;
    this._clickHandler = this._clickHandler.bind(this);
    this._markWatchedHandler = this._markWatchedHandler.bind(this);
    this._addToWatchListHandler = this._addToWatchListHandler.bind(this);
    this._addToFavoriteHandler = this._addToFavoriteHandler.bind(this);
    this._updateCommentCount = this._updateCommentCount.bind(this);
  }

  getTemplate() {
    return createDetailInfo(this._filmData);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.closeDetailInfo();
  }

  _inputChangeHandler(evt) {
    evt.preventDefault();
    this._callback.updateInfo();
  }

  setCloseBtnClickHandler(callback) {
    this._callback.closeDetailInfo = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._clickHandler);
  }

  setInputChange(callback) {
    this._callback.updateInfo = callback;
    this.getElement().querySelectorAll(`.film-details__controls input[type='checkbox']`).forEach((input) => {
      input.addEventListener(`change`, this._inputChangeHandler);
    });
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

  setWatchedClickHandler(callback) {
    this._callback.markWatched = callback;
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this._markWatchedHandler);
  }

  setAddToWatchListHandler(callback) {
    this._callback.addToWatchList = callback;
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, this._addToWatchListHandler);
  }

  setAddToFavoriteHandler(callback) {
    this._callback.addToFavorite = callback;
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, this._addToFavoriteHandler);
  }

  _updateCommentCount(comments) {
    this.getElement().querySelector(`.film-details__comments-count`).innerText = comments.length;
  }
}

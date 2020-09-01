import Comment from "../view/comment.js";
import {render, renderPosition} from "../utils/render.js";
import Abstract from "./abstract.js";

const ACTIVE_ATRIBUTE = `checked`;
const createDetailInfo = (cardData) => {
  const {title, poster, description, raiting, duration, genre, originTitle, director, actors, writers,
    country, releaseDate, ageRating, comments, isInWatchList, isFavorite, isWatched} = cardData;

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
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isInWatchList ? ACTIVE_ATRIBUTE : ``}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
        </ul>

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

export default class DetailInfo extends Abstract {
  constructor(filmData) {
    super();
    this._filmData = filmData;
    this._clickHandler = this._clickHandler.bind(this);
  }

  resotreHandlers() {

  }

  getTemplate() {
    return createDetailInfo(this._filmData);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.closeDetailInfo();
  }

  setCloseBtnClickHandler(callback) {
    this._callback.closeDetailInfo = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._clickHandler);
  }

  renderComments() {
    const commentsContainer = this.getElement().querySelector(`.film-details__comments-list`);
    this._filmData.comments.forEach((comment) => {
      render(commentsContainer, new Comment(comment), renderPosition.BEFOREEND);
    });
  }

  setEmojiClickHandler() {
    const currentEmoji = this.getElement().querySelector(`.film-details__add-emoji-label`);
    this.getElement().querySelectorAll(`.film-details__emoji-item`).forEach((el) => {
      el.addEventListener(`click`, (evt) => {
        currentEmoji.innerHTML = `<img src="images/emoji/${evt.target.value}.png" width="55" height="55" alt="emoji-${evt.target.value}"></img>`;
        this._selectedEmotion = evt.target.value; 
      })
    });
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`keydown`, (evt) => {
      
      if (evt.key === `Enter`) {
        //проверка на пустую эмоцию
        
        const commentText =  evt.target.value;
        const comment = {
          text: commentText,
          emoji: {
            path: `./images/emoji/${this._selectedEmotion}.png`,
            alt: this._selectedEmotion,
          },
          author: 'Вася',
          date: new Date(),
        };
        this._filmData.comments.push(comment);
        const oldElement = this.getElement();
      }
    })
  }
}

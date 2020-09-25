
import AbstractView from "./abstract.js";
import {formatDate} from "../utils/common.js";

const createCommentItem = (data) => {
  const {text, emoji, author, date} = data;
  return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="${emoji.path}" alt="${emoji.alt}" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${formatDate(date)}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
};

export default class Comment extends AbstractView {
  constructor(comments) {
    super();
    this._comment = comments;
  }

  getTemplate() {
    return createCommentItem(this._comment);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  _commentDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(this._comment);
  }

  setCommentDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement()
        .querySelector(`.film-details__comment-delete`)
        .addEventListener(`click`, this._commentDeleteClickHandler);
  }
}

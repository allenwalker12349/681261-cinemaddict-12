
import {createElement} from "../util.js";

const createCommentItem = (data) => {
  const {text, emoji, author, date} = data;
  return `
  <li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="${emoji.path}" alt="${emoji.alt}" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${date}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>
  `;
};

export default class CommentItem {
  constructor(comments) {
    this._element = null;
    this._comment = comments;
  }

  getTemplate() {
    return createCommentItem(this._comment);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

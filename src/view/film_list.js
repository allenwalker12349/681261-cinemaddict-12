import {createElement} from "../util.js";

const createFilmList = () => {
  return (`
  <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
  </section>
  `);
};

export default class FilmList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmList();
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



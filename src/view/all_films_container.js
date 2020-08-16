import {createElement} from "../util.js";

const createFilmsContainer = () => {
  return (`<section class="films"></section>`);
};

export default class AllFilmContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsContainer();
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



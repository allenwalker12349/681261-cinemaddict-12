import {createElement} from "../util.js";

const createStatsButton = () => {
  return (`<a href="#stats" class="main-navigation__additional">Stats</a>`);
};

export default class StatsButton {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createStatsButton();
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

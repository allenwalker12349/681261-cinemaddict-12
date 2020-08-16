import {filmCards} from "../main.js";
import {createElement} from "../util.js";

export const createStatistic = () => {
  return (`<section class="footer__statistics">
    <p>${filmCards.length} movies inside</p>
  </section>`);
};

export default class Statistic {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createStatistic();
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


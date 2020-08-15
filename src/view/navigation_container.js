import {createElement} from "../util.js";

const createNavigationContainer = () => {
  return (`<nav class="main-navigation"></nav>`);
};

export default class NavigationContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNavigationContainer();
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

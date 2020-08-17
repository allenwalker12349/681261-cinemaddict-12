import AbstractView from "./abstract.js";

const createFilmsContainer = () => {
  return (`<section class="films"></section>`);
};

export default class AllFilmContainer extends AbstractView {
  getTemplate() {
    return createFilmsContainer();
  }
}



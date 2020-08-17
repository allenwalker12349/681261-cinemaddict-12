import AbstractView from "./abstract.js";

const createCardsContainer = () => {
  return (`<div class="films-list__container"></div>`);
};

export default class CardsContainer extends AbstractView {
  getTemplate() {
    return createCardsContainer();
  }
}



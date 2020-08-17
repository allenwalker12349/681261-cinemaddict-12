import AbstractView from "./abstract.js";

const createExtraFilmBlock = () => {
  return (`<section class="films-list--extra">
    <h2 class="films-list__title">Top rated</h2>
  </section>`);
};

export default class ExtraFilmBlock extends AbstractView {
  getTemplate() {
    return createExtraFilmBlock();
  }
}

import AbstractView from "./abstract.js";

const createStatsButton = () => {
  return (`<a href="#stats" class="main-navigation__additional">Stats</a>`);
};

export default class StatsButton extends AbstractView {
  getTemplate() {
    return createStatsButton();
  }
}

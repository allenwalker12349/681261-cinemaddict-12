import {filmCards} from "../main.js";
import AbstractView from "./abstract.js";

export const createStatistic = () => {
  return (`<section class="footer__statistics">
    <p>${filmCards.length} movies inside</p>
  </section>`);
};

export default class Statistic extends AbstractView {
  getTemplate() {
    return createStatistic();
  }
}


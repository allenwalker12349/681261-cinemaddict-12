import {CARDS_AMOUNT} from "../main.js";
export const createStatistic = () => {
  return (`
  <section class="footer__statistics">
    <p>${CARDS_AMOUNT} movies inside</p>
  </section>
  `);
};

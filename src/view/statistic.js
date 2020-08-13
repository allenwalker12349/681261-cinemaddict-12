import {filmCards} from "../main.js";
export const createStatistic = () => {
  return (`
  <section class="footer__statistics">
    <p>${filmCards.length} movies inside</p>
  </section>
  `);
};

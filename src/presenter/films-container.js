import AllFilmContainer from "../view/all-films-container.js";
import FilmList from "../view/film-list.js";
import CardsContainer from "../view/cards-container.js";
import {render, renderPosition} from "../utils/render.js";
import ShowMoreButton from "../view/show-more-button.js";
import FilmCardPresenter from "./film-card-presenter.js";

const CARD_COUNT_PER_STEP = 5;

export default class FilmsContainer {
  constructor(filmsContainer) {
    this._filmsConainer = filmsContainer;

    this._allCardsContainer = new AllFilmContainer();
    this._filmsUpcomung = new FilmList();
    this._cardsContainer = new CardsContainer();
    this._showMoreButton = new ShowMoreButton();
  }

  init(films) {
    this._filmsCard = films.slice();
    this._renderFilmsContainer();
    this._renderFilmCards(this._filmsCard);
    this._showoreButton(this._filmsCard);
  }

  _renderCard(film) {
    const cardPresenter = new FilmCardPresenter(this._cardsContainer);
    cardPresenter.init(film);
  }

  _renderFilmCards(films) {
    for (let i = 0; i < Math.min(films.length, CARD_COUNT_PER_STEP); i++) {
      this._renderCard(films[i]);
    }
  }

  _showoreButton(films) {
    let renderedCardsCount = CARD_COUNT_PER_STEP;
    if (films.length > CARD_COUNT_PER_STEP) {
      render(this._filmsUpcomung, this._showMoreButton, renderPosition.BEFOREEND);
      this._showMoreButton.setClickHandler(() => {
        films
        .slice(renderedCardsCount, renderedCardsCount + CARD_COUNT_PER_STEP)
        .forEach((card) => this._renderCard(card));
        renderedCardsCount += CARD_COUNT_PER_STEP;
        if (renderedCardsCount >= films.length) {
          this._showMoreButton.getElement().remove();
        }
      });
    }
  }

  _renderFilmsContainer() {
    render(this._filmsConainer, this._allCardsContainer, renderPosition.BEFOREEND);
    render(this._allCardsContainer, this._filmsUpcomung, renderPosition.BEFOREEND);
    render(this._filmsUpcomung, this._cardsContainer, renderPosition.BEFOREEND);
  }
}

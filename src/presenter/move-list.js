import AllFilmContainer from "../view/all-films-container.js";
import FilmList from "../view/film-list.js";
import CardsContainer from "../view/cards-container.js";
import FilmCard from "../view/film-card.js";
import DetailInfo from "../view/detail-info";
import {render, renderPosition} from "../utils/render.js";

export default class FilmsContainer {
  constructor(filmsContainer) {
    this._filmsConainer = filmsContainer;

    this._allCardsContainer = new AllFilmContainer();
    this._filmsUpcomung = new FilmList();
    this._cardsContainer = new CardsContainer();
  }

  init(films) {
    this._filmsCard = films.slice();
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js
    this._renderFilmsContainer();
    this._renderTasks();
  }

  _renderSort() {
    // Метод для рендеринга сортировки
  }

  _renderCard(card) {
    const cardComponent = new FilmCard(card);
    const detailInfo = new DetailInfo(card);

    render(this._cardsContainer, cardComponent, renderPosition.BEFOREEND);
    cardComponent.setImgClickHandler(() => {
      this._filmsConainer.appendChild(detailInfo.getElement());
    });
  }

  _renderTasks() {
    this._filmsCard.forEach((film) => {
      this._renderCard(film);
    });
  }

  _renderNoTasks() {
    // Метод для рендеринга заглушки
  }

  _renderLoadMoreButton() {
    // Метод, куда уйдёт логика по отрисовке компонетов задачи,
    // текущая функция renderTask в main.js
  }

  _renderFilmsContainer() {
    // рендер контейнера для карточек
    render(this._filmsConainer, this._allCardsContainer, renderPosition.BEFOREEND);
    render(this._allCardsContainer, this._filmsUpcomung, renderPosition.BEFOREEND);
    render(this._filmsUpcomung, this._cardsContainer, renderPosition.BEFOREEND);
  }
}

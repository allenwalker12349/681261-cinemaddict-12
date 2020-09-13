import SiteProfileView from "./view/profile.js";
import NavigationContainer from "./view/navigation-container.js";
import NavigationList from "./view/navigation-list";
import StatsButton from "./view/stats-button.js";
import Sort from "./view/sort.js";
import Statistic from "./view/statistic.js";
import {getFilmCards} from "./mock/fillm.js";
import {render, renderPosition} from "./utils/render.js";
import FilmsContainer from "./presenter/films-container.js";
import CardModel from "./model/films.js";

const CARDS_AMOUNT = 17;
export const filmCards = getFilmCards(CARDS_AMOUNT);

const cardModel = new CardModel();
cardModel.setFilms(filmCards);

// рендер хедера
const siteHeader = document.querySelector(`.header`);
render(siteHeader, new SiteProfileView().getElement(), renderPosition.BEFOREEND);

// рендер навигации
const siteMain = document.querySelector(`main`);
render(siteMain, new NavigationContainer().getElement(), renderPosition.BEFOREEND);
const navigationContainer = siteMain.querySelector(`.main-navigation`);
render(navigationContainer, new NavigationList().getElement(), renderPosition.BEFOREEND);
render(navigationContainer, new StatsButton().getElement(), renderPosition.BEFOREEND);

// рендер сортировки
render(siteMain, new Sort().getElement(), renderPosition.BEFOREEND);

// рендер карточек и контейнера с фильмами

const filmsContainterPresenter = new FilmsContainer(siteMain, cardModel);
filmsContainterPresenter.init(filmCards);

const footerContainer = document.querySelector(`.footer__statistics`);
render(footerContainer, new Statistic().getElement(), renderPosition.BEFOREEND);

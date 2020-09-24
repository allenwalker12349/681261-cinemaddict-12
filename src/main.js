import SiteProfileView from "./view/profile.js";
import NavigationContainer from "./view/navigation-container.js";
import StatsButton from "./view/stats-button.js";

import Statistic from "./view/statistic.js";
import {getFilmCards} from "./mock/fillm.js";
import {render, renderPosition} from "./utils/render.js";
import FilmsContainer from "./presenter/films-container.js";
import CardModel from "./model/films.js";
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter";

const CARDS_AMOUNT = 17;
export const filmCards = getFilmCards(CARDS_AMOUNT);

const cardModel = new CardModel();
cardModel.setFilms(filmCards);

const filterModel = new FilterModel();

// рендер хедера
const siteHeader = document.querySelector(`.header`);
render(siteHeader, new SiteProfileView().getElement(), renderPosition.BEFOREEND);

// рендер навигации
const siteMain = document.querySelector(`main`);

const filterPresenter = new FilterPresenter(siteMain, filterModel, cardModel);
filterPresenter.init();

// рендер карточек и контейнера с фильмами

const filmsContainterPresenter = new FilmsContainer(siteMain, cardModel, filterModel);
filmsContainterPresenter.init();

const footerContainer = document.querySelector(`.footer__statistics`);
render(footerContainer, new Statistic().getElement(), renderPosition.BEFOREEND);

import AbstractView from "./abstract.js";
import {FilterType} from "../const.js";

const createNavigationItem = (filter, currentFilterType) => {
  const {type, name, count} = filter;
  return `<a href="#${name}" class="main-navigation__item ${type === currentFilterType ? `main-navigation__item--active` : ``}" data-filter-type = "${type}">${name}
      ${type === FilterType.ALL ? `` : `<span class="main-navigation__item-count">${count}</span>`}
    </a>`;
};

const createNavigationList = (filters, currentFilterType) => {
  const filterTemplate = filters.map((filter) => createNavigationItem(filter, currentFilterType)).join(``);
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filterTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class NavigationList extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeClickHandler = this._filterTypeClickHandler.bind(this);
  }

  getTemplate() {
    return createNavigationList(this._filters, this._currentFilter);
  }

  _filterTypeClickHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this._callback.filterTypeClick(evt.target.dataset.filterType);
  }

  setFilterTypeClickHandler(callback) {
    this._callback.filterTypeClick = callback;
    this.getElement()
        .querySelector(`.main-navigation__items`)
        .addEventListener(`click`, this._filterTypeClickHandler);

  }
}

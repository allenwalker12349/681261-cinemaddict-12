import FilmCard from "../view/film-card.js";
import DetailInfo from "../view/detail-info";
import {render, renderPosition, replace, remove} from "../utils/render.js";

const bodyElement = document.querySelector(`body`);
const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `OPEN`
};

export default class FilmCardPresenter {
  constructor(cardConttainer, changeData, changeMode) {
    this._cardListContainer = cardConttainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._cardComponent = null;
    this._popUpComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleImgClick = this._handleImgClick.bind(this);
    this._handleTitleClick = this._handleTitleClick.bind(this);
    this._handleCommentClick = this._handleCommentClick.bind(this);
    this._handleEscButtonClick = this._handleEscButtonClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleAddToWatchListClick = this._handleAddToWatchListClick.bind(this);
    this._handleAddToFavoriteClick = this._handleAddToFavoriteClick.bind(this);
    this._closePopUp = this._closePopUp.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._cardComponent;
    const prevDetailInfoComponent = this._popUpComponent;

    this._cardComponent = new FilmCard(film);
    this._popUpComponent = new DetailInfo(film);

    this._cardComponent.setImgClickHandler(this._handleImgClick);
    this._cardComponent.setTitleClickHandler(this._handleTitleClick);
    this._cardComponent.setCommentClickHandler(this._handleCommentClick);
    this._cardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._cardComponent.setAddToWatchListHandler(this._handleAddToWatchListClick);
    this._cardComponent.setAddToFavoriteHandler(this._handleAddToFavoriteClick);

    this._popUpComponent.renderComments();
    this._popUpComponent.setCloseBtnClickHandler(this._closePopUp);
    this._popUpComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._popUpComponent.setAddToWatchListHandler(this._handleAddToWatchListClick);
    this._popUpComponent.setAddToFavoriteHandler(this._handleAddToFavoriteClick);
    this._popUpComponent.setEmojiClickHandler();

    if (prevFilmComponent === null || prevDetailInfoComponent === null) {
      render(this._cardListContainer, this._cardComponent, renderPosition.BEFOREEND);
      return;
    }

    if (this._cardListContainer.getElement().contains(prevFilmComponent.getElement())) {
      replace(this._cardComponent, prevFilmComponent);
    }

    if (bodyElement.contains(prevDetailInfoComponent.getElement())) {
      replace(this._popUpComponent, prevDetailInfoComponent);
    }

    remove(prevFilmComponent);
    remove(prevDetailInfoComponent);
  }

  destroy() {
    remove(this._cardComponent);
    remove(this._popUpComponent);
  }

  _handleWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isWatched: !this._film.isWatched
            }
        )
    );
  }

  _handleAddToWatchListClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isInWatchList: !this._film.isInWatchList
            }
        )
    );
  }

  _handleAddToFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isInFavorite: !this._film.isInFavorite
            }
        )
    );
  }

  _handleTitleClick() {
    this._showPopUp();
  }

  _handleCommentClick() {
    this._showPopUp();
  }

  _handleImgClick() {
    this._showPopUp();
  }

  _handleEscButtonClick(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this._closePopUp();
      document.removeEventListener(`keydown`, this._handleEscButtonClick);
    }
  }

  _showPopUp() {
    this._changeMode();
    this._cardListContainer.getElement().appendChild(this._popUpComponent.getElement());
    bodyElement.classList.add(`hide-overflow`);
    document.addEventListener(`keydown`, this._handleEscButtonClick);
    this._mode = Mode.OPEN;
  }

  _closePopUp() {
    this._mode = Mode.DEFAULT;
    this._cardListContainer.getElement().removeChild(this._popUpComponent.getElement());
    bodyElement.classList.remove(`hide-overflow`);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopUp();
      bodyElement.classList.remove(`hide-overflow`);
    }
  }
}

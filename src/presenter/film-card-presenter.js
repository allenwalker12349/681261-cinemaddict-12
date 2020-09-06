import FilmCard from "../view/film-card.js";
import DetailInfo from "../view/detail-info";
import {render, renderPosition, remove, replace, appendChild} from "../utils/render.js";

const bodyElement = document.querySelector(`body`);

export default class FilmCardPresenter {
  constructor(cardConttainer, changeData) {
    this._filmCard = null;
    this._container = cardConttainer;
    this._cardListContainer = cardConttainer;
    this._handleImgClick = this._handleImgClick.bind(this);
    this._handleTitleClick = this._handleTitleClick.bind(this);
    this._handleCommentClick = this._handleCommentClick.bind(this);
    this._handleEscButtonClick = this._handleEscButtonClick.bind(this);
    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
    this._handleAddToFavorite = this._handleAddToFavorite.bind(this);
    this._handleAddToWatched = this._handleAddToWatched.bind(this);
    this._handleAddToWatchList = this._handleAddToWatchList.bind(this);
    this._changeData = changeData;
  }

  init(cardInfo) {
    this._film = cardInfo;
    const prevFilmComponent = this._filmCard;
    this._filmCard = new FilmCard(cardInfo);
    this._detialInfo = new DetailInfo(cardInfo);
    this._filmCard.setImgClickHandler(this._handleImgClick);
    this._filmCard.setTitleClickHandler(this._handleTitleClick);
    this._filmCard.setCommentClickHandler(this._handleCommentClick);
    this._filmCard.setWatchedClickHandler(this._handleAddToWatched);
    this._filmCard.setAddToFavoriteClickHandler(this._handleAddToFavorite);
    this._filmCard.setWatchLaterListHandler(this._handleAddToWatchList);
    this._detialInfo.setCloseBtnClickHandler(this._handleCloseButtonClick);

    if (prevFilmComponent === null || prevFilmComponent === null) {
      render(this._cardListContainer, this._filmCard, renderPosition.BEFOREEND);
      return;
    }

    if (this._container.getElement().contains(prevFilmComponent.getElement())) {
      replace(this._filmCard, prevFilmComponent);
    }

    if (bodyElement.contains(prevFilmComponent.getElement())) {
      replace(this._detialInfo, prevFilmComponent);
      appendChild(prevFilmComponent, this._newCommentComponent);
    }
  }


  _handleAddToWatched() {
    this._changeData(Object.assign({},
        this._film,
        {
          isWatched: !this._film.isWatched
        }
    ));
  }

  _handleAddToFavorite(evt) {
    evt.preventDefault();
    this._filmCard.addToFavoriteToggler();
  }

  _handleAddToWatchList(evt) {
    evt.preventDefault();
    this._filmCard.watchListToggler();
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

  _handleCloseButtonClick() {
    this._closePopUp();
    document.removeEventListener(`keydown`, this._handleEscButtonClick);
  }

  _showPopUp() {
    this._cardListContainer.getElement().appendChild(this._detialInfo.getElement());
    this._detialInfo.renderComments();
    this._detialInfo.setEmojiClickHandler();
    bodyElement.classList.add(`hide-overflow`);
    document.addEventListener(`keydown`, this._handleEscButtonClick);
  }

  _closePopUp() {
    this._cardListContainer.getElement().removeChild(this._detialInfo.getElement());
    bodyElement.classList.remove(`hide-overflow`);
  }

  destroy() {
    remove(this._detialInfo);
  }
}

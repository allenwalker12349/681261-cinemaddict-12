import FilmCard from "../view/film-card.js";
import DetailInfo from "../view/detail-info";
import {render, renderPosition} from "../utils/render.js";

const bodyElement = document.querySelector(`body`);

export default class FilmCardPresenter {
  constructor(cardConttainer, changeData) {
    this._cardListContainer = cardConttainer;
    this._handleImgClick = this._handleImgClick.bind(this);
    this._handleTitleClick = this._handleTitleClick.bind(this);
    this._handleCommentClick = this._handleCommentClick.bind(this);
    this._handleEscButtonClick = this._handleEscButtonClick.bind(this);
    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
    this._handleAddToWatch = this._handleAddToWatch.bind(this);
    this._changeData = changeData;
  }

  init(cardInfo) {
    this._filmCard = new FilmCard(cardInfo);
    this._detialInfo = new DetailInfo(cardInfo);

    render(this._cardListContainer, this._filmCard, renderPosition.BEFOREEND);
    this._filmCard.setImgClickHandler(this._handleImgClick);
    this._filmCard.setTitleClickHandler(this._handleTitleClick);
    this._filmCard.setCommentClickHandler(this._handleCommentClick);
    this._filmCard.setAddtoWatchClickHandler(this._handleAddToWatch);
    this._filmCard.setWatchedClickHandler(this._handleAddToWatch);
    this._filmCard.setAddtoFavorite(this._handleAddToWatch);
    this._detialInfo.setCloseBtnClickHandler(this._handleCloseButtonClick);
  }

  _handleAddToWatch(evt) {
    evt.preventDefault();
    this._changeData(Object.assign({}, this._filmCard, {isInWatchList: !this._filmCard.isInWatchList}));
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
    bodyElement.classList.add(`hide-overflow`);
    document.addEventListener(`keydown`, this._handleEscButtonClick);
  }

  _closePopUp() {
    this._cardListContainer.getElement().removeChild(this._detialInfo.getElement());
    bodyElement.classList.remove(`hide-overflow`);
  }
}

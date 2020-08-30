import FilmCard from "../view/film-card.js";
import DetailInfo from "../view/detail-info";
import {render, renderPosition} from "../utils/render.js";

const bodyElement = document.querySelector(`body`);

export default class FilmCardPresenter {
  constructor(cardConttainer) {
    this._cardListContainer = cardConttainer;
    this._handleImgClick = this._handleImgClick.bind(this);
    this._handleTitleClick = this._handleTitleClick.bind(this);
    this._handleCommentClick = this._handleCommentClick.bind(this);
    this._handleEscButtonClick = this._handleEscButtonClick.bind(this);
    this._closePopUp = this._closePopUp.bind(this);
  }

  init(cardInfo) {
    this._FilmCard = new FilmCard(cardInfo);
    this._detialInfo = new DetailInfo(cardInfo);

    render(this._cardListContainer, this._FilmCard, renderPosition.BEFOREEND);
    this._FilmCard.setImgClickHandler(this._handleImgClick);
    this._FilmCard.setTitleClickHandler(this._handleTitleClick);
    this._FilmCard.setCommentClickHandler(this._handleCommentClick);
    this._detialInfo.setCloseBtnClickHandler(this._closePopUp);
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

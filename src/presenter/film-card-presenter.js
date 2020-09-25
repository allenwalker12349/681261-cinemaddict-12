import FilmCard from "../view/film-card.js";
import DetailInfo from "../view/detail-info";
import {render, renderPosition, replace, remove} from "../utils/render.js";
import {Mode, UserAction, UpdateType} from "../const.js";
import FilmCommentsView from "../view/film-comments";
import Comment from "../view/comment";

const bodyElement = document.querySelector(`body`);

export default class FilmCardPresenter {
  constructor(cardConttainer, changeData, changeMode, commentsModel) {
    this._cardListContainer = cardConttainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._commentsModel = commentsModel;

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

    this._comments = this._commentsModel.getCommentsByFilmId(this._film.id);

    const prevFilmComponent = this._cardComponent;
    const prevDetailInfoComponent = this._popUpComponent;

    this._cardComponent = new FilmCard(film, this._comments);
    this._popUpComponent = new DetailInfo(film);
    this._filmCommentsComponent = new FilmCommentsView(this._comments);

    this._cardComponent.setImgClickHandler(this._handleImgClick);
    this._cardComponent.setTitleClickHandler(this._handleTitleClick);
    this._cardComponent.setCommentClickHandler(this._handleCommentClick);
    this._cardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._cardComponent.setAddToWatchListHandler(this._handleAddToWatchListClick);
    this._cardComponent.setAddToFavoriteHandler(this._handleAddToFavoriteClick);

    this._popUpComponent.setCloseBtnClickHandler(this._closePopUp);
    this._popUpComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._popUpComponent.setAddToWatchListHandler(this._handleAddToWatchListClick);
    this._popUpComponent.setAddToFavoriteHandler(this._handleAddToFavoriteClick);
    this._renderComments();

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
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
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
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
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
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
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

  // коментарии

  // рендер одного комента

  _renderComment(comment) {
    this._commentComponent = new Comment(comment);
    this._commentsContainer = this._filmCommentsComponent.getElement().querySelector(`.film-details__comments-list`);
    // this._commentComponent.setCommentDeleteClickHandler(this._handleDeleteClick);
    render(this._commentsContainer, this._commentComponent, renderPosition.BEFOREEND);
  }

  // рендер всех комментов

  _renderComments() {
    const commentsWrapper = this._popUpComponent.getElement().querySelector(`.form-details__bottom-container`);
    render(commentsWrapper, this._filmCommentsComponent, renderPosition.AFTERBEGIN);

    this._comments.forEach((comment) => this._renderComment(comment));
  }
}

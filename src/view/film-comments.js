import AbstractView from "./abstract.js";

const createFilmCommentsTemplate = (comments) => {

  const commentAmount = comments.length;

  return (`<div><h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentAmount}</span></h3>
  <ul class="film-details__comments-list"></ul><div>`);
};

export default class FilmComments extends AbstractView {
  constructor(filmComments) {
    super();
    this._filmComments = filmComments;

    this._data = this._newComment;
  }

  getTemplate() {
    return createFilmCommentsTemplate(this._filmComments);
  }


  // метод для обновления данных
  updateData(update) {
    if (!update) {
      return;
    }

    this._data = Object.assign(
        {},
        this._data,
        update
    );
  }

  static parseCommentToData(newComment, film) {
    return Object.assign(
        {},
        newComment,
        {
          filmId: film.id
        }
    );
  }

}

import EventEditView from '../view/event-edit-view.js';
import EventItemView from '../view/event-item-view.js';

import { render, replace, remove } from '../framework/render.js';

import { UPDATE_TYPE, UserAction, POINT_MODE } from '../const.js';
import { isEscKey } from '../utils.js';

export default class PointPresenter {
  #container = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #changeData = null;
  #changeMode = null;

  #point = null;
  #destinations = [];
  #mode = POINT_MODE.DEFAULT;

  constructor (container, changeData, changeMode) {
    this.#container = container;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point, offers, destinations) => {
    this.#point = point;
    this.#destinations = destinations;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new EventItemView(point, offers, destinations);
    this.#pointEditComponent = new EventEditView(point, offers, destinations);

    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setItemClickHandler(this.#handleCloseEditForm);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#container);
      return;
    }

    if (this.#mode === POINT_MODE.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === POINT_MODE.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
      this.#mode = POINT_MODE.DEFAULT;
    }

    remove(prevPointEditComponent);
    remove(prevPointComponent);
  };

  #escKeyDownHandler = (evt) => {
    if (isEscKey(evt)) {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point, this.#destinations);
      this.#replaceFormToPoint();
    }
  };

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = POINT_MODE.EDITING;
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = POINT_MODE.DEFAULT;
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleCloseEditForm = () => {
    this.#pointEditComponent.reset(this.#point, this.#destinations);
    this.#replaceFormToPoint();
  };

  #handleFormSubmit = (update) => {
    this.#changeData(UserAction.UPDATE_POINT, UPDATE_TYPE.MINOR, update);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFavoriteClick = () => {
    this.#changeData(UserAction.UPDATE_POINT, UPDATE_TYPE.PATCH, {...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #handleDeleteClick = (point) => {
    this.#changeData(UserAction.DELETE_POINT, UPDATE_TYPE.MINOR, point);
  };

  resetView = () => {
    if (this.#mode !== POINT_MODE.DEFAULT) {
      this.#pointEditComponent.reset(this.#point, this.#destinations);
      this.#replaceFormToPoint();
    }
  };

  destroy = () => {
    remove(this.#pointEditComponent);
    remove(this.#pointComponent);
  };

  setSaving = () => {
    if (this.#mode === POINT_MODE.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isSaving: true
      });
    }
  };

  setDeleting = () => {
    if (this.#mode === POINT_MODE.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true
      });
    }
  };

  setAborting = () => {
    if (this.#mode === POINT_MODE.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  };
}

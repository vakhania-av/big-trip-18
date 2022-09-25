import EventEditView from '../view/event-edit-view.js';
import EventItemView from '../view/event-item-view.js';
import { render, replace, remove } from '../framework/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITIING'
};


export default class PointPresenter {
  #container = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #changeData = null;

  #point = null;
  #offers = [];
  #destinations = [];
  #mode = Mode.DEFAULT;

  constructor (pointListContainer, changeData) {
    this.#container = pointListContainer;
    this.#changeData = changeData;
  }

  init = (point, offers, destinations) => {
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new EventItemView(point, offers, destinations);
    this.#pointEditComponent = new EventEditView(point, offers, destinations);

    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setItemClickHandler(this.#handleCloseEditForm);

    if (!prevPointComponent || !prevPointEditComponent) {
      render(this.#pointComponent, this.#container);
      return;
    }

    if (this.#container.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#container.contains(prevPointEditComponent.element)) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);

  };

  #escKeyDownHandler = (evt) => {
    if (evt.key.includes('Esc', 'Escape')) {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleCloseEditForm = () => {
    this.#replaceFormToPoint();
  };

  #handleFormSubmit = (point) => {
    this.#changeData(point, this.#offers, this.#destinations);
    this.#replaceFormToPoint();
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite}, this.#offers, this.#destinations);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  };
}

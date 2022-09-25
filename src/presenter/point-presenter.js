import EventEditView from '../view/event-edit-view.js';
import EventItemView from '../view/event-item-view.js';
import { render, replace } from '../framework/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITIING'
};


export default class PointPresenter {
  #container = null;
  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;
  #offers = [];
  #destinations = [];
  #mode = Mode.DEFAULT;

  constructor (pointListContainer) {
    this.#container = pointListContainer;
  }

  init = (point, offers, destinations) => {
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;

    this.#pointComponent = new EventItemView(point, offers, destinations);
    this.#pointEditComponent = new EventEditView(point, offers, destinations);

    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setItemClickHandler(this.#handeleCloseEditForm);

    render(this.#pointComponent, this.#container);
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

  #handeleCloseEditForm = () => {
    this.#replaceFormToPoint();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToPoint();
  };
}

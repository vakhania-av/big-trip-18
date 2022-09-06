import { render, replace } from '../framework/render.js';

import EventEditView from '../view/event-edit-view.js';
import EventItemView from '../view/event-item-view.js';
import EventListView from '../view/event-list-view.js';
import SortView from '../view/trip-sort-view.js';
import NoEventView from '../view/no-event-view.js';
import { EMPTY_POINT_MESSAGE } from '../const.js';

export default class BoardPresenter {

  #container = null;
  #pointModel = null;
  #emptyPointMessage = null;

  #listComponent = new EventListView();

  #points = [];
  #offers = [];
  #destinations = [];

  constructor (container, pointModel) {
    this.#container = container;
    this.#pointModel = pointModel;
  }

  init = () => {
    this.#points = [...this.#pointModel.points];
    this.#offers = [...this.#pointModel.offers];
    this.#destinations = [...this.#pointModel.destinations];

    this.#renderBoard();
  };

  // Отрисовка доски (контейнера)
  #renderBoard = () => {
    render(new SortView(), this.#container);

    this.#emptyPointMessage = EMPTY_POINT_MESSAGE.EVERYTHING;

    if (!this.#points.length) {
      render(new NoEventView(this.#emptyPointMessage), this.#container);
      return;
    }

    render(this.#listComponent, this.#container);

    this.#points.forEach((point) => this.#renderPoint(point, this.#offers, this.#destinations));
  };

  // Отрисовка компонентов точек маршрута и формы редактирования
  #renderPoint = (point, offers, destinations) => {
    const pointComponent = new EventItemView(point, offers, destinations);
    const editFormComponent = new EventEditView(point, offers, destinations);

    const replacePointToForm = () => {
      replace(editFormComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
      replace(pointComponent, editFormComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key.includes('Esc', 'Escape')) {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setEditClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editFormComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    editFormComponent.setItemClickHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#listComponent.element);
  };
}

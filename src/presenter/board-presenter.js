import { render, RenderPosition, replace } from '../framework/render.js';

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
  #sortComponent = new SortView();
  #noPointComponent = null;
  #pointPresenter = new Map();

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
    this.#renderSort();
    this.#emptyPointMessage = EMPTY_POINT_MESSAGE.EVERYTHING;

    if (!this.#points.length) {
      this.#renderNoPoints(this.#emptyPointMessage);
      return;
    }

    this.#renderPointsList();
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

  #renderPointsList = () => {
    render(this.#listComponent, this.#container);
    this.#renderPoints();
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
  };

  #renderPoints = () => {
    this.#points.forEach((point) => this.#renderPoint(point, this.#offers, this.#destinations));
  };

  #renderNoPoints = (message) => {
    this.#noPointComponent = new NoEventView(message);
    render(this.#noPointComponent, this.#container, RenderPosition.AFTERBEGIN);
  };
}

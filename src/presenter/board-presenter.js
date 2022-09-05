import { render } from '../framework/render.js';

import EventEditView from '../view/event-edit-view.js';
import EventItemView from '../view/event-item-view.js';
import EventListView from '../view/event-list-view.js';
import SortView from '../view/trip-sort-view.js';
import NoEventView from '../view/no-event-view.js';

export default class BoardPresenter {

  #container = null;
  #pointModel = null;

  #listComponent = new EventListView();

  #points = [];
  #offers = [];

  constructor (container, pointModel) {
    this.#container = container;
    this.#pointModel = pointModel;
  }

  init = () => {
    this.#points = [...this.#pointModel.points];
    this.#offers = [...this.#pointModel.offers];

    this.#renderBoard();
  };

  // Отрисовка доски (контейнера)
  #renderBoard = () => {
    render(new SortView(), this.#container);
    render(this.#listComponent, this.#container);

    if (!this.#points.length) {
      render(new NoEventView(), this.#listComponent.element);
      return;
    }

    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i], this.#offers);
    }
  };

  // Отрисовка компонентов точек маршрута и формы редактирования
  #renderPoint = (point, offers) => {
    const pointComponent = new EventItemView(point);
    const editFormComponent = new EventEditView(point, offers);

    const replacePointToForm = () => {
      this.#listComponent.element.replaceChild(editFormComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#listComponent.element.replaceChild(pointComponent.element, editFormComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key.includes('Esc', 'Escape')) {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editFormComponent.element.querySelector('.event--edit').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    editFormComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#listComponent.element);
  };
}

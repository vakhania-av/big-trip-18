import { render } from '../render.js';

import EventEditView from '../view/event-edit-view.js';
import EventItemView from '../view/event-item-view.js';
import EventListView from '../view/event-list-view.js';
import SortView from '../view/trip-sort-view.js';

export default class BoardPresenter {

  #container = null;
  #pointModel = null;

  #listComponent = new EventListView();

  #points = [];
  #offers = [];

  init = (container, pointModel) => {
    this.#container = container;
    this.#pointModel = pointModel;
    this.#points = [...this.#pointModel.points];
    this.#offers = [...this.#pointModel.offers];

    render(new SortView(), this.#container);
    render(this.#listComponent, this.#container);
    //render (new EventEditView(this.#points[0], this.#offers), this.#listComponent.element);

    for (let i = 0; i < this.#points.length; i++) {
      this.#renderPoint(this.#points[i], this.#offers);
    }
  };

  // Отрисовка компонента точек маршрута
  #renderPoint = (point, offers) => {
    const pointComponent = new EventItemView(point);
    const editFormComponent = new EventEditView(point, offers);

    const replacePointToForm = () => {
      this.#listComponent.element.replaceChild(editFormComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#listComponent.element.replaceChild(pointComponent.element, editFormComponent.element);
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
    });

    editFormComponent.element.querySelector('.event--edit').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
    });

    render(pointComponent, this.#listComponent.element);
  };
}

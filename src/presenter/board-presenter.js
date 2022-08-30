import { render } from '../render.js';

import EventEditView from '../view/event-edit-view.js';
import EventItemView from '../view/event-item-view.js';
import EventListView from '../view/event-list-view.js';
import SortView from '../view/trip-sort-view.js';

const TRIP_EVENTS_COUNT = 3; // Константа для отрисовки компонента "Точка маршрута"

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
    render (new EventEditView(this.#points[0], this.#offers), this.#listComponent.element);


    for (let i = 0; i < TRIP_EVENTS_COUNT; i++) {
      render(new EventItemView(this.#points[i]), this.#listComponent.element);
    }
  };
}

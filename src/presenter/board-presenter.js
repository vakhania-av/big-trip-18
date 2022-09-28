import { render, RenderPosition } from '../framework/render.js';

import EventListView from '../view/event-list-view.js';
import SortView from '../view/trip-sort-view.js';
import NoEventView from '../view/no-event-view.js';
import { EMPTY_POINT_MESSAGE, SortType } from '../const.js';
import { sortByDate, sortByPrice, sortByDuration } from '../utils/point.js';
import PointPresenter from './point-presenter.js';
import updateItem from '../utils/common.js';

export default class BoardPresenter {

  #container = null;
  #pointModel = null;
  #emptyPointMessage = null;

  #listComponent = new EventListView();
  #sortComponent = new SortView();
  #noPointComponent = null;
  #pointPresenter = new Map();

  #currentSortType = SortType.DEFAULT;

  #sourcedBoardPoints = [];

  #boardPoints = [];
  #boardOffers = [];
  #boardDestinations = [];

  constructor (container, pointModel) {
    this.#container = container;
    this.#pointModel = pointModel;
  }

  init = () => {
    this.#boardPoints = [...this.#pointModel.points];
    this.#sourcedBoardPoints = [...this.#pointModel.points];
    this.#boardOffers = [...this.#pointModel.offers];
    this.#boardDestinations = [...this.#pointModel.destinations];

    this.#renderBoard();
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.DURATION:
        this.#boardPoints.sort(sortByDuration);
        break;
      case SortType.PRICE:
        this.#boardPoints.sort(sortByPrice);
        break;
      default:
        this.#boardPoints.sort(sortByDate);
    }

    this.#currentSortType = sortType;
  };

  // Отрисовка доски (контейнера)
  #renderBoard = () => {
    this.#renderSort();
    this.#emptyPointMessage = EMPTY_POINT_MESSAGE.EVERYTHING;

    if (!this.#boardPoints.length) {
      this.#renderNoPoints(this.#emptyPointMessage);
      return;
    }

    this.#renderPointsList();
  };

  // Отрисовка компонентов точек маршрута и формы редактирования
  #renderPoint = (point, offers, destinations) => {
    const pointPresenter = new PointPresenter(this.#listComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point, offers, destinations);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #renderPointsList = () => {
    render(this.#listComponent, this.#container);
    this.#renderPoints();
  };

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint, this.#boardOffers, this.#boardDestinations);
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
    this.#sortPoints(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderPoints = () => {
    this.#boardPoints.forEach((point) => this.#renderPoint(point, this.#boardOffers, this.#boardDestinations));
  };

  #renderNoPoints = (message) => {
    this.#noPointComponent = new NoEventView(message);
    render(this.#noPointComponent, this.#container, RenderPosition.AFTERBEGIN);
  };

  // Обработчик смены сортировки
  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointsList();
  };
}

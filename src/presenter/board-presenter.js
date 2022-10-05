import { render, RenderPosition, remove } from '../framework/render.js';

import EventListView from '../view/event-list-view.js';
import SortView from '../view/trip-sort-view.js';
import NoEventView from '../view/no-event-view.js';
import LoadingView from '../view/loading-view.js';
import StartErrorView from '../view/start-error-view.js';

import { EMPTY_POINT_MESSAGE, SortType, FILTER_TYPE, UserAction, UPDATE_TYPE, TIME_LIMIT } from '../const.js';
import { sortByDate, sortByPrice, sortByDuration } from '../utils/point.js';
import { filterPoints } from '../utils/filter.js';

import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';

import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const { AFTERBEGIN } = RenderPosition;

export default class BoardPresenter {
  #container = null;
  #pointModel = null;
  #filterModel = null;

  #emptyPointMessage = null;

  #listComponent = new EventListView();
  #loadingComponent = new LoadingView();
  #startErrorComponent = new StartErrorView();
  #sortComponent = null;
  #noPointComponent = null;

  #pointPresenter = new Map();
  #newPointPresenter = null;

  #currentSortType = SortType.DEFAULT;
  #isLoading = true;
  #isStartError = false;

  #uiBlocker = new UiBlocker(TIME_LIMIT.LOWER_LIMIT, TIME_LIMIT.UPPER_LIMIT);

  constructor (container, pointModel, filterModel) {
    this.#container = container;
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter(this.#listComponent.element, this.#handleViewAction, this.#pointModel);

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points () {
    const points = this.#pointModel.points;
    const filterType = this.#filterModel.filter;
    const filteredPoints = filterPoints(filterType, points);

    switch (this.#currentSortType) {
      case SortType.DEFAULT:
        return filteredPoints.sort(sortByDate);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
      case SortType.DURATION:
        return filteredPoints.sort(sortByDuration);
      default:
        throw new Error(`Warning! Current sort type ${this.#currentSortType} is unknown!`);
    }
  }

  get offers () {
    return this.#pointModel.offers;
  }

  get destinations () {
    return this.#pointModel.destinations;
  }

  init = () => {
    render(this.#listComponent, this.#container);
    this.#renderBoard();
  };

  // Отрисовка доски (контейнера)
  #renderBoard = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.#isStartError) {
      this.#renderStartError();
      return;
    }

    const points = this.points;
    this.#emptyPointMessage = EMPTY_POINT_MESSAGE[this.#filterModel.filter];

    if (!points.length) {
      this.#renderNoPoints(this.#emptyPointMessage);
      return;
    }

    this.#renderSort();
    this.#renderPoints(points);
  };

  // Отрисовка компонентов точек маршрута и формы редактирования
  #renderPoint = (point, offers, destinations) => {
    const pointPresenter = new PointPresenter(this.#listComponent.element, this.#handleViewAction, this.#modeChangeHandler);
    pointPresenter.init(point, offers, destinations);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #modeChangeHandler = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#sortTypeChangeHandler);
    render(this.#sortComponent, this.#container, AFTERBEGIN);
  };

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point, this.offers, this.destinations));
  };

  #renderNoPoints = (message) => {
    this.#noPointComponent = new NoEventView(message);
    render(this.#noPointComponent, this.#listComponent.element);
  };

  // Обработчик смены сортировки
  #sortTypeChangeHandler = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  };

  createPoint = (cb) => {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UPDATE_TYPE.MAJOR, FILTER_TYPE.EVERYTHING);
    this.#newPointPresenter.init(cb);
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UPDATE_TYPE.PATCH:
        this.#pointPresenter.get(data.id).init(data, this.offers, this.destinations);
        break;
      case UPDATE_TYPE.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UPDATE_TYPE.MAJOR:
        this.#clearBoard({ resetSortType: true });
        this.#renderBoard();
        break;
      case UPDATE_TYPE.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
      case UPDATE_TYPE.INIT_ERROR:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#isStartError = true;
        this.#renderBoard();
        break;
      default:
        throw new Error(`Warning! Update type ${updateType} is unkmown!`);
    }
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();

        try {
          await this.#pointModel.addPoint(updateType, update);
        } catch (err) {
          this.#newPointPresenter.setAborting();
        }

        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenter.get(update.id).setDeleting();

        try {
          await this.#pointModel.deletePoint(updateType, update);
        } catch (err) {
          this.#pointPresenter.get(update.id).setAborting();
        }

        break;
      case UserAction.UPDATE_POINT:
        this.#pointPresenter.get(update.id).setSaving();

        try {
          await this.#pointModel.updatePoint(updateType, update);
        } catch (err) {
          this.#pointPresenter.get(update.id).setAborting();
        }

        break;
      default:
        throw new Error(`Warning! Current action type ${actionType} is unknown!`);
    }

    this.#uiBlocker.unblock();
  };

  #clearBoard = ({ resetSortType = false } = {}) => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  // Метод, отвечающий за preloader во время загрузки данных
  #renderLoading = () => {
    render(this.#loadingComponent, this.#container);
  };

  // Метод, отвечающий за вывод сообщении об ошибке "Something went wrong :((( Try again later"
  #renderStartError = () => {
    render(this.#startErrorComponent, this.#container);
  };
}

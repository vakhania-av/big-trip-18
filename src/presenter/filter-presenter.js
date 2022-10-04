import { render, remove, replace } from '../framework/render.js';
import { FILTER_TYPE, UPDATE_TYPE } from '../const.js';
import TripFiltersView from '../view/trip-filters-view.js';
import { filterPoints } from '../utils/filter.js';

export default class FilterPresenter {
  #container = null;
  #pointsModel = null;
  #filterModel = null;

  #filterComponent = null;

  constructor (container, filterModel, pointsModel) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters () {
    const points = this.#pointsModel.points;

    return [
      {
        type: FILTER_TYPE.EVERYTHING,
        name: 'everything',
        count: filterPoints(FILTER_TYPE.EVERYTHING, points).length
      },
      {
        type: FILTER_TYPE.PAST,
        name: 'past',
        count: filterPoints(FILTER_TYPE.PAST, points).length
      },
      {
        type: FILTER_TYPE.FUTURE,
        name: 'future',
        count: filterPoints(FILTER_TYPE.FUTURE, points).length
      }
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;
    this.#filterComponent = new TripFiltersView(filters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (!prevFilterComponent) {
      render(this.#filterComponent, this.#container);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UPDATE_TYPE.MAJOR, filterType);
  };

}

import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemsTemplate = (filter, currentFilterType) => {
  const { name, type, count } = filter;

  return (
    `<div class="trip-filters__filter">
        <input 
          id="filter-${name}" 
          class="trip-filters__filter-input  
          visually-hidden" 
          type="radio" 
          name="trip-filter" 
          value="${type}"
          ${type === currentFilterType ? 'checked' : ''}
          ${count === 0 ? 'disabled' : ''}
        >
        <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
      </div>`
  );
};

const createFilterTemplate = (filters, currentFilterType) => {
  const filterItemsTemplate = filters.map((filter) => createFilterItemsTemplate(filter, currentFilterType)).join('');

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilterType = null;

  constructor (filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
  }

  get template () {
    return createFilterTemplate(this.#filters, this.#currentFilterType);
  }

  setFilterTypeChangeHandler = (cb) => {
    this._callback.filterTypeChange = cb;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  };
}


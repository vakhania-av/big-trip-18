import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (filters) =>
  Object.entries(filters).map(([, filter]) => {
    const { name, isDisabled, isChecked } = filter;
    return (
      `<div class="trip-filters__filter">
        <input 
          id="filter-${name}" 
          class="trip-filters__filter-input  
          visually-hidden" 
          type="radio" 
          name="trip-filter" 
          value="${name}"
          ${isChecked ? 'checked' : ''}
          ${isDisabled ? 'disabled' : ''}
        >
        <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
      </div>`
    );
  }).join('');

const createFilterTemplate = (filters) => (
  `<form class="trip-filters" action="#" method="get">
  ${createFilterItemTemplate(filters)}
  <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

/*const createFilterTemplate = (filters) => (
  `<form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">
      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
      <label class="trip-filters__filter-label" for="filter-future">Future</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked>
      <label class="trip-filters__filter-label" for="filter-past">Past</label>
    </div>

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);*/

export default class FilterView extends AbstractView {
  #filters = null;

  constructor (filters) {
    super();
    this.#filters = filters;
  }

  get template () {
    return createFilterTemplate(this.#filters);
  }
}


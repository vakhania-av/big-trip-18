import { render } from '../render.js';

import { tripInfoElement, tripControlsFiltersElement } from '../main.js';

import InfoMainView from '../view/info-main-view.js';
import InfoCostView from '../view/info-cost-view.js';
import FilterView from '../view/filter-view.js';

export default class BoardPresenter {
  init = (container) => {
    this.container = container;

    render(new InfoMainView(), tripInfoElement);
    render(new InfoCostView(), tripInfoElement);
    render(new FilterView(), tripControlsFiltersElement);
  };
}

import { render } from '../render.js';

import { tripInfoElement, tripControlsFiltersElement } from '../main.js';

import InfoMainView from '../view/info-main-view.js';
import InfoCostView from '../view/info-cost-view.js';
import FilterView from '../view/filter-view.js';

export default class BoardPresenter {
  init = (container, pointModel) => {
    this.container = container;
    this.pointModel = pointModel;
    this.boardPoints = [...pointModel.points];

    console.log(this.boardPoints);

    render(new InfoMainView(), tripInfoElement);
    render(new InfoCostView(), tripInfoElement);
    render(new FilterView(), tripControlsFiltersElement);
  };
}

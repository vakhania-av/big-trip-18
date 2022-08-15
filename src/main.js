import { render } from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

import InfoMainView from './view/info-main-view.js';


const boardPresenter = new BoardPresenter();

const tripMainElement = document.querySelector('.trip-main');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
render(new InfoMainView(), tripEventsElement);

boardPresenter.init(tripMainElement);

const tripInfoElement = tripMainElement.querySelector('.trip-info');
debugger



export { tripInfoElement };

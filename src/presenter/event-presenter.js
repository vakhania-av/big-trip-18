import { render } from '../render.js';

import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';

export default class EventPresenter {

  init = (container) => {
    this.container = container;

    render(new SortView(), container);
    render(new EventListView(), container);
  };
}

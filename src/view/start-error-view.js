import AbstractView from '../framework/view/abstract-view';

const createErrorTemplate = () => (`
  <p class="trip-events__msg">
    Something went wrong :((( Please try again later.
  </p>
`);

export default class StartErrorView extends AbstractView {
  get template() {
    return createErrorTemplate();
  }
}

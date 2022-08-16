import { createElement } from '../render';

const createEventAddTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class EventAddView {
  getTemplate () {
    return createEventAddTemplate();
  }

  getElement () {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement () {
    this.element = null;
  }
}

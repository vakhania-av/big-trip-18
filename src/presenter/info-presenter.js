import InfoView from '../view/trip-info-view';
import { render, RenderPosition } from '../render';

const { AFTERBEGIN } = RenderPosition;

export default class InfoPresenter {
  #container = null;

  constructor (container) {
    this.#container = container;
  }

  init = () => {
    render(new InfoView(), this.#container, AFTERBEGIN);
  };
}

import InfoView from '../view/trip-info-view';
import { render, RenderPosition } from '../render';

const { AFTERBEGIN } = RenderPosition;

export default class InfoPresenter {

  init = (container) => {
    this.container = container;
    render(new InfoView(), container, AFTERBEGIN);
  };
}

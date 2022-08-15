import { render } from '../render.js';

import InfoView from '../view/info-view.js';

export default class BoardPresenter {
  init = (boardContainer) => {
    this.boardContainer = boardContainer;

    render(new InfoView(), this.boardContainer, 'afterbegin');
  };
}

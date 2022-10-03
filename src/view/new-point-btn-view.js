import AbstractView from '../framework/view/abstract-view';

const createNewPointBtnTemplate = () => '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class NewPointBtnView extends AbstractView {
  get template () {
    return createNewPointBtnTemplate();
  }

  // Устанавливает обработчик события нажатия на кнопку
  setClickHandler = (cb) => {
    this._callback.click = cb;
    this.element.addEventListener('click', this.#ClickHandler);
  };

  // Обработчик события нажатия на кнопку
  #ClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

}

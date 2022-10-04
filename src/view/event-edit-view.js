import he from 'he';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { isCheckedOffer, humanizeDate, getCheckedDestination } from '../utils.js';
import { TYPES, FORM_TYPE, CITIES } from '../const.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const createAvailableOffersTemplate = (point, availableOffers, isDisabled) => (
  availableOffers.offers.map((offer) => (
    `<div class="event__offer-selector">
        <input
          class="event__offer-checkbox visually-hidden"
          id="event-offer-${point.type}-${offer.id}"
          type="checkbox" name="event-offer-${point.type}"
          ${isCheckedOffer(offer, point) ? 'checked' : ''}
          data-offer-id="${offer.id}"
          ${isDisabled ? 'disabled' : ''}
        >
        <label
          class="event__offer-label"
          for="event-offer-${point.type}-${offer.id}"
        >
        <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
        </label>
    `
  )).join('')
);

const createOffersTemplate = (point, offers, isDisabled) => {
  const offersByType = offers.find((offer) => point.type === offer.type);

  if (!offersByType || !offersByType.offers) {
    return '';
  }

  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${createAvailableOffersTemplate(point, offersByType, isDisabled)}
      </div>
    </section>`
  );
};

const createTypeListTemplate = (point, types) => (
  types.map((type) => {
    const pointType = `${type[0].toUpperCase()}${type.slice(1)}`;
    const isChecked = Boolean(point.type === type);

    return (
      `<div class="event__type-item">
        <input 
          id="event-type-${type}-1" 
          class="event__type-input  visually-hidden" 
          type="radio" name="event-type" 
          value="${type}" ${isChecked ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${pointType}</label>
      </div>`
    );
  }).join('')
);

const createPicturesTemplate = (destination) => (
  destination.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('')
);

const createImageContainerTemplate = (destination) => (
  `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${createPicturesTemplate(destination)}
    </div>
  </div>`
);

const createDescriptionTemplate = (selectedDestination) => {
  if (!selectedDestination) {
    return '';
  }

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${selectedDestination.description}</p>
      ${createImageContainerTemplate(selectedDestination)}
    </section>`
  );
};

const createResetButtonText = (formType, isDeleting) => {
  if (formType === FORM_TYPE.EDITING) {
    if (isDeleting) {
      return 'Deleting...';
    }
    return 'Delete';
  }

  return 'Cancel';
};

const createEventEditTemplate = (point, offers, destinations, formType) => {
  const { dateFrom, dateTo, basePrice, type, isDeleting, isDisabled, isSaving } = point;

  const dateFromFormatted = humanizeDate(dateFrom);
  const dateToFormatted = humanizeDate(dateTo);

  const typeFormatted = `${type[0].toUpperCase()}${type.slice(1)}`;
  const selectedDestination = getCheckedDestination(point, destinations);

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${createTypeListTemplate(point, TYPES)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${point.id}">
            ${typeFormatted}
          </label>
          <input 
            class="event__input  event__input--destination" 
            id="event-destination-${point.id}" 
            type="text" 
            name="event-destination" 
            value="${selectedDestination ? he.encode(selectedDestination.name) : ''}" 
            list="destination-list-1" 
            ${isDisabled ? 'disabled' : ''}
          >
          <datalist id="destination-list-1">
            ${CITIES.map((destination) => `option value="${destination.name}"></option`).join('')}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input 
            class="event__input  event__input--time" 
            id="event-start-time-1" 
            type="text" 
            name="event-start-time" 
            value="${dateFromFormatted}"
            ${isDisabled ? 'disabled' : ''}
          >
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input 
            class="event__input  event__input--time" 
            id="event-end-time-1" 
            type="text" 
            name="event-end-time" 
            value="${dateToFormatted}"
            ${isDisabled ? 'disabled' : ''}
          >
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input 
            class="event__input  event__input--price" 
            id="event-price-1" 
            type="number" 
            name="event-price" 
            value="${Math.abs(Number(basePrice))}"
            onkeydown="return event.keyCode !== 69 && event.keyCode !== 189" onFocus="this.select()"
            ${isDisabled ? 'disabled' : ''}
          >
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
        <button class="event__reset-btn" type="reset">${isDisabled ? 'disabled' : ''}
        ${createResetButtonText(formType, isDeleting)}
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${createOffersTemplate(point, offers)}
        ${createDescriptionTemplate(selectedDestination)}
      </section>
    </form>
  </li>`;
};

export default class EventEditView extends AbstractStatefulView {
  #offers = null;
  #destinations = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #formType = null;

  constructor (point, offers, destinations, formType = FORM_TYPE.EDITING) {
    super();
    this.#offers = offers;
    this.#destinations = destinations;
    this.#formType = formType;
    this._state = EventEditView.parsePointToState(point, this.#formType);

    this.#setInnerHandlers();
  }

  get template () {
    return createEventEditTemplate(this._state, this.#offers, this.#destinations, this.#formType);
  }

  // Перегрузим родительский метод, чтобы при удалении убирался ненужный элемент календаря из DOM
  removeElement = () => {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  };

  // Выполняет разбор данных точки в состояние
  static parsePointToState = (point) => (
    {...point,
      isDisabled: false,
      isDeleting: false,
      isSaving: false
    }
  );

  // Выполняет разбор данных из состояния для точки
  static parseStateToPoint = (state) => {
    const point = {...state};

    delete point.isDisabled;
    delete point.isDeleting;
    delete point.isSaving;

    return point;
  };

  // Подписка по нажатию кнопки
  setItemClickHandler = (cb) => {
    this._callback.click = cb;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
  };

  // Подписка по нажатию кнопки отправки формы
  setFormSubmitHandler = (cb) => {
    this._callback.formSubmit = cb;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  // Обработчик нажатия на кнопку
  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  // Обработчик отправки данных формы
  #formSubmitHandler = (evt) => {
    evt.preventDefault();

    const priceInput = this.element.querySelector('.event__input--price');
    const destinationInput = this.element.querySelector('.event__input--destination');

    const submitBtn = this.element.querySelector('.event__save-btn');

    if (priceInput.value < 1) {
      return;
    }

    if (destinationInput.value === '') {
      submitBtn.disabled = true;

      return;
    }

    this._callback.formSubmit(EventEditView.parseStateToPoint(this._state));
  };

  // Сброс внутренних обработчиков
  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setItemClickHandler(this._callback.click);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setCancelClickHandler(this._callback.cancelClick);
  };

  // Устанавливает внутренние обработчики
  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group').addEventListener('change', this.#pointTypeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#offerChooseHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
    this.#setDateFromPicker();
    this.#setDateToPicker();
  };

  // Обработчик смены точки маршрута
  #pointTypeChangeHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.tagName === 'INPUT') {
      this.updateElement({
        type: evt.target.value,
        offers: []
      });
    }
  };

  // Обработчик изменения пункта назначения
  #destinationChangeHandler = (evt) => {
    debugger
    evt.preventDefault();

    const selectedDestination = this.#destinations.find((destination) => evt.target.value === destination.name);

    if (!selectedDestination) {
      evt.target.value = '';

      return;
    }

    this.updateElement({ destination: selectedDestination.id });
  };

  // Обработчик изменения стоимости
  #priceChangeHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({ basePrice: evt.target.value });
  };

  // Обработчик выбора дополнительных опций
  #offerChooseHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.tagName === 'INPUT') {
      const currentOfferId = Number(evt.target.dataset.offerId);
      const hasOffer = this._state.offers.includes(currentOfferId);

      const updatedOffers = hasOffer ? this._state.offers.filter((offer) => offer !== currentOfferId) : this._state.offers.concat(currentOfferId);

      this.updateElement({ offers: updatedOffers });
    }
  };

  // Метод сброса
  reset = (point, destinations) => {
    this.updateElement(EventEditView.parsePointToState(point, destinations));
  };

  // Обработчик даты начала путешествия
  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate
    });
  };

  // Обработчик даты окончания путешествия
  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate
    });
  };

  #setDateFromPicker = () => {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        minDate: this._state.dateTo,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
        'time_24hr': true
      }
    );
  };

  #setDateToPicker = () => {
    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        minDate: this._state.dateFrom,
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
        'time_24hr': true
      }
    );
  };

  // Добавляет обработчик события на нажатие кнопки удаления
  setDeleteClickHandler = (cb) => {
    this._callback.deleteClick = cb;

    if (this.#formType === FORM_TYPE.CREATING) {
      return;
    }

    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  };

  // Добавляет обработчик события на нажатие кнопки отмены
  setCancelClickHandler = (cb) => {
    this._callback.cancelClick = cb;

    if (this.#formType === FORM_TYPE.EDITING) {
      return;
    }

    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formCancelClickHandler);
  };

  // Обработчик события кнопки удаления
  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(EventEditView.parseStateToPoint(this._state));
  };

  // Обработчик события кнопки отмены
  #formCancelClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.cancelClick(EventEditView.parseStateToPoint(this._state));
  };

}

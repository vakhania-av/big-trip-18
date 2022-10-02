import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { isCheckedOffer, humanizeDate, getCheckedDestination } from '../utils.js';
import { BLANK_POINT, CITIES, TYPES } from '../const.js';

const createAvailableOffersTemplate = (point, availableOffers) => (
  availableOffers.offers.map((offer) => (
    `<div class="event__offer-selector">
        <input
          class="event__offer-checkbox visually-hidden"
          id="event-offer-${point.type}-${offer.id}"
          type="checkbox" name="event-offer-${point.type}"
          ${isCheckedOffer(offer, point) ? 'checked' : ''}
          data-offer-id="${offer.id}"
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
    return;
  }

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${selectedDestination.description}</p>
      ${createImageContainerTemplate(selectedDestination)}
    </section>`
  );
};

const createOffersTemplate = (point, offers) => {
  const offersByType = offers.find((offer) => point.type === offer.type || point.type);
  const uniqueOffers = offersByType.offers.filter((item, index, array) => array.indexOf(item) === index);

  if (!offersByType || !offersByType.offers) {
    return '';
  }

  offersByType.offers = uniqueOffers ?? offersByType.offers;

  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${createAvailableOffersTemplate(point, offersByType)}
      </div>
    </section>`
  );

  /*return uniqueOffers.map((offer, index) => (
    `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${index}" type="checkbox" name="event-offer-luggage" ${isCheckedOffer(point, offer) ? 'checked' : ''}>
    <label class="event__offer-label" for="event-offer-luggage-${index}">
      <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`
  )).join('');*/
};

const createEventEditTemplate = (point, offers, destinations) => {
  const { dateFrom, dateTo, basePrice, type } = point;

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
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${createTypeListTemplate(point, TYPES)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${typeFormatted}
          </label>
          <input 
            class="event__input  event__input--destination" 
            id="event-destination-1" 
            type="text" 
            name="event-destination" 
            value="${selectedDestination ? selectedDestination.name : ''}" 
            list="destination-list-1"
          >
          <datalist id="destination-list-1">
            ${CITIES.map((city) => `option value="${city}"></option`).join('')}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFromFormatted}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateToFormatted}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          ${createOffersTemplate(point, offers)}
          ${createDescriptionTemplate(selectedDestination)}
        </section>
    </form>
  </li>`;
};

export default class EventEditView extends AbstractStatefulView {
  #offers = null;
  #destinations = null;

  constructor (point = BLANK_POINT, offers, destinations) {
    super();
    this._state = EventEditView.parseStateToPoint(point);
    this.#offers = offers;
    this.#destinations = destinations;
  }

  get template () {
    return createEventEditTemplate(this._state, this.#offers, this.#destinations);
  }

  static parsePointToState = (point) => ({...point});

  static parseStateToPoint = (state) => {
    const point = {...state};

    return point;
  };

  setItemClickHandler = (cb) => {
    this._callback.click = cb;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
  };

  setFormSubmitHandler = (cb) => {
    this._callback.formSubmit = cb;
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EventEditView.parseStateToPoint(this._state));
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setItemClickHandler(this._callback.click);
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group').addEventListener('change', this.#pointTypeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#offerChooseHandler);
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

  // Обработчик пункта назначения
  #destinationChangeHandler = (evt) => {
    evt.preventDefault();

    if (!evt.target.value) {
      this.updateElement({
        destination: ''
      });

      return;
    }

    const selectedDestination = this.#destinations.find((destination) => evt.target.value === destination.name);

    this.updateElement({
      destination: selectedDestination.id
    });
  };

  #offerChooseHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.tagName === 'INPUT') {
      const currentOfferId = Number(evt.target.dataset.offerId);
      const currentOfferIndex = this._state.offers.indexOf(currentOfferId);

      if (!currentOfferIndex) {
        this._state.offers.push(currentOfferId);
        return;
      }

      this._state.offers.splice(currentOfferIndex, 1);
    }
  };

  reset = (point, destinations) => {
    this.updateElement(EventEditView.parsePointToState(point, destinations));
  };

}

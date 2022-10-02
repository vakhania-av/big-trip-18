import AbstractView from '../framework/view/abstract-view.js';
import { calculateDurationInPoint, humanizePointDate, humanizePointTime, getCheckedOffers, getCheckedDestination } from '../utils';

const createOffersTemplate = (offers) => {
  if (!offers.length) {
    return (
      `<li class="event__offer">
        <span class="event__offer-title">No offers available</span>
      </li>`
    );
  }

  /*return offers.filter((offer, index, array) => array.indexOf(offer) === index)
    .map(({title, price}) =>
      `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </li>`
    ).join('');*/
  return offers.map((offer) =>
    `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>`).join('');
};

const createEventItemTemplate = (point, offers, destinations) => {
  const { basePrice, dateFrom, dateTo, isFavorite, type } = point;

  const dateFromFormatted = humanizePointDate(dateFrom);
  const timeFrom = humanizePointTime(dateFrom);
  const timeTo = humanizePointTime(dateTo);
  const duration = calculateDurationInPoint(dateFrom, dateTo);

  const favoriteClass = isFavorite ? 'event__favorite-btn--active' : '';
  const typeFormatted = `${type[0].toUpperCase()}${type.slice(1)}`;

  const selectedOffers = getCheckedOffers(point, offers);
  const selectedDestinations = getCheckedDestination(point, destinations);

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dateFrom}">${dateFromFormatted}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${typeFormatted} ${selectedDestinations.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dateFrom}">${timeFrom}</time>
          &mdash;
          <time class="event__end-time" datetime="${dateTo}">${timeTo}</time>
        </p>
        <p class="event__duration">${duration}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${createOffersTemplate(selectedOffers)}
      </ul>
      <button class="event__favorite-btn ${favoriteClass}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

export default class EventItemView extends AbstractView {

  #point = null;
  #offers = null;
  #destinations = null;

  constructor (point, offers, destinations) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  get template () {
    return createEventItemTemplate(this.#point, this.#offers, this.#destinations);
  }

  setEditClickHandler = (cb) => {
    this._callback.clickEdit = cb;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
  };

  setFavoriteClickHandler = (cb) => {
    this._callback.favoriteClick = cb;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.clickEdit();
  };

  #favoriteClickHandler = () => {
    this._callback.favoriteClick();
  };
}


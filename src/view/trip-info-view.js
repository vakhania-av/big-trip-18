import AbstractView from '../framework/view/abstract-view.js';
import { MAX_DESTINATIONS_DISPLAYED } from '../const.js';
import dayjs from 'dayjs';

const getDestinations = (points, destinations) => {
  if (!points.length) {
    return 'Make your own route';
  }

  let selectedDestinations = destinations.filter((destination) => points.find((point) => point.destination === destination.id));
  selectedDestinations = selectedDestinations.map((destination) => destination.name);

  if (selectedDestinations.length > MAX_DESTINATIONS_DISPLAYED) {
    return [selectedDestinations[0], selectedDestinations.at(-1)].join(' &mdash; ... &mdash; ');
  }

  return selectedDestinations.join(' &mdash; ');

};

const getTripPrice = (points) => {
  if (!points.length) {
    return 0;
  }

  const totalPrice = points.reduce((total, point) => total + Number(point.basePrice), 0);

  return totalPrice;
};

const getTripDates = (points) => {
  if (!points.length) {
    return '... - ...';
  }

  const dateFrom = dayjs(points[0].dateFrom).format('D MMM');
  const dateTo = dayjs(points.at(-1).dateTo).format('D MMM');

  return [dateFrom, dateTo].join(' - ');
};

const createInfoTemplate = () => (
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${getDestinations(points, destinations)}</h1>
      <p class="trip-info__dates">${getTripDates(points)}</p>
    </div>
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTripPrice(points)}</span>
    </p>
  </section>`
);

export default class InfoView extends AbstractView {
  #points = null;
  #offers = null;
  #destinations = null;

  constructor (points, offers, destinations) {
    super();
    this.#points = points;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  get template () {
    return createInfoTemplate(this.#points, this.#destinations);
  }
}



import AbstractView from '../framework/view/abstract-view.js';
import { MAX_DESTINATIONS_DISPLAYED } from '../const.js';
import dayjs from 'dayjs';

const getDestinations = (points, destinations) => {
  if (!points.length) {
    return 'Make your own route';
  }

  const selectedDestinations = destinations.filter((destination) => points.find((point) => point.destination === destination.id)).map((city) => city.name);

  if (selectedDestinations.length > MAX_DESTINATIONS_DISPLAYED) {
    const firstDestination = destinations.find((destination) => points[0].destination === destination.id).name;
    const lastDestination = destinations.find((destination) => points.at(-1).destination === destination.id).name;
    return [firstDestination, lastDestination].join(' &mdash; ... &mdash; ');
  }

  return selectedDestinations.join(' &mdash; ');

};

const getTripPrice = (points, offers) => {
  if (!points.length) {
    return 0;
  }

  const totalBasePrice = points.reduce((total, point) => total + Number(point.basePrice), 0);
  let offersTotalPrice = 0;

  for (const point of points) {
    const offersByType = offers.find((offer) => point.type === offer.type);

    for (const offer of offersByType.offers) {
      if (point.offers.includes(offer.id)) {
        offersTotalPrice += offer.price;
      }
    }
  }

  const fullTripPrice = totalBasePrice + offersTotalPrice;

  return fullTripPrice;
};

const getTripDates = (points) => {
  if (!points.length) {
    return '... - ...';
  }

  const dateFrom = dayjs(points[0].dateFrom).format('D MMM');
  const dateTo = dayjs(points[points.length - 1].dateTo).format('D MMM');

  return [dateFrom, dateTo].join(' - ');
};

const createInfoTemplate = (points, offers, destinations) => (
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${getDestinations(points, destinations)}</h1>
      <p class="trip-info__dates">${getTripDates(points)}</p>
    </div>
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTripPrice(points, offers)}</span>
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
    return createInfoTemplate(this.#points, this.#offers, this.#destinations);
  }
}



import AbstractView from '../framework/view/abstract-view.js';
import { MAX_DESTINATIONS_DISPLAYED } from '../const.js';
import dayjs from 'dayjs';

const createInfoTemplate = (getDestinations, getTripDates, getTripPrice) => (
  `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${getDestinations()}</h1>
      <p class="trip-info__dates">${getTripDates()}</p>
    </div>
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTripPrice()}</span>
    </p>
  </section>`
);

export default class InfoView extends AbstractView {
  #points = [];
  #offers = [];
  #destinations = [];

  constructor (points, offers, destinations) {
    super();
    this.#points = points;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  get template () {
    return createInfoTemplate(this.#getDestinations, this.#getTripDates, this.#getTripPrice);
  }

  // Получение пунктов назначения
  #getDestinations = () => {
    if (!this.#points.length) {
      return 'Make your own route';
    }

    const selectedDestinations = this.#destinations.filter((destination) => this.#points.find((point) => point.destination === destination.id)).map((city) => city.name);

    if (selectedDestinations.length > MAX_DESTINATIONS_DISPLAYED) {
      const firstDestination = this.#destinations.find((destination) => this.#points[0].destination === destination.id).name;
      const lastDestination = this.#destinations.find((destination) => this.#points.at(-1).destination === destination.id).name;
      return [firstDestination, lastDestination].join(' &mdash; ... &mdash; ');
    }

    return selectedDestinations.join(' &mdash; ');
  };

  // Получение дат путешествия
  #getTripDates = () => {
    if (!this.#points.length) {
      return '';
    }

    const dateFrom = dayjs(this.#points[0].dateFrom).format('D MMM');
    const dateTo = dayjs(this.#points[this.#points.length - 1].dateTo).format('D MMM');

    return [dateFrom, dateTo].join(' - ');
  };

  // Получение цены путешествия
  #getTripPrice = () => {
    if (!this.#points.length) {
      return 0;
    }

    return this.#points.reduce((totalSum, point) => {
      const offersByType = this.#offers.find((offer) => point.type === offer.type);

      const offersSum = offersByType.offers.reduce((total, currentOffer) => {
        if (point.offers.includes(currentOffer.id)) {
          total += currentOffer.price;
        }

        return total;
      }, 0);

      totalSum += point.basePrice + offersSum;

      return totalSum;
    }, 0);
  };
}



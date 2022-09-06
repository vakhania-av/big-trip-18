// Модель для сущности "Точка маршрута"

import { generatePoint } from '../mock/point.js';
import { generateOffers } from '../mock/offer.js';
import { generateDestination } from '../mock/destination.js';

export default class PointModel {
  #points = Array.from({length: 10}, generatePoint);
  #offers = generateOffers();
  #destinations = generateDestination();

  get offers () {
    return this.#offers;
  }

  get points () {
    return this.#points;
  }

  get destinations () {
    return this.#destinations;
  }
}

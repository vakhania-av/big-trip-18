// Модель для сущности "Точка маршрута"

import { generatePoint } from '../mock/point.js';
import { generateOffers } from '../mock/offer.js';
import { generateDestination } from '../mock/destination.js';
import { getCheckedOffers, getCheckedDestination } from '../utils.js';

export default class PointModel {
  #points = Array.from({length: 0}, generatePoint);
  #offers = generateOffers();
  #destination = generateDestination();

  get offers () {
    return this.#offers;
  }

  get points () {
    for (const point of this.#points) {
      point.offers = getCheckedOffers(point, this.#offers);
      point.destination = getCheckedDestination(point, this.#destination);
    }

    return this.#points;
  }
}

// Модель для сущности "Точка маршрута"

import { generatePoint } from '../mock/point.js';
import { generateOffers } from '../mock/offer.js';
import { generateDestination } from '../mock/destination.js';
import { getCheckedOffers, getCheckedDestination } from '../utils.js';

export default class PointModel {
  _points = Array.from({length: 10}, generatePoint);
  _offers = generateOffers();
  _destination = generateDestination();

  get offers () {
    return this._offers;
  }

  get points () {
    for (const point of this._points) {
      point.offers = getCheckedOffers(point, this._offers);
      point.destination = getCheckedDestination(point, this._destination);
    }

    return this._points;
  }
}

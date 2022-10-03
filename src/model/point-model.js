// Модель для сущности "Точка маршрута"

import Observable from '../framework/observable.js';
import { generatePoint } from '../mock/point.js';
import { generateOffers } from '../mock/offer.js';
import { generateDestinations } from '../mock/destination.js';

export default class PointModel extends Observable {
  #points = Array.from({length: 10}, generatePoint);
  #offers = generateOffers();
  #destinations = generateDestinations();

  get offers () {
    return this.#offers;
  }

  get points () {
    return this.#points;
  }

  get destinations () {
    return this.#destinations;
  }

  // Добавление точки маршрута
  addPoint = (updateType, update) => {
    this.#points = [update, ...this.#points];

    this._notify(updateType, update);
  };

  // Удаление точки маршрута
  deletePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (!index) {
      throw new Error(`Warning! Unexisting point ${update} can't be deleted!`);
    }

    this.#points = [...this.#points.slice(0, index), ...this.#points.slice(index + 1)];

    this._notify(updateType, update);
  };

  // Обновление точки маршрута
  updatePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (!index) {
      throw new Error(`Warning! Unexisting point ${update} can't be updated!`);
    }

    this.#points = [...this.#points.slice(0, index), ...this.#points.slice(index + 1)];

    this._notify(updateType, update);
  };
}

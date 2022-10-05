// Модель для сущности "Точка маршрута"

import Observable from '../framework/observable.js';

import { UPDATE_TYPE } from '../const.js';

export default class PointModel extends Observable {
  #pointApiService = null;
  #points = [];
  #offers = [];
  #destinations = [];

  constructor (pointApiService) {
    super();
    this.#pointApiService = pointApiService;
  }

  get offers () {
    return this.#offers;
  }

  get points () {
    return this.#points;
  }

  get destinations () {
    return this.#destinations;
  }

  // Метод инициализации
  init = async () => {
    try {
      const points = await this.#pointApiService.points;
      const offers = await this.#pointApiService.offers;
      const destinations = await this.#pointApiService.destinations;

      this.#points = points.map(this.#adaptToClient);
      this.#offers = offers;
      this.#destinations = destinations;

    } catch (err) {
      this.#points = [];
      this.#offers = [];
      this.#destinations = [];
    }

    this._notify(UPDATE_TYPE.INIT);
  };

  // Метод-адаптер для преобразования данных в сторону клиента
  #adaptToClient = (point) => {
    const adaptedPoint = {...point,
      basePrice: point['base_price'],
      dateFrom: new Date(point['date_from']),
      dateTo: new Date(point['date_to']),
      isFavorite: point['is_favorite']
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  };

  // Добавление точки маршрута
  addPoint = (updateType, update) => {
    this.#points = [update, ...this.#points];

    this._notify(updateType, update);
  };

  // Удаление точки маршрута
  deletePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Warning! Unexisting point ${update} can't be deleted!`);
    }

    this.#points = [...this.#points.slice(0, index), ...this.#points.slice(index + 1)];

    this._notify(updateType);
  };

  // Обновление точки маршрута
  updatePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Warning! Unexisting point ${update} can't be updated!`);
    }

    this.#points = [...this.#points.slice(0, index), update, ...this.#points.slice(index + 1)];

    this._notify(updateType, update);
  };
}

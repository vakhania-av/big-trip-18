import ApiService from './framework/api-service.js';
import { METHOD } from './const.js';

export default class TaskApiService extends ApiService {
  get points () {
    return this._load({ url: 'points' }).then(ApiService.parseResponse);
  }

  get offers () {
    return this._load({ url: 'offers' }).then(ApiService.parseResponse);
  }

  get destinations () {
    return this._load({ url: 'destinations' }).then(ApiService.parseResponse);
  }

  // Добавление точки маршрута
  addPoint = async (point) => {
    const response = await this._load({
      url: 'points',
      method: METHOD.POST,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  // Удаление точки маршрута
  deletePoint = async (point) => {
    const response = await this._load({
      url: `points/${point.id}`,
      method: METHOD.DELETE,
    });

    return response;
  };

  // Обновление точки маршрута
  updatePoint = async (point) => {
    const response = await this._load({
      url: `points/${point.id}`,
      method: METHOD.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'})
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  // Метод-адаптер для преобразования данных в сторону сервера
  #adaptToServer = (point) => {
    const adaptedPoint = {...point,
      'base_price': Number(point.basePrice),
      'date_from': point.dateFrom,
      'date_to': point.dateTo,
      'is_favorite': point.isFavorite
    };

    delete adaptedPoint.basePrice;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  };

}


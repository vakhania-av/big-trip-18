// Модель для сущности "Точка маршрута"

import { generatePoint } from '../mock/point';

export default class PointModel {
  _points = Array.from({length: 3}, generatePoint);

  get points () {
    return this._points;
  }
}

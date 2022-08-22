/** Описание структуры данных "Точка маршрута" **/

import dayjs from 'dayjs';

import { getRandomInt, getRandomArrayElement, getUniqueNumbersArray } from '../utils.js';
import { TYPES } from '../const.js';

// Функция получения идентификатора для точки маршрута
const getPointId = () => String(getRandomInt(1, 50));

// Функция формирования структуры точки маршрута
export const generatePoint = () => {
  const MAX_DATE_GAP = 30;
  const dayGap = getRandomInt(-MAX_DATE_GAP, MAX_DATE_GAP);

  const dateFrom = dayjs().add(dayGap, 'day').toDate();
  const dateTo = dayjs(dateFrom).add(getRandomInt(60, 300), 'minute').toDate();

  return {
    price: getRandomInt(10, 800),
    dateFrom,
    dateTo,
    destination: 1,
    id: getPointId(),
    isFavorite: Boolean(getRandomInt(0, 1)),
    offers: getUniqueNumbersArray(3, getRandomInt),
    type: getRandomArrayElement(TYPES),
  };
};


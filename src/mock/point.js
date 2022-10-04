/** Описание структуры данных "Точка маршрута" **/

import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

import { getRandomInt } from '../utils.js';

const generateDate = () => {
  const MAX_DATE_GAP = 5000;
  const daysGap = getRandomInt(-MAX_DATE_GAP, MAX_DATE_GAP);

  return dayjs().add(daysGap, 'm').toDate();
};

// Функция формирования структуры точки маршрута
export const generatePoint = () => {
  const dateFrom = generateDate();
  let dateTo = generateDate();

  while (dateFrom >= dateTo) {
    dateTo = generateDate();
  }

  return {
    basePrice: getRandomInt(10, 800),
    dateFrom,
    dateTo,
    destination: getRandomInt(1, 4),
    id: nanoid(),
    isFavorite: Boolean(getRandomInt(0, 1)),
    offers: [1, 3],
    type: 'taxi',
  };
};


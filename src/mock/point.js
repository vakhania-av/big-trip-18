/** Описание структуры данных "Точка маршрута" **/

import dayjs from 'dayjs';

import { getRandomInt, getRandomArrayElement } from '../utils.js';
import { CITIES, TYPES, OFFERS, DESCRIPTIONS, PHOTOS_COUNT } from '../const.js';

// Функция генерации массива источников фотографий
const generatePhotoSourcesArray = (count) => Array.from({length: count}, () => `http://picsum.photos/248/152?r=${getRandomInt(1, count)}`);

// Массив фотографий
const PHOTOS = generatePhotoSourcesArray(PHOTOS_COUNT);

// Функция генерации фотографий
const generatePhoto = () => ({
  src: getRandomArrayElement(PHOTOS),
  description: getRandomArrayElement(DESCRIPTIONS)
});

// Функция генерации структуры пункта назначения
const generateDestination = () => ({
  description: Array.from({ length: 5 }, () => getRandomArrayElement(DESCRIPTIONS)),
  city: getRandomArrayElement(CITIES),
  photos: Array.from({ length: 5 }, generatePhoto)
});

// Функция генерации массива опций
const generateOffers = () => Array.from({ length: 5 }, () => getRandomArrayElement(OFFERS));

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
    destination: generateDestination(),
    id: getPointId(),
    isFavorite: Boolean(getRandomInt(0, 1)),
    offers: generateOffers(),
    type: getRandomArrayElement(TYPES),
  };
};


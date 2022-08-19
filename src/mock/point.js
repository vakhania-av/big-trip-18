/** Описание структуры данных "Точка маршрута" **/

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
  description: Array.from({ length: 5 }, getRandomArrayElement(DESCRIPTIONS)),
  city: getRandomArrayElement(CITIES),
  photos: Array.from({ length: 5 }, generatePhoto())
});

// Функция генерации массива опций
const generateOffers = () => Array.from({ length: 5 }, () => getRandomArrayElement(OFFERS));

// Функция получения идентификатора для точки маршрута
const getPointId = () => String(getRandomInt(1, 50));

// Функция формирования структуры точки маршрута
export const generatePoint = () => ({
  price: getRandomInt(10, 800),
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  destination: generateDestination(),
  id: getPointId(),
  isFavorite: Boolean(getRandomInt(0, 1)),
  offers: generateOffers(),
  type: getRandomArrayElement(TYPES)
});


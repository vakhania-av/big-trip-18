/** Описание структуры данных "Пункт назначения" **/

import { getRandomInt, getRandomArrayElement } from '../utils.js';
import { CITIES, DESCRIPTIONS, PHOTOS_COUNT } from '../const.js';

// Функция генерации массива источников фотографий
const generatePhotoSourcesArray = (count) => Array.from({length: count}, () => `http://picsum.photos/248/152?r=${getRandomInt(1, count)}`);

const PHOTOS = generatePhotoSourcesArray(PHOTOS_COUNT); // Массив фотографий

// Функция генерации фотографий
const generatePhoto = () => ({
  src: getRandomArrayElement(PHOTOS),
  description: getRandomArrayElement(DESCRIPTIONS)
});

export const generateDestination = () => [
  {
    id: 1,
    description: Array.from({ length: 5 }, () =>
      getRandomArrayElement(DESCRIPTIONS)
    ),
    name: getRandomArrayElement(CITIES),
    pictures: Array.from({ length: 5 }, generatePhoto),
  },
];

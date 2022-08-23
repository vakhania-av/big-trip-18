/** Описание структуры данных "Дополнительные опции" **/

import { TYPES, OFFERS } from '../const.js';
import { getRandomArrayElement } from '../utils';

export const generateOffers = () => ([
  {
    type: getRandomArrayElement(TYPES),
    offers: Array.from({ length: 5 }, () => getRandomArrayElement(OFFERS))
  }
]);

/** Описание структуры данных "Пункт назначения" **/

import { getRandomInt } from '../utils';

export const generateDestinations = () => ([
  {
    id: 1,
    description: 'Riga is the largest of the three Baltic capitals, astounding travelers with its magnificent Old Town, beautiful and sometimes terrifying Art Nouveau buildings, crazy nightlife, and cheap but excellent and plentiful plane connections to the rest of Europe',
    name: 'Riga',
    pictures: [
      {
        src: `http://picsum.photos/248/152?r=${getRandomInt(1, 100)}`,
        description: 'The Guild House of the Brotherhood of Blackheads'
      },
      {
        src: `http://picsum.photos/248/152?r=${getRandomInt(1, 100)}`,
        description: 'The tallest building in Riga'
      },
      {
        src: `http://picsum.photos/248/152?r=${getRandomInt(1, 100)}`,
        description: 'Freedom Monument'
      }
    ]
  },
  {
    id: 2,
    description: 'Vilnius is an outstanding example of a medieval foundation which exercised a profound influence on architectural and cultural developments in a wide area of Eastern Europe over several centuries',
    name: 'Vilnius',
    pictures: [
      {
        src: `http://picsum.photos/248/152?r=${getRandomInt(1, 100)}`,
        description: 'Vilnius Old Town'
      },
      {
        src: `http://picsum.photos/248/152?r=${getRandomInt(1, 100)}`,
        description: 'Uzupis District'
      },
      {
        src: `http://picsum.photos/248/152?r=${getRandomInt(1, 100)}`,
        description: 'Jewish Quarter'
      }
    ]
  },
  {
    id: 3,
    description: 'Tallinn is a cosy capital with clean air and a relaxed vibe. Historical and cultural legacies from different eras contrast with its vibrant and creative urban environment',
    name: 'Tallinn',
    pictures: [
      {
        src: `http://picsum.photos/248/152?r=${getRandomInt(1, 100)}`,
        description: 'Tallinn\'s Old Town'
      },
      {
        src: `http://picsum.photos/248/152?r=${getRandomInt(1, 100)}`,
        description: 'Kadriorg\'s Baroque palace park'
      },
      {
        src: `http://picsum.photos/248/152?r=${getRandomInt(1, 100)}`,
        description: 'Toompea Castle'
      }
    ]
  },
  {
    id: 4,
    description: 'Warsaw is the epitome of a dynamic European metropolis, its trademarks – besides a rich history – being its open-minded residents, the River Vistula and exceptional cuisine. The Polish capital is a city that is constantly changing, to be discovered anew with every successive visit. And, trust us, you will come back…',
    name: 'Warsaw',
    pictures: [
      {
        src: `http://picsum.photos/248/152?r=${getRandomInt(1, 100)}`,
        description: 'Wilanow Palace'
      },
      {
        src: `http://picsum.photos/248/152?r=${getRandomInt(1, 100)}`,
        description: 'Copernicus Science Centre'
      },
      {
        src: `http://picsum.photos/248/152?r=${getRandomInt(1, 100)}`,
        description: 'Nowy Swiat Street'
      },
      {
        src: `http://picsum.photos/248/152?r=${getRandomInt(1, 100)}`,
        description: 'Old Town Square'
      },
      {
        src: `http://picsum.photos/248/152?r=${getRandomInt(1, 100)}`,
        description: 'University of Warsaw Library'
      }
    ]
  }
]);

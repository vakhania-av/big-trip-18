/** Описание структуры данных "Пункт назначения" **/
export const generateDestinations = () => ([
  {
    id: 1,
    description: 'Riga is the largest of the three Baltic capitals, astounding travelers with its magnificent Old Town, beautiful and sometimes terrifying Art Nouveau buildings, crazy nightlife, and cheap but excellent and plentiful plane connections to the rest of Europe',
    name: 'Riga',
    pictures: [
      {
        src: `http://picsum.photos/248/152?r=${Math.random()}`,
        description: 'The Guild House of the Brotherhood of Blackheads'
      },
      {
        src: `http://picsum.photos/248/152?r=${Math.random()}`,
        description: 'The tallest building in Riga'
      },
      {
        src: `http://picsum.photos/248/152?r=${Math.random()}`,
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
        src: `http://picsum.photos/248/152?r=${Math.random()}`,
        description: 'Vilnius Old Town'
      },
      {
        src: `http://picsum.photos/248/152?r=${Math.random()}`,
        description: 'Uzupis District'
      },
      {
        src: `http://picsum.photos/248/152?r=${Math.random()}`,
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
        src: `http://picsum.photos/248/152?r=${Math.random()}`,
        description: 'Tallinn\'s Old Town'
      },
      {
        src: `http://picsum.photos/248/152?r=${Math.random()}`,
        description: 'Kadriorg\'s Baroque palace park'
      },
      {
        src: `http://picsum.photos/248/152?r=${Math.random()}`,
        description: 'Toompea Castle'
      }
    ]
  }
]);

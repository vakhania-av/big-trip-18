/** Описание структуры данных "Дополнительные опции" **/

export const generateOffers = () => ([
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: 2,
        title: 'Meet with a sign',
        price: 20
      },
      {
        id: 3,
        title: 'Take luggage',
        price: 40
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: 1,
        'title': 'Add luggage',
        'price': 50
      },
      {
        id: 2,
        title: 'Add meal',
        price: 10
      }
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 2,
        'title': 'Add music',
        'price': 70
      },
      {
        id: 3,
        title: 'Add coupe',
        price: 140
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: 3,
        'title': 'Add fuel',
        'price': 30
      }
    ]
  }
]);

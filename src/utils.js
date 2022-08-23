/** Модуль со служебными функциями **/

// Функция получения случайного числа из диапазона (включительно)
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const randomNum = Math.random() * (max - min + 1) + min;
  return Math.floor(randomNum);
};

// Функция получения случайного элемента массива
const getRandomArrayElement = (arr) => arr[getRandomInt(0, arr.length - 1)];

// Функция получения массива уникальных чисел из диапазона
const getUniqueNumbersArray = (count, cb, min = 1, max = 5) => {
  const items = [];

  for (let i = 0; i < count; i++) {
    items.push(cb(min, max));
  }

  return [...new Set(items)];
};

// Проверка на выбранные дополнительные опции
const isCheckedOffer = (point, offer) => point.offers.some((currentOffer) => currentOffer.id === offer.id);

// Функция сопоставления выбранных дополнительных опций
const getCheckedOffers = (point, offers) => {
  const offersByType = offers.find((offer) => (point.type === offer.type || point.type));

  return offersByType.offers.filter((offer) => point.offers.some((id) => id === offer.id));
};

// Функция сопоставления выбранного пункта назначения
const getCheckedDestination = (point, destinations) => destinations.find((destination) => point.destination === destination.id);

export { getRandomInt, getRandomArrayElement, getUniqueNumbersArray, isCheckedOffer, getCheckedOffers, getCheckedDestination };


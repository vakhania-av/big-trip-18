/** Модуль со служебными функциями **/
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

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

// Функции приведения даты и времени к человекочитаемому виду
const humanizeDate = (date) => dayjs(date).format('DD/MM/YY HH:mm');
const humanizePointDate = (date) => dayjs(date).format('MMM D');
const humanizePointTime = (date) => dayjs(date).format('HH:mm');

// Функция подсчёта времени пребывания в точке
const calculateDurationInPoint = (startDate, endDate) => {
  const dateFrom = dayjs(startDate);
  const dateTo = dayjs(endDate);
  const differenceInMinutes = dateTo.diff(dateFrom, 'minute');

  switch (true) {
    case (dateTo.diff(dateFrom, 'days') >= 1):
      return dayjs.duration(differenceInMinutes, 'minute').format('DD[D] HH[H] mm[M]');
    case (dateTo.diff(dateFrom, 'hours') >= 1):
      return dayjs.duration(differenceInMinutes, 'minute').format('HH[H] mm[M]');
    default:
      return dayjs.duration(differenceInMinutes, 'minute').format('mm[M]');
  }
};

// Проверка на выбранные дополнительные опции
const isCheckedOffer = (offer, point) => point.offers.some((currentOffer) => currentOffer.id === offer.id);

// Функция сопоставления выбранных дополнительных опций
const getCheckedOffers = (point, offers) => {
  const offersByType = offers.find((offer) => (point.type === offer.type || point.type));

  return offersByType.offers.filter((offer) => point.offers.some((id) => id === offer.id));
};

// Функция сопоставления выбранного пункта назначения
const getCheckedDestination = (point, destinations) => destinations.find((destination) => point.destination === destination.id);

export {
  getRandomInt,
  getRandomArrayElement,
  getUniqueNumbersArray,
  humanizeDate,
  humanizePointDate,
  humanizePointTime,
  calculateDurationInPoint,
  isCheckedOffer,
  getCheckedOffers,
  getCheckedDestination
};


/** Модуль со служебными функциями **/
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

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
const isCheckedOffer = (offer, point) => point.offers.some((currentOffer) => currentOffer === offer.id);

// Функция сопоставления выбранных дополнительных опций
const getCheckedOffers = (point, offers) => {
  const offersByType = offers.find((offer) => (point.type === offer.type));

  if (!offersByType || !offersByType.offers) {
    return;
  }

  return offersByType.offers.filter((offer) => point.offers.some((id) => id === offer.id));
};

// Функция сопоставления выбранного пункта назначения
const getCheckedDestination = (point, destinations) => destinations.find((destination) => point.destination === destination.id);

// Функция проверки клавиши Escape
const isEscKey = (evt) => (evt.key.includes('Escape', 'Esc'));

export {
  humanizeDate,
  humanizePointDate,
  humanizePointTime,
  calculateDurationInPoint,
  isCheckedOffer,
  getCheckedOffers,
  getCheckedDestination,
  isEscKey
};


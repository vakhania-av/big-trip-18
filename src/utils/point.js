import dayjs from 'dayjs';

// Сортировка по времени
const sortByDuration = (pointA, pointB) => {
  const durationA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const durationB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

  return durationB - durationA;
};

// Сортировка по цене
const sortByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

// Сортировка по дате
const sortByDate = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

export {
  sortByDuration,
  sortByPrice,
  sortByDate
};


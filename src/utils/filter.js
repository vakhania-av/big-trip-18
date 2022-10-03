/** Модуль со служебными функциями для фильтров **/

import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { FILTER_TYPE } from '../const.js';

dayjs.extend(isSameOrBefore);

export const filterPoints = (filterType, points) => {
  const pastPoints = points.filter((point) => dayjs().isAfter(dayjs(point.dateFrom), 'D'));
  const futurePoints = points.filter((point) => dayjs().isSameOrBefore(dayjs(point.dateTo), 'D'));

  switch (filterType) {
    case FILTER_TYPE.EVERYTHING:
      return points;
    case FILTER_TYPE.PAST:
      return pastPoints;
    case FILTER_TYPE.FUTURE:
      return futurePoints;
    default:
      throw new Error(`Warning! Filter type ${filterType} is unknown!`);
  }
};

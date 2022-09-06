import { isPointInPast, isPointInFuture } from '../utils/filter.js';

export const generateFilters = (points) => {
  const pointsInPast = points.filter((point) => isPointInFuture(point.dateFrom));
  const pointsInFuture = points.filter((point) => isPointInPast(point.dateTo));

  return {
    EVERYTHING: {
      name: 'everything',
      isDisabled: !points.length,
      isChecked: true
    },
    PAST: {
      name: 'past',
      isDisabled: !pointsInPast.length,
      isChecked: false
    },
    FUTURE: {
      name: 'future',
      isDisabled: !pointsInFuture.length,
      isChecked: false
    }
  };
};

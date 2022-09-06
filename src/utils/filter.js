/** Модуль со служебными функциями для фильтров **/

import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrBefore);

const isPointInPast = (date) => date && dayjs().isAfter(date, 'D');
const isPointInFuture = (date) => date && dayjs().isSameOrBefore(date, 'D');

export { isPointInPast ,isPointInFuture};

import dayjs from 'dayjs';

/** Описание констант **/

// Типы
const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

// Шаблон сообщений для фильтров
const EMPTY_POINT_MESSAGE = {
  EVERYTHING: 'Click New Event to create your first point',
  FUTURE: 'There are no future events now',
  PAST: 'There are no past events now'
};

// Типы сортировки
const SortType = {
  DEFAULT: 'day',
  DURATION: 'time',
  PRICE: 'price'
};

// Пустая точка маршрута
const BLANK_POINT = {
  basePrice: 0,
  dateTo: dayjs().toDate(),
  dateFrom: dayjs().toDate(),
  destination: 0,
  isFavorite: false,
  offers: [],
  type: TYPES[0]
};

// Объект с константами для типов фильтра
const FILTER_TYPE = {
  EVERYTHING: 'EVERYTHING',
  PAST: 'PAST',
  FUTURE: 'FUTURE'
};

// Объект с видами обновлений
const UPDATE_TYPE = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  INIT_ERROR: 'INIT_ERROR'
};

// Объект с типами режима формы
const FORM_TYPE = {
  CREATING: 'CREATING',
  EDITING: 'EDITING'
};

// Объект с видами действий пользователя
const UserAction = {
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
  UPDATE_POINT: 'UPDATE_POINT'
};

// Константа с максимальным количество отображаемых точек маршрута в информацинной строке
const MAX_DESTINATIONS_DISPLAYED = 3;

// Данные для подключения к серверу
const API_DATA = {
  END_POINT: 'https://18.ecmascript.pages.academy/big-trip',
  AUTHORIZATION: 'Basic gt890brjv7mbfp'
};

// Перечисление с методами HTTP-запросов
const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE'
};

// Перечисление с возможными режимами точки маршрута
const POINT_MODE = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

// Перечисление с границами времени задержки
const TIME_LIMIT = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000
};

export {
  TYPES,
  EMPTY_POINT_MESSAGE,
  SortType,
  BLANK_POINT,
  FILTER_TYPE,
  UPDATE_TYPE,
  FORM_TYPE,
  UserAction,
  MAX_DESTINATIONS_DISPLAYED,
  API_DATA,
  METHOD,
  POINT_MODE,
  TIME_LIMIT
};


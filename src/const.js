import dayjs from 'dayjs';

/** Описание констант **/

// Города
const CITIES = ['Riga', 'Vilnius', 'Tallinn', 'Prague', 'Stockholm', 'Wien', 'Rome', 'Berlin', 'Budapest', 'Madrid'];

// Типы
const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

// Дополнительные опции
const OFFERS = [
  {
    id: 1,
    title: 'Upgrade to a business class',
    price: 120
  },
  {
    id: 2,
    title: 'Choose seats',
    price: 20
  },
  {
    id: 3,
    title: 'Choose the radio station',
    price: 60
  },
  {
    id: 4,
    title: 'Personal guide',
    price: 70
  },
  {
    id: 5,
    title: 'Travel by train',
    price: 35
  }
];

// Описание
const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  'Cras aliquet varius magna, non porta ligula feugiat eget',
  'Fusce tristique felis at fermentum pharetra',
  'Aliquam id orci ut lectus varius viverra',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui',
  'Sed sed nisi sed augue convallis suscipit in sed felis',
  'Aliquam erat volutpat',
  'Nunc fermentum tortor ac porta dapibus',
  'In rutrum ac purus sit amet tempus'
];

// Количество фотографий
const PHOTOS_COUNT = 10;


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
  CITIES,
  TYPES,
  OFFERS,
  DESCRIPTIONS,
  PHOTOS_COUNT,
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


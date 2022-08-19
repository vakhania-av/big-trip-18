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

export { getRandomInt, getRandomArrayElement };


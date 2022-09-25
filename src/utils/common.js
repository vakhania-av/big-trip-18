/** Служебный модуль **/

/**
 * @param { items } items - элементы
 * @param { update } update - обновленные элементы
 * @returns массив значений
 */

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (!index) {
    return items;
  }

  return [...items.slice(0, index), update, ...items.slice(index + 1)];
};

export default updateItem;

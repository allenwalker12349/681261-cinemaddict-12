export const formatDate = (date) => date.getFullYear() + `/` + (`0` + date.getDate()).slice(-2) + `/` + (`0` + (date.getMonth() + 1)).slice(-2) + ` ` + (`0` + date.getHours()).slice(-2) + `:` + (`0` + date.getMinutes()).slice(-2);

export function randomInteger(a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
}

export const getRandomArrayEl = (array) => {
  return array[randomInteger(0, array.length - 1)];
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

export const capitalizeFirstLetter = (string) => {
  if (!string) {
    return string;
  }
  return string[0].toUpperCase() + string.slice(1);
};

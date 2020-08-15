export const formatDate = (date) => date.getFullYear() + `/` + (`0` + date.getDate()).slice(-2) + `/` + (`0` + (date.getMonth() + 1)).slice(-2) + ` ` + (`0` + date.getHours()).slice(-2) + `:` + (`0` + date.getMinutes()).slice(-2);

export function randomInteger(a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
}

export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const getRandomArrayEl = (array) => {
  return array[randomInteger(0, array.length - 1)];
};

export const renderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const renderElement = (container, element, place) => {
  switch (place) {
    case renderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case renderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

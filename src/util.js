export const formatDate = (date) => date.getFullYear() + `/` + (`0` + date.getDate()).slice(-2) + `/` + (`0` + (date.getMonth() + 1)).slice(-2) + ` ` + (`0` + date.getHours()).slice(-2) + `:` + (`0` + date.getMinutes()).slice(-2);

export function randomInteger(a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
}

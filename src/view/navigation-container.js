import AbstractView from "./abstract.js";

const createNavigationContainer = () => {
  return (`<nav class="main-navigation"></nav>`);
};

export default class NavigationContainer extends AbstractView {
  getTemplate() {
    return createNavigationContainer();
  }
}

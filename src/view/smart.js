import Abstract from "./abstract";

export default class Smart extends Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error(`Can't instantiate Abstract, only concrete one.`);
    }
    super();
  }

  resotreHandlers() {
    throw new Error(`Abstract method not implemented: resotreHandlers`);
  }

  updateData() {
    // обновляет данные и если нужно вызывает updateElement
  }

  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, oldElement);

  }
}

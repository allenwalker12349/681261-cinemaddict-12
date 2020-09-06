import Abstract from "./abstract";

export default class Smart extends Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error(`Can't instantiate Abstract, only concrete one.`);
    }
    super();
  }

  updateElement() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;

    this.removeElement();
    const newElement = this.getElement();
    parent.replaceChild(newElement, prevElement);

    prevElement = null;

    this.restoreHandlers();
  }

  updateData(updatedProperty, onlyDataUpdating) {
    if (!updatedProperty) {
      return;
    }

    this._data = Object.assign({},
        this._data,
        updatedProperty
    );

    if (onlyDataUpdating) {
      return;
    }

    this.updateElement();
  }
}
